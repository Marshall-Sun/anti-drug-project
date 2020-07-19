import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef, ViewRef, Input } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  ActivatedRoute,
  Router,
  Params
} from '@angular/router';
import { CourseService } from 'src/app/service/courselist-frontend/courselist-frontend.service';
import { CourseInfService } from 'src/app/service/courseinf-frontend/courseinf-frontend.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TestuserService } from '../../service/teacher-frontend/teacher-frontend.service';
import { CourseManagementBackHalfService } from 'src/app/service/course-management-back-half/course-management-back-half.service';
import { CourseManagementService } from 'src/app/service/course-management/course-management.service';
import { LoginRegisterService } from 'src/app/service/login-register/login-register.service';
@Component({
  selector: 'app-courseinf',
  templateUrl: './courseinf.component.html',
  styleUrls: ['./courseinf.component.less']
})
export class CourseinfComponent implements OnInit {
  [x: string]: any;
  courseid = '0';
  teachplanId: any = '0';
  userId = null;

  joinINf = null;

  //各种数据
  currentcourse = null;
  introduces = null;
  courses = null;
  notes = null;
  comments = null;
  topics = null;
  materials = null;
  teachers = null;
  studentdata = null;


  @ViewChild('header', null) HeaderComponent: any

  constructor(private courseservice: CourseService,
    private courseinfservice: CourseInfService,
    private router: Router,
    private activateInfo: ActivatedRoute,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private testuserservice: TestuserService,
    private courseManagement$: CourseManagementBackHalfService,
    private coursemanagementService: CourseManagementService,
    private loginService: LoginRegisterService,) {
  }

  ngOnInit() {
    this.loginService.courseUserID.subscribe(res => {
      this.userId = window.localStorage.getItem("id");
      this.updataload();
      this.reLoadData();
    })
    //获取当前页id
    this.activateInfo.params.subscribe(
      (params: Params) => {
        this.courseid = params["id"];
        this.teachplanId = params["pid"];
        if (this.userId != null) {
          this.courseinfservice.get_course_isJoin(this.userId, this.courseid).subscribe((res: any) => {
            this.joinINf = res.data;
            if (this.joinINf.courseId != 0 && this.teachplanId == undefined) {
              this.teachplanId = this.joinINf.courseId;
              this.reLoadData();
            } else if (this.teachplanId == undefined) {
              this.courseinfservice.get_teaching_plan(this.courseid).subscribe((res: any) => {
                this.teachplanId = res.data[0].id;
                this.reLoadData();
              }, error => {
                this.notification.create(
                  'error',
                  '错误！',
                  `${error}`,
                  { nzDuration: 100 }
                )
              });
            } else if (this.joinINf.courseId != 0 && this.joinINf.courseId != this.teachplanId) {
              this.teachplanId = this.joinINf.courseId;
              this.reLoadData();
            } else {
              this.reLoadData();
            }

          }, error => {
            this.joinINf = null;
            this.notification.create(
              'error',
              '错误！',
              `${error}`,
              { nzDuration: 100 }
            )
          });
        } else {
          this.courseinfservice.get_teaching_plan(this.courseid).subscribe((res: any) => {
            console.log(this.teachplanId)
            if (this.teachplanId == undefined){
              this.teachplanId = res.data[0].id;
            }
            this.reLoadData();
          }, error => {
            this.notification.create(
              'error',
              '错误！',
              `${error}`,
              { nzDuration: 100 }
            )
          });
        }
      }, error => {
        this.notification.create(
          'error',
          '发生错误！',
          `${error.error}`)
      })

  }

