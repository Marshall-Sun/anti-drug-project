import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef, ViewRef, Input } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { ClassInfService } from 'src/app/service/classinf-frontend/classinf-frontend.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-classinf-topic',
  templateUrl: './classinf-topic.component.html',
  styleUrls: ['./classinf-topic.component.less'],
  inputs: ["classid","userId"]
})
export class ClassinfTopicComponent implements OnInit {
  classid = "0";
  userId = null;
  //话题
  topics = [
    {
      type: "问题",
      title: "Question",
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: '2019.1.1',
      browse_times: 10,
      reply_times: 10,
      largeAvatar: "",
    }
  ];
  //回复
  currentTopicResponse = [
    {
      responser: 'AAA',
      time: '2019.1.1',
      content: '内容',
      largeAvatar: "",
    }
  ];

  total_course_top_page = 1;//总话题页码
  currenttopicpage = 1;//当前话题页码

  //表单相关--------------------------------------
  editorTitle = "";
  editorContent = "";

  //排序相关
  topicytpe: string = "0";
  topicorder: string = "createdTime";

  @ViewChild("topiccontainer", { read: ViewContainerRef, static: true }) topiccontainer: ViewContainerRef;
  @ViewChild("topiclisttemplate", { read: TemplateRef, static: true }) topiclisttemplate: TemplateRef<any>;
  @ViewChild("topicquestion", { read: TemplateRef, static: true }) topicquestion: TemplateRef<any>;
  @ViewChild("publishtopic", { read: TemplateRef, static: true }) publishtopic: TemplateRef<any>;
  @ViewChild("responsetemplate", { read: TemplateRef, static: true }) responsetemplate: TemplateRef<any>;
  constructor(private modalService: NzModalService, private classinfservice: ClassInfService, private notification: NzNotificationService) {
  }

  ngOnInit() {
    this.classinfservice.getclassTopics(this.classid).subscribe((res: any) => {
      this.setclassTopics(res);
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    })
  }

  setclassTopics(res: any) {
    this.topics = res.data.classroomThreadList;
    this.total_course_top_page = res.data.total;
    console.log(this.topics);
    for (var i = 0; i < this.topics.length; i++) {
      if (this.topics[i].largeAvatar == "") {
        this.topics[i].largeAvatar = "../../../../assets/img/timg2.jpg";
      } else if (this.topics[i].largeAvatar.substr(0, 6) == "public") {
        this.topics[i].largeAvatar = "../../../../assets/img/timg2.jpg";
      } else if (this.topics[i].largeAvatar.substr(7, 7) == "edusoho") {
        this.topics[i].largeAvatar = "../../../../assets/img/timg2.jpg";
      }
    }
  }
  setclassTopicsResponses(res: any) {
    this.currentTopicResponse = res.data;

    for (var i = 0; i < this.currentTopicResponse.length; i++) {
      if (this.currentTopicResponse[i].largeAvatar == undefined) {
        this.currentTopicResponse[i].largeAvatar = "../../../../assets/img/timg2.jpg";
      } else
        if (this.currentTopicResponse[i].largeAvatar == "") {
          this.currentTopicResponse[i].largeAvatar = "../../../../assets/img/timg2.jpg";
        } else if (this.currentTopicResponse[i].largeAvatar.substr(0, 6) == "public") {
          this.currentTopicResponse[i].largeAvatar = "../../../../assets/img/timg2.jpg";
        } else if (this.currentTopicResponse[i].largeAvatar.substr(7, 7) == "edusoho") {
          this.currentTopicResponse[i].largeAvatar = "../../../../assets/img/timg2.jpg";
        }
    }
  }

  // setTopicResponses(res: any) {
  //   this.currentTopicResponse = res;
  // }

  from_init() {
    this.editorTitle = "";
    this.editorContent = "";
  }

