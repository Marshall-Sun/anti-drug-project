import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef, ViewRef, Input } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { CourseInfService } from 'src/app/service/courseinf-frontend/courseinf-frontend.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-courseinf-topic',
  templateUrl: './courseinf-topic.component.html',
  styleUrls: ['./courseinf-topic.component.less'],
  inputs: ["userId","topics","courseid", "teachplanId","total_course_top_page"],
  outputs: ["responseClick"]
})
export class CourseinfTopicComponent implements OnInit {
  userId = null;
  courseid = "0";
  teachplanId = "0";
  //话题
  topics = [];

  //回复
  currenttopicid = "0";
  currentresponse = [
    {
      responser: 'AAA',
      time: '2019.1.1',
      content: '内容',
      smallAvatar: ""
    }
  ];

  //排序相关
  topicytpe: string = "All";
  topicorder: string = "New";

  total_course_top_page = 1;//总话题页码
  currenttopicpage = 1;//当前话题页码

  //表单相关
  editorTitle = "";
  editorContent = "";

  //话题
  @ViewChild("notescontainer", { read: ViewContainerRef, static: true }) notescontainer: ViewContainerRef;
  @ViewChild("noteslisttemplate", { read: TemplateRef, static: true }) topiclisttemplate: TemplateRef<any>;
  @ViewChild("notesquestion", { read: TemplateRef, static: true }) notesquestion: TemplateRef<any>;
  @ViewChild("publishtopic", { read: TemplateRef, static: true }) publishtopic: TemplateRef<any>;
  @ViewChild("responsetemplate", { read: TemplateRef, static: true }) responsetemplate: TemplateRef<any>;

  constructor(private modalService: NzModalService, private courseinfservice: CourseInfService, private notification: NzNotificationService) {

  }

  ngOnInit() {
  }

  setCoursesTopic(res: any) {
    this.topics = res.data;
    //this.total_course_top_page = res.data.total;
  }

  setTopicResponses(res: any) {
    if (res.data.data[0] == undefined) {
      this.currentresponse = [];
    } else {
      this.currentresponse = res.data.data[0].threadPostDTOList;
    }
  }

  from_init() {
    this.editorTitle = "";
    this.editorContent = "";
  }

  //信息提交
  topic_submit() {
    if (this.editorContent != "" && this.editorTitle != "") {
      this.courseinfservice.write_teaching_plan_topic(this.courseid,this.teachplanId,this.editorContent, this.editorTitle, this.userId).subscribe((res: any) => {
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

  questoin_submit() {
    if (this.editorContent != "" && this.editorTitle != "") {
      this.courseinfservice.write_teaching_plan_questoin(this.courseid,this.teachplanId, this.editorContent, this.editorTitle, this.userId).subscribe((res: any) => {
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
    this.courseinfservice.get_teaching_plan_topic(this.teachplanId, this.currenttopicpage.toString()).subscribe((res: any) => {
      this.setCoursesTopic(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });

    this.notescontainer.clear();
    const noteslist: ViewRef = this.topiclisttemplate.createEmbeddedView(null);
    this.notescontainer.insert(noteslist);
  }

  write_topic() {
    this.notescontainer.clear();
    const item: ViewRef = this.publishtopic.createEmbeddedView(null);
    this.notescontainer.insert(item);
  }

  write_question() {
    this.notescontainer.clear();
    const item: ViewRef = this.notesquestion.createEmbeddedView(null);
    this.notescontainer.insert(item);
  }

  //排序
  changeType_Topic(type: string): void {
    this.topicytpe = type;
    this.currenttopicpage = 1;
    this.courseinfservice.get_teaching_plan_topic(this.teachplanId, this.currenttopicpage.toString(),this.topicytpe,this.topicorder).subscribe((res: any) => {
      this.setCoursesTopic(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });
  }

  changeOrder_Topic(order: string): void {
    this.topicorder = order;
    this.currenttopicpage = 1;
    this.courseinfservice.get_teaching_plan_topic(this.teachplanId, this.currenttopicpage.toString(),this.topicytpe,this.topicorder).subscribe((res: any) => {
      this.setCoursesTopic(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });
  }

  onPageChange_topic(event?: any) {
    this.courseinfservice.get_teaching_plan_topic(this.courseid, this.currenttopicpage.toString(),this.topicytpe,this.topicorder).subscribe((res: any) => {
      this.setCoursesTopic(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });
    window.scrollTo(0, 0);
  }


  //界面跳转-------------------------------------------------------------------------------
  return_response() {
    this.notescontainer.clear();
    const noteslist: ViewRef = this.topiclisttemplate.createEmbeddedView(null);
    this.notescontainer.insert(noteslist);
  }

  write_response(topicid: string) {
    this.notescontainer.clear();
    this.currenttopicid = topicid;
    console.log(this.currenttopicid)
    this.courseinfservice.get_teaching_plan_topic_responses(topicid).subscribe((res: any) => {
      this.setTopicResponses(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });
    const item: ViewRef = this.responsetemplate.createEmbeddedView(null);
    this.notescontainer.insert(item);
  }

  response_submit() {
    if (this.editorContent != "") {
      this.courseinfservice.write_teaching_plan_topic_response(this.courseid, this.currenttopicid, this.editorContent, this.userId).subscribe((res: any) => {
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


  getTopicType(type:string){
    if(type=="question"){
      return "问题"
    }else{
      return "话题"
    }
  }
}