  updataload() {
    if(this.userId!=null){
      this.courseinfservice.get_course_isJoin(this.userId, this.courseid).subscribe((res: any) => {
        this.joinINf = res.data;
        //this.reLoadData();
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

  changeteachplan(id: number) {
    this.teachplanId = id;
    this.navigateByUrl('/client/courseinf/' + this.courseid + '/teachplan/' + id);
    //this.reLoadData();
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url)
  }

  preLoadData() {
    this.coursemanagementService.getMyCourse(this.pageIndex, this.courses.length, this.userId, "learning").subscribe((res: any) => {
      this.setCoursesIntroduce(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });
  }


  reLoadData() {
    this.courseinfservice.get_teaching_plan_introduce(this.teachplanId).subscribe((res: any) => {
      this.setCoursesIntroduce(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });

    this.courseManagement$.getPlanTaskNew(this.teachplanId).subscribe((res: any) => {
      this.setCoursesCatalog(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });

    this.courseinfservice.get_teaching_plan_note(this.teachplanId, "1", "0", "New").subscribe((res: any) => {
      this.setCoursesNotes(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });

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

    this.courseinfservice.get_teaching_plan_topic(this.teachplanId, "1").subscribe((res: any) => {
      this.setCoursesTopic(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });

    this.courseinfservice.get_teaching_plan_material(this.teachplanId).subscribe((res: any) => {
      this.setCoursesMaterials(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });

    this.courseinfservice.get_teaching_plan_teachers(this.teachplanId).subscribe((res: any) => {
      this.setCourseTeachers(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });

    this.courseinfservice.get_teaching_plan_students(this.teachplanId).subscribe((res: any) => {
      this.setstudents(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });
  }

  setCoursesIntroduce(res: any) {
    console.log(res);
    if (res.code == 400) {
      this.introduces = "";
      return;
    }
    this.introduces = res.data;
  }

  setCoursesCatalog(res: any) {
    if (res.code == 200) {
      this.courses = [];
      for (var key in res.data) {
        this.courses.push(res.data[key])
      }
      console.log(this.courses)
    } else {
      this.courses = [];
    }
  }

  setCoursesNotes(res: any) {
    if (res.code == 400) {
      this.notes = [];
      return;
    }
    this.notes = res.data;
    //this.total_notes_page = res.data.total;

    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].userSmallAvatar == undefined) {
        this.notes[i].userSmallAvatar = "../../../../assets/img/timg2.jpg";
      } else if (this.notes[i].userSmallAvatar == "") {
        this.notes[i].userSmallAvatar = "../../../../assets/img/timg2.jpg";
      } else if (this.notes[i].userSmallAvatar.substr(0, 6) == "public") {
        this.notes[i].userSmallAvatar = "../../../../assets/img/timg2.jpg";
      } else if (this.notes[i].userSmallAvatar.substr(7, 7) == "edusoho") {
        this.notes[i].userSmallAvatar = "../../../../assets/img/timg2.jpg";
      }
    }
  }

  setCoursesComments(res: any) {
    if (res.code == 400) {
      this.comments = [];
      return;
    }
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

  setCoursesTopic(res: any) {
    //console.log(res);
    if (res.code == 400) {
      this.topics = [];
      return;
    }
    this.topics = res.data;
    //this.total_course_top_page = res.data.total;
    if (this.topics != undefined) {
      for (var i = 0; i < this.topics.length; i++) {
        if (this.topics[i].largeAvatar == undefined) {
          this.topics[i].largeAvatar = "../../../../assets/img/timg2.jpg";
        } else if (this.topics[i].largeAvatar == "") {
          this.topics[i].largeAvatar = "../../../../assets/img/timg2.jpg";
        } else if (this.topics[i].largeAvatar.substr(0, 6) == "public") {
          this.topics[i].largeAvatar = "../../../../assets/img/timg2.jpg";
        } else if (this.topics[i].largeAvatar.substr(7, 7) == "edusoho") {
          this.topics[i].largeAvatar = "../../../../assets/img/timg2.jpg";
        }
      }
    }
  }

  setCoursesMaterials(res: any) {
    if (res.code == 400) {
      this.materials = [];
      return;
    }
    this.materials = res;
  }

  setCourseTeachers(res: any) {
    if (res.code == 400) {
      this.teachers = [];
      return;
    }
    this.teachers = res.data.courseTeachers;

    for (let i = 0; i < this.teachers.length; i++) {
      if (this.teachers[i].smallAvatar == "") {
        this.teachers[i].smallAvatar = "../../../../assets/img/timg2.jpg";
      } else if (this.teachers[i].smallAvatar.substr(0, 6) == "public") {
        this.teachers[i].smallAvatar = "../../../../assets/img/timg2.jpg";
      } else if (this.teachers[i].smallAvatar.substr(7, 7) == "edusoho") {
        this.teachers[i].smallAvatar = "../../../../assets/img/timg2.jpg";
      }
      if(this.userId!=null){
        this.courseinfservice.isfollowing(this.userId, this.teachers[i].id).subscribe((res: any) => {
          this.setfollowing_teacher(res.data, i);
        }, error => {
          this.notification.create(
            'error',
            '发生错误！',
            `${error.error}`)
        })
      }else{
        this.setfollowing_teacher(false, i);
      }

    }
  }

  setstudents(res: any) {
    if (res.code == 400) {
      this.studentdata = [];
      return;
    }

    this.studentdata = res.data.courseStudents;

    for (let i = 0; i < this.studentdata.length; i++) {
      if (this.studentdata[i].smallAvatar == "") {
        this.studentdata[i].smallAvatar = "../../../../assets/img/timg2.jpg";
      } else if (this.studentdata[i].smallAvatar.substr(0, 6) == "public") {
        this.studentdata[i].smallAvatar = "../../../../assets/img/timg2.jpg";
      } else if (this.studentdata[i].smallAvatar.substr(7, 7) == "edusoho") {
        this.studentdata[i].smallAvatar = "../../../../assets/img/timg2.jpg";
      }
      if(this.userId!=null){
        this.courseinfservice.isfollowing(this.userId, this.studentdata[i].id).subscribe((res: any) => {
          this.setfollowing_student(res.data, i);
        }, error => {
          this.notification.create(
            'error',
            '发生错误！',
            `${error.error}`)
        })
      }else{
        this.setfollowing_student(false, i);
      }

    }
    //console.log(this.studentdata)
  }

  setfollowing_teacher(res: boolean, index: number) {
    this.teachers[index].isfollowing = res;
  }

  setfollowing_student(res: boolean, index: number) {
    this.studentdata[index].isfollowing = res;
  }


  //表单相关
  // editorTitle = "";
  // editorContent = "";
  // commentnumber = 0;
  // editorstartTime_date = "";
  // editorstartTime_time = "";
  // editorendTime_date = "";
  // editorendTime_time = "";
  // editorSendToStudent;

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

  //  refreshPage(): void {
  // this.router.navigate([], {
  //   relativeTo: this.route,
  //   queryParams: {
  //     coursepage: this.coursepage_number,
  //     topicpage: this.currenttopicpage,
  //     notepage: this.current_notespage,
  //     commentpage: this.current_comment_page,
  //     materialpage: this.current_material_page,
  //     topic_type: this.type_topic,
  //     topic_order: this.order_topic,
  //     note_order: this.order_note,
  //     select_note: this.select_note,
  //   }
  // });
  // }


  //公告  ---暂不用
  // NoticeVisible = false;
  // currentNoticetag = 0;
  // editid = "-1";
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
  //         `输入不能为空`);
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


}

