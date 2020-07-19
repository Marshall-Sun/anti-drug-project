import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef, ViewRef, Input } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import {
  ActivatedRoute,
  Router,
  Params
} from '@angular/router';
import { CourseService } from 'src/app/service/courselist-frontend/courselist-frontend.service';
import { ClassInfService } from 'src/app/service/classinf-frontend/classinf-frontend.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoginRegisterService } from 'src/app/service/login-register/login-register.service';

@Component({
  selector: 'app-classinf',
  templateUrl: './classinf.component.html',
  styleUrls: ['./classinf.component.less']
})
export class ClassinfComponent implements OnInit {
  [x: string]: any;

  classid = "1";

  //当前用户
  userId=null;
  joinINf = null;

  //公告历史记录
  // noticeHistory = [{ id: '1', teachplan: "默认教学计划", content: "通知", startdate: "2019-3-3", enddate: "2019-3-5" },
  // { id: '1', teachplan: "默认教学计划", content: "通知2", startdate: "2019-3-5", enddate: "2019-3-5" }
  // ];


  constructor(private courseservice: CourseService, private modalService: NzModalService, private classinfservice: ClassInfService,
    private router: Router, private activateInfo: ActivatedRoute, private message: NzMessageService, 
    private notification: NzNotificationService,
    private loginService: LoginRegisterService) {
    // route.queryParams.subscribe(queryParams => {
    //   this.coursepage_number = queryParams.coursepage || "1";
    //   this.currenttopicpage = queryParams.topicpage || "1";
    //   this.current_notespage = queryParams.notepage || "1";
    //   this.current_comment_page = queryParams.commentpage || "1";
    //   this.current_teachers_page = queryParams.teacherpage || "1";
    //   this.type_topic = queryParams.topic_type || "All";
    //   this.order_topic = queryParams.topic_order || "New";
    //   this.order_note = queryParams.note_order || "New";
    //   this.select_note = queryParams.select_note || "全部课程";
    // })

  }

  ngOnInit() {
    this.loginService.courseUserID.subscribe(res => {
      this.userId = window.localStorage.getItem("id");
      this.reloadData();
    })
    //获取当前页id
    this.activateInfo.params.subscribe(
      (params: Params) => {
        this.classid = params["id"];

        if(this.userId!=null){
          this.classinfservice.get_class_isJoin(this.userId,this.classid).subscribe((res: any) => {
            this.joinINf = res.data;
          }, error => {
            this.joinINf = null;
            this.notification.create(
              'error',
              '错误！',
              `${error}`,
              { nzDuration: 100 }
            )
          });
        }else{
          this.joinINf = null;
        }
      }, error => {
        this.notification.create(
          'error',
          '发生错误！',
          `${error.error}`)
      }
    )

    // this.classinfservice.getUser(this.classid).subscribe((res: any) => {
    //   this.setuser(res);
    // }, error => {
    //   this.notification.create(
    //     'error',
    //     '发生错误！',
    //     `${error.error}`)
    // })

    // this.classinfservice.getclassNotices(this.classid).subscribe((res: any) => {
    //   this.setclassNotices(res);
    // }, error => {
    //   this.notification.create(
    //     'error',
    //     '发生错误！',
    //     `${error.error}`)
    // });
    //仅测试用
    
  }


  reloadData(){
    if(this.userId!=null){
      this.classinfservice.get_class_isJoin(this.userId,this.classid).subscribe((res: any) => {
        this.joinINf = res.data;
        console.log(this.joinINf)
      }, error => {
        this.joinINf = null;
        this.notification.create(
          'error',
          '错误！',
          `${error}`,
          { nzDuration: 100 }
        )
      });
    }else{
      this.joinINf = null;
    }
  }

  // setclassNotices(res: any) {

  // }

  //表单相关--------------------------------------
  // editorTitle = "";
  // editorContent = "";
  // commentnumber = 0;
  // editorstartTime_date = "";
  // editorstartTime_time = "";
  // editorendTime_date = "";
  // editorendTime_time = "";
  // send_tostudent = false;

  // from_init() {
  //   this.editorTitle = "";
  //   this.editorContent = "";
  //   this.commentnumber = 0;
  //   this.editorstartTime_date = "";
  //   this.editorstartTime_time = "";
  //   this.editorendTime_date = "";
  //   this.editorendTime_time = "";
  //   this.send_tostudent = false;
  // }

  // createErrorMessage(content: string): void {
  //   this.message.error(content, {
  //     nzDuration: 1000
  //   });
  // }

  //------------废弃代码------------------------------
  // onPageChange(event?: any) {
  //   this.refreshPage()
  //   window.scrollTo(0, 0);
  // }

  // refreshPage(): void {

  //   //已废弃！！！！
  //   // this.router.navigate([], {
  //   //   relativeTo: this.route,
  //   //   queryParams: {
  //   //     coursepage: this.coursepage_number,
  //   //     topicpage: this.currenttopicpage,
  //   //     notepage: this.current_notespage,
  //   //     commentpage: this.current_comment_page,
  //   //     teacherpage: this.current_teachers_page,
  //   //     topic_type: this.type_topic,
  //   //     topic_order: this.order_topic,
  //   //     note_order: this.order_note,
  //   //     select_note: this.select_note,
  //   //   }
  //   // });
  // }

  // renderResulsts(res: any): void {
  //   //已废弃！！！！
  //   // this.classList = null;
  //   // if (res) {
  //   //   this.classList = res;
  //   // }
  // }
  //------------废弃代码------------------------------


  // //公告
  // currentNoticetag = 0;
  // editid = "-1";
  // //公告
  // NoticeVisible = false;

  // showNoticeconfirm(): void {
  //   this.NoticeVisible = true;
  // }



  // handleOk_Notice(): void {
  //   if (this.currentNoticetag == 0) {
  //     console.log('Button ok clicked!');
  //     if (this.editorContent != "" && this.editorstartTime_date != "" && this.editorstartTime_time != "" && this.editorendTime_date != ""
  //       && this.editorendTime_time != "") {
  //       this.NoticeVisible = false;
  //       //There are something
  //       this.from_init();
  //       this.editid = "-1";
  //     } else {
  //       this.notification.create(
  //         'error',
  //         '发生错误！',
  //         `请填写表单全部内容`);
  //     }
  //   } else {
  //     console.log('Button ok clicked!2');
  //     this.handleCancel_Notice();
  //   }

  // }

  // handleCancel_Notice(): void {
  //   console.log('Button cancel clicked!');
  //   this.NoticeVisible = false;
  //   this.from_init();
  //   this.editid = "-1";
  // }

  // showDeleteNoticeconfirm(): void {
  //   this.modalService.confirm({
  //     nzTitle: '<i>是否确认删除公告？</i>',
  //     nzContent: '<b>真的要删除该公告吗?</b>',
  //     nzOnOk: () => { console.log('OK'); this.notice_delete() }
  //   });
  // }

  // editNotice(index: number): void {
  //   this.editid = this.noticeHistory[index].id;
  //   this.currentNoticetag = 0;
  //   this.editorstartTime_date = this.noticeHistory[index].startdate;
  //   //this.editorstartTime_time = this.noticeHistory[index].starttime;
  //   this.editorendTime_date = this.noticeHistory[index].enddate;
  //   //this.editorendTime_time = this.noticeHistory[index].endtime;
  //   this.editorContent = this.noticeHistory[index].content;
  // }


  // navigateByUrl(url: string) {
  //   this.router.navigateByUrl(url);
  // }

}
