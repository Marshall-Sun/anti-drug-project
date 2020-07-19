import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef, ViewRef, Input } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { ClassInfService } from 'src/app/service/classinf-frontend/classinf-frontend.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-classinf-comment',
  templateUrl: './classinf-comment.component.html',
  styleUrls: ['./classinf-comment.component.less'],
  inputs: ["classid","userId"]
})
export class ClassinfCommentComponent implements OnInit {
  classid = "0";
  userId=null;
  //评价
  comments = [
    {
      id: "",
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: '2019.1.1',
      score: 2,
      childClassReview: [],
      avator: "",
    },
    {
      id: "",
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: '2019.1.2',
      score: 3,
      childClassReview: [],
      avator: "",
    }
  ];
  currentCommentResponse = [
    {
      id: "",
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: '2019.1.1',
      score: 2,
      childClassReview: [],
      avator: "",
      largeAvatar: ""
    }
  ];

  total_comment_pages = 50;//总评论页
  current_comment_page = 1;//当前评论页

  editorTitle = "";
  editorContent = "";
  commentnumber = 0;

  //评价
  @ViewChild("commentcontainer", { read: ViewContainerRef, static: true }) commentcontainer: ViewContainerRef;
  @ViewChild("commentlisttemplate", { read: TemplateRef, static: true }) commentlisttemplate: TemplateRef<any>;
  @ViewChild("writecomment", { read: TemplateRef, static: true }) writecomment: TemplateRef<any>;
  @ViewChild("responsetemplate", { read: TemplateRef, static: true }) responsetemplate: TemplateRef<any>;
  @ViewChild("responsecommdent", { read: TemplateRef, static: true }) responsecomment: TemplateRef<any>;

  constructor(private classinfservice: ClassInfService, private modalService: NzModalService, private notification: NzNotificationService) {
  }

  ngOnInit() {
    this.classinfservice.getclassComments(this.classid, this.current_comment_page).subscribe((res: any) => {
      this.setclassComments(res);
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });
  }


  setclassComments(res: any) {
    this.comments = res.data.classReviewList;
    this.total_comment_pages = res.data.total;


    for (var i = 0; i < this.comments.length; i++) {
      this.comments[i].avator = ""
      if (this.comments[i].avator == "") {
        this.comments[i].avator = "../../../../assets/img/timg2.jpg";
      } else if (this.comments[i].avator.substr(0, 6) == "public") {
        this.comments[i].avator = "../../../../assets/img/timg2.jpg";
      } else if (this.comments[i].avator.substr(7, 7) == "edusoho") {
        this.comments[i].avator = "../../../../assets/img/timg2.jpg";
      }
    }
  }

  onPageChange_comments(event?: any) {
    this.classinfservice.getclassComments(this.classid, this.current_comment_page).subscribe((res: any) => {
      this.setclassComments(res);
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });
    window.scrollTo(0, 0);
  }

  from_init() {
    this.editorContent = "";
    this.commentnumber = 0;
  }

  comment_submit() {
    if (this.editorContent !== "" && this.commentnumber !== 0) {
      this.classinfservice.comment_submit(this.classid, "0", this.editorContent, this.editorTitle, this.commentnumber, this.userId).subscribe((res: any) => {
        this.notification.create(
          'success',
          '提交成功！',
          `提交成功`)
        this.return_comment();
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

  currentcommitid = "0";
  comment_response_submit(parentid: string) {
    if (this.editorContent != "") {
      this.classinfservice.comment_Response_submit(this.classid, this.currentcommitid, this.editorContent, this.editorTitle, this.commentnumber,this.userId).subscribe((res: any) => {
        this.notification.create(
          'success',
          '提交成功！',
          `提交成功`)

        this.return_comment();
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

  return_comment() {
    //重新获取信息
    this.onPageChange_comments();
    this.from_init();
    this.commentcontainer.clear();
    const item: ViewRef = this.commentlisttemplate.createEmbeddedView(null);
    this.commentcontainer.insert(item);
  }
  write_comment() {
    if(this.userId==null){
      this.notification.create(
        'error',
        '发生错误！',
        `请先登录`)
      return;
    }
    this.from_init();
    this.commentcontainer.clear();
    const item: ViewRef = this.writecomment.createEmbeddedView(null);
    this.commentcontainer.insert(item);
  }


  return_response_comment() {
    this.from_init();
    this.commentcontainer.clear();
    const item: ViewRef = this.commentlisttemplate.createEmbeddedView(null);
    this.commentcontainer.insert(item);
  }

  write_response_comment(parentid: string) {
    this.from_init();
    this.currentcommitid = parentid;
    //获取追加评论
    this.currentCommentResponse = [];
    for (let i = 0; i < this.comments.length; i++) {
      if (this.comments[i].id == this.currentcommitid) {
        this.currentCommentResponse = this.comments[i].childClassReview;
        break;
      }
    }
    for (var i = 0; i < this.currentCommentResponse.length; i++) {
      this.currentCommentResponse[i].largeAvatar = ""
      if (this.currentCommentResponse[i].largeAvatar == "") {
        this.currentCommentResponse[i].largeAvatar = "../../../../assets/img/timg2.jpg";
      } else if (this.currentCommentResponse[i].largeAvatar.substr(0, 6) == "public") {
        this.currentCommentResponse[i].largeAvatar = "../../../../assets/img/timg2.jpg";
      } else if (this.currentCommentResponse[i].largeAvatar.substr(7, 7) == "edusoho") {
        this.currentCommentResponse[i].largeAvatar = "../../../../assets/img/timg2.jpg";
      }
    }
    this.commentcontainer.clear();
    const item: ViewRef = this.responsecomment.createEmbeddedView(null);
    this.commentcontainer.insert(item);
  }



}