  //信息提交
  topic_submit() {
    if (this.editorTitle != "" && this.editorContent != "") {
      this.classinfservice.topic_submit(this.classid, this.editorContent, this.editorTitle, this.userId).subscribe((res: any) => {
        this.notification.create(
          'success',
          '提交成功！',
          `提交成功`)
        this.return_topic();
      }, error => {
        this.notification.create(
          'error',
          '发生错误！',
          `${error.error}`)
      });
    } else {
      this.notification.create(
        'error',
        '发生错误！',
        `请填写表单全部内容`);
    }

  }

  questoin_submit() {
    if (this.editorTitle != "" && this.editorContent != "") {
      this.classinfservice.questoin_submit(this.classid, this.editorContent, this.editorTitle, this.userId).subscribe((res: any) => {
        this.notification.create(
          'success',
          '提交成功！',
          `提交成功`)
        this.return_topic();
      }, error => {
        this.notification.create(
          'error',
          '发生错误！',
          `${error.error}`)
      });
    } else {
      this.notification.create(
        'error',
        '发生错误！',
        `请填写表单全部内容`);
    }
  }

  currentopicid = "0";
  response_submit() {
    if (this.editorContent != "") {
      this.classinfservice.question_response_submit(this.classid,"0",this.currentopicid ,this.editorContent).subscribe((res: any) => {
        this.notification.create(
          'success',
          '提交成功！',
          `提交成功`)
        this.return_topic();
      }, error => {
        this.notification.create(
          'error',
          '发生错误！',
          `${error.error}`)
      });
    } else {
      this.notification.create(
        'error',
        '发生错误！',
        `请填写表单全部内容`);
    }
    this.from_init();
  }

  //界面跳转-------------------------------------------------------------------------------
  return_topic() {
    //重新获取信息
    this.currentopicid="";
    this.onPageChange_topic();
    this.from_init();
    this.topiccontainer.clear();
    const noteslist: ViewRef = this.topiclisttemplate.createEmbeddedView(null);
    this.topiccontainer.insert(noteslist);
  }
  write_topic() {
    this.from_init();
    this.topiccontainer.clear();
    const item: ViewRef = this.publishtopic.createEmbeddedView(null);
    this.topiccontainer.insert(item);
  }
  write_question() {
    this.from_init();
    this.topiccontainer.clear();
    const item: ViewRef = this.topicquestion.createEmbeddedView(null);
    this.topiccontainer.insert(item);
  }


  return_response() {

    this.from_init();
    this.topiccontainer.clear();
    const noteslist: ViewRef = this.topiclisttemplate.createEmbeddedView(null);
    this.topiccontainer.insert(noteslist);
  }

  write_response(topicid: string) {
    this.from_init();
    this.currentopicid = topicid;
    this.classinfservice.getTopicResponses(topicid).subscribe((res: any) => {
      this.setclassTopicsResponses(res);
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    })

    this.topiccontainer.clear();
    const item: ViewRef = this.responsetemplate.createEmbeddedView(null);
    this.topiccontainer.insert(item);
  }

  //排序
  changeType_Topic(type: string): void {
    if (type == "All") {
      this.topicytpe = "0";
    } else {
      this.topicytpe = "1";
    }
    this.currenttopicpage = 1;
    this.classinfservice.getclassTopics(this.classid, this.topicytpe, this.topicorder, this.currenttopicpage).subscribe((res: any) => {
      this.setclassTopics(res);
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    })
  }

  changeOrder_Topic(order: string): void {
    this.topicorder = order;
    this.currenttopicpage = 1;
    this.classinfservice.getclassTopics(this.classid, this.topicytpe, this.topicorder, this.currenttopicpage).subscribe((res: any) => {
      this.setclassTopics(res);
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    })
  }

  onPageChange_topic(event?: any) {
    this.classinfservice.getclassTopics(this.classid, this.topicytpe, this.topicorder, this.currenttopicpage).subscribe((res: any) => {
      this.setclassTopics(res);
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    })
    window.scrollTo(0, 0);
  }


}
