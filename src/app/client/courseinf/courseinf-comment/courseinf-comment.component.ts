import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef, ViewRef, Input } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CourseInfService } from 'src/app/service/courseinf-frontend/courseinf-frontend.service';

@Component({
  selector: 'app-courseinf-comment',
  templateUrl: './courseinf-comment.component.html',
  styleUrls: ['./courseinf-comment.component.less'],
  inputs: ["comments","courseid","teachplanId","userId"],
})
export class CourseinfCommentComponent implements OnInit {
  courseid = "0";
  teachplanId = "0";
  userId = null;
  //评价
  comments = [];

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
    }
  ];

  total_comment_pages = 1;//总评论页
  current_comment_page = 1;//当前评论页

  //表单相关
  editorTitle = "";
  editorContent = "";
  commentnumber = 0;

  //评价
  @ViewChild("commentcontainer", { read: ViewContainerRef, static: true }) commentcontainer: ViewContainerRef;
  @ViewChild("commentlisttemplate", { read: TemplateRef, static: true }) commentlisttemplate: TemplateRef<any>;
  @ViewChild("writecomment", { read: TemplateRef, static: true }) writecomment: TemplateRef<any>;
  @ViewChild("responsecommdent", { read: TemplateRef, static: true }) responsecomment: TemplateRef<any>;
  @ViewChild("responsetemplate", { read: TemplateRef, static: true }) responsetemplate: TemplateRef<any>;


  constructor(private modalService: NzModalService, private courseinfservice: CourseInfService, private notification: NzNotificationService) { }

  ngOnInit() {

  }

  setCoursesComments(res: any) {
    this.comments = res;

    for (var i = 0; i < this.comments.length; i++) {
      this.comments[i].userSmallAvatar = ""
      if (this.comments[i].userSmallAvatar == "") {
        this.comments[i].userSmallAvatar = "../../../../assets/img/timg2.jpg";
      } else if (this.comments[i].userSmallAvatar.substr(0, 6) == "public") {
        this.comments[i].userSmallAvatar = "../../../../assets/img/timg2.jpg";
      } else if (this.comments[i].userSmallAvatar.substr(7, 7) == "edusoho") {
        this.comments[i].userSmallAvatar = "../../../../assets/img/timg2.jpg";
      }
    }
    //this.total_comment_pages = res.data.total;
  }

  from_init() {
    this.editorTitle = "";
    this.editorContent = "";
    this.commentnumber = 0;
  }

  // comment_submit() {
  //   if (this.editorContent !== "") {
  //     this.courseinfservice.comment_submit(this.courseid, "0", this.editorContent, this.editorTitle, this.commentnumber, this.userId).subscribe((res: any) => {
  //       this.notification.create(
  //         'success',
  //         '提交成功！',
  //         `提交成功`)
  //       this.return_comment();
  //     }, error => {
  //       this.notification.create(
  //         'error',
  //         '发生错误！',
  //         `${error.error}`)
  //     });
  //   } else {
  //     this.notification.create(
  //       'error',
  //       '发生错误！',
  //       `请填写表单全部内容`);
  //   }
  //   this.from_init();
  // }

  return_comment() {
    this.courseinfservice.get_teaching_plan_reivew(this.teachplanId).subscribe((res: any) => {
      this.setCoursesComments(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });

    this.commentcontainer.clear();
    const item: ViewRef = this.commentlisttemplate.createEmbeddedView(null);
    this.commentcontainer.insert(item);
  }

  write_comment() {
    if(this.userId!=null){
      this.commentcontainer.clear();
      const item: ViewRef = this.writecomment.createEmbeddedView(null);
      this.commentcontainer.insert(item);
    }else{
      this.notification.create(
        'error',
        '错误！',
        `请先登录`)
    }

  }
  //界面跳转-------------------------------------------------------------------------------
  return_response_comment() {
    this.from_init();
    this.commentcontainer.clear();
    const item: ViewRef = this.commentlisttemplate.createEmbeddedView(null);
    this.commentcontainer.insert(item);
  }

  currentcommitid = "0";
  write_response_comment(parentid: string) {
    this.from_init();
    this.currentcommitid = parentid;
    //获取追加评论
    this.currentCommentResponse = [];
    // for (let i = 0; i < this.comments.length; i++) {
    //   if (this.comments[i].id == this.currentcommitid) {
    //     this.currentCommentResponse = this.comments[i].childClassReview;
    //     break;
    //   }
    // }

    this.courseinfservice.get_teaching_plan_reivew_response(this.currentcommitid).subscribe((res: any) => {
      this.setCommentResponse(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });
    this.commentcontainer.clear();
    const item: ViewRef = this.responsecomment.createEmbeddedView(null);
    this.commentcontainer.insert(item);
  }

  setCommentResponse(res:any){
    console.log(res)
    this.currentCommentResponse = res.data.data;

    for (var i = 0; i < this.currentCommentResponse.length; i++) {
      if (this.currentCommentResponse[i].avatar == undefined) {
        this.currentCommentResponse[i].avatar = "../../../../assets/img/timg2.jpg";
      }else if (this.currentCommentResponse[i].avatar == "") {
        this.currentCommentResponse[i].avatar = "../../../../assets/img/timg2.jpg";
      } else if (this.currentCommentResponse[i].avatar.substr(0, 6) == "public") {
        this.currentCommentResponse[i].avatar = "../../../../assets/img/timg2.jpg";
      } else if (this.currentCommentResponse[i].avatar.substr(7, 7) == "edusoho") {
        this.currentCommentResponse[i].avatar = "../../../../assets/img/timg2.jpg";
      }
    }
  }


  comment_response_submit(parentid: string) {
    if (this.editorContent != "") {
      this.courseinfservice.write_teaching_plan_review(this.courseid,this.teachplanId, this.currentcommitid, this.editorContent, "", 0, this.userId).subscribe((res: any) => {
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



  onPageChange_comment(event?: any) {
    this.courseinfservice.get_teaching_plan_reivew(this.teachplanId).subscribe((res: any) => {
      this.setCoursesComments(res);
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

  response_submit() {
    if (this.editorContent != "") {
      this.courseinfservice.write_teaching_plan_review(this.courseid,this.teachplanId, '0', this.editorContent, this.editorTitle, this.commentnumber, this.userId).subscribe((res: any) => {
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



}
