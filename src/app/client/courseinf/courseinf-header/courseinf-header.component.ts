import { Component, OnInit, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CourseInfService } from 'src/app/service/courseinf-frontend/courseinf-frontend.service';
import { TestuserService } from '../../../service/teacher-frontend/teacher-frontend.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-courseinf-header',
  templateUrl: './courseinf-header.component.html',
  styleUrls: ['./courseinf-header.component.less'],
  inputs: ["courseid", "userId", "teachplanId", "joinINf"],
  outputs: ["joinCourse", "exitCourse", "changePlan"]
})
export class CourseinfHeaderComponent implements OnInit {
  userId = "1";
  courseid = "0";
  teachplanId = "0";
  currentcourse = {
    id: '001',
    name: '首领选举(记得加确认退出框,私信框)',
    cover: "../../../../assets/img/timg.jpg",
    //课程数
    course_num: 10,
    //二维吗
    qrcode: "../../../../assets/img/timg.jpg",
    //课程是否完结
    isfinish: 'true',
    //参与数
    participants: "10",
    //讨论数
    discussions: "10",
    //热度
    heat: "",
    //更新日期
    update_date: "",
    //教学计划
    teachingplan: "默认教学计划",
    //时效
    term: "永久有效",
    //承诺服务
    commitmentservice: [false, true, true, true],
    serializemode: "none",
    title: "无",
    studentnum: 56
  };
  user: any;
  joinINf: any;
  currentplan: any;

  iscollect = true;//之后放在user里

  //页头显示用变量
  commitmentservice = ["grey", "", "", ""];
  //退出课程
  CourseExitVisible = false;
  selectedExitReason: string;
  CourseExitinputValue: string;

  //页头显示用变量
  iscollection = "outline";
  islearned = "outline";

  //
  joinCourse: EventEmitter<any>;
  exitCourse: EventEmitter<any>;
  changePlan: EventEmitter<number>;


  //临时计划
  teacherplans: any;

  constructor(private notification: NzNotificationService, private courseinfservice: CourseInfService,
    private testuserservice: TestuserService, private route: Router) {
    this.joinCourse = new EventEmitter();
    this.exitCourse = new EventEmitter();
    this.changePlan = new EventEmitter();
  }

  ngOnInit() {
    //仅测试用
    this.user = this.testuserservice.user;


    this.courseinfservice.getCourse(this.courseid).subscribe((res: any) => {
      this.setcurrentcourse(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });

    this.courseinfservice.get_teaching_plan(this.courseid).subscribe((res: any) => {
      this.setteaching_plan(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });

  }

  setcurrentcourse(res: any) {
    this.currentcourse = res.data;
    if (this.currentcourse.cover == "") {
      this.currentcourse.cover = "../../../../assets/img/timg.jpg";
    } else if (this.currentcourse.cover.substr(0, 6) == "public") {
      this.currentcourse.cover = "../../../../assets/img/timg.jpg";
    } else if (this.currentcourse.cover.substr(7, 7) == "edusoho") {
      this.currentcourse.cover = "../../../../assets/img/timg.jpg";
    } else if (this.currentcourse.cover.substr(1, 7) == '"large"') {
      this.currentcourse.cover = "../../../../assets/img/timg.jpg";
    }
  }

  setteaching_plan(res: any) {
    this.teacherplans = res.data;
    this.initteachplan(this.teachplanId);
  }


  learnpercent = (percent: number) => `${percent} %`;
  //退学
  showExitCoursefirm(): void {
    this.CourseExitVisible = true;
  }

  handleOk_ExitCourse(): void {
    if (this.selectedExitReason != undefined && this.selectedExitReason != "" && this.selectedExitReason != "其他") {
      this.CourseExitVisible = false;
      this.exitlearn_submit();
      //There are something
      this.selectedExitReason = "";
      this.CourseExitinputValue = "";
    } else if (this.CourseExitinputValue != "" && this.CourseExitinputValue != undefined) {
      this.CourseExitVisible = false;
      this.exitlearn_submit();
      //There are something
      this.selectedExitReason = "";
      this.CourseExitinputValue = "";
    } else {
      this.notification.create(
        'error',
        '发生错误！',
        `请填写表单全部内容`);
    }
  }

  handleCancel_ExitCourse(): void {
    this.CourseExitVisible = false;
    this.selectedExitReason = "";
    this.CourseExitinputValue = "";
  }

  //加入课程
  joincourse_submit() {
    if (this.userId != null) {
      this.courseinfservice.joinCourse(this.userId, this.courseid, this.teachplanId).subscribe((res: any) => {
        this.notification.create(
          'success',
          '提交成功！',
          `提交成功`)
        this.joinCourse.emit();
      }, error => {
        this.notification.create(
          'error',
          '错误！',
          `${error}`,
          { nzDuration: 100 }
        )
      });
      this.joinCourse.emit("");
    }else{
      this.notification.create(
        'error',
        '错误！',
        `请先登录`
      )
    }

  }
  //退出学习
  exitlearn_submit() {
    this.courseinfservice.exitCourse(this.userId, this.courseid, this.teachplanId).subscribe((res: any) => {
      this.notification.create(
        'success',
        '提交成功！',
        `提交成功`)
      this.exitCourse.emit("");
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`
      )
    });
  }

  //收藏
  collect_submit() {
    if(this.userId==null){
      this.notification.create(
        'error',
        '错误！',
        `请先登录`
      )
      return;
    }
    this.courseinfservice.collect_submit(this.teachplanId, parseInt(this.courseid), 1).subscribe((res: any) => {
      this.exitCourse.emit();//事件exitCourse事件仅用来更新数据，无实际意义
      this.notification.create(
        'success',
        '提示',
        `收藏成功`
      )
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`
      )
    });
  }

  //取消收藏
  uncollect_submit() {
    this.courseinfservice.Uncollect_submit(this.teachplanId, this.courseid, "1").subscribe((res: any) => {
      this.exitCourse.emit();//事件exitCourse事件仅用来更新数据，无实际意义
      this.notification.create(
        'success',
        '提示',
        `取消收藏成功`
      )
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`
      )
    });
  }

  initteachplan(id: string) {
    if (id == "0" || id == undefined) {
      this.teacherplans[0].color = '#458B74';
      this.currentplan = this.teacherplans[0];
    } else {
      for (let temp of this.teacherplans) {
        if (temp.id == id) {
          this.currentplan = temp;
          temp.color = '#458B74';
        } else {
          temp.color = 'cyan';
        }
      }
    }
  }

  //改变教学计划
  changeteachplan(id: number) {
    for (let temp of this.teacherplans) {
      if (temp.id == id) {
        this.currentplan = temp;
        this.changePlan.emit(id);
        temp.color = '#458B74';
      } else {
        temp.color = 'cyan';
      }
    }
  }


  navigateByUrl(url: string) {
    this.route.navigateByUrl(url)
  }
}
