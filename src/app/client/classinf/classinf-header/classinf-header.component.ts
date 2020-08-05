import { Component, OnInit, EventEmitter } from '@angular/core';
import { ClassInfService } from 'src/app/service/classinf-frontend/classinf-frontend.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {TestuserService} from '../../../service/teacher-frontend/teacher-frontend.service';
@Component({
  selector: 'app-classinf-header',
  templateUrl: './classinf-header.component.html',
  styleUrls: ['./classinf-header.component.less'],
  inputs: ["userId","classid","joinINf"],
  outputs:["joinClass","exitClass"]
})
export class ClassinfHeaderComponent implements OnInit {
  classid = "0"
  userId: any;
  currentclass =
    {
      //二维吗
      qrcode: "../../../../assets/img/timg.jpg",
      //时效
      term: "None",
      //承诺服务
      commitmentservice: [false, false, false, false, false, false],

      classroomCategory: "高中班级",
      coursenum: 1,
      id: 10,
      postNum: 2,
      recommended: 0,
      recommendedSeq: 100,
      recommendedTime: 0,
      recommendedTimeString: "1970-01-01 08:00:00",
      //service: "["event","liveAnswer","teacherAnswer","testpaperReview","homeworkReview"]",
      smallpicture: "../../../../assets/img/timg.jpg",
      status: "published",
      studentnum: 56,
      title: "沈阳市广全学校禁毒教学活动",
      totalNum: 1,
      ratingnum:1,
    };


  //页头显示用变量
  commitmentservice = ["grey", "", "", "", "", ""];

  //退出班级
  CourseExitVisible = false;
  selectedExitReason: string;
  CourseExitinputValue: string;

  joinClass: EventEmitter<any>;
  exitClass: EventEmitter<any>;


  constructor(private classinfservice: ClassInfService, private notification: NzNotificationService,
    private testuserservice:TestuserService) {
      this.joinClass = new EventEmitter();
      this.exitClass = new EventEmitter();
  }

  ngOnInit() {
    //初始化当前页码数据
    this.classinfservice.getClass(this.classid).subscribe((res: any) => {
      this.setcurrentclass(res);
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });

  }
  
  setcurrentclass(res: any) {
    this.currentclass = res.data;
    if (this.currentclass.smallpicture == "") {
      this.currentclass.smallpicture = "../../../../assets/img/timg.jpg";
    } else if (this.currentclass.smallpicture.substr(0, 6) == "public") {
      this.currentclass.smallpicture = "../../../../assets/img/timg.jpg";
    } else if (this.currentclass.smallpicture.substr(7, 7) == "edusoho") {
      this.currentclass.smallpicture = "../../../../assets/img/timg.jpg";
    }
    //console.log(this.currentclass);
    //服务相关
    // for (var i = 0; i < 6; i++) {
    //   if (this.currentclass.commitmentservice[i]) {
    //     this.commitmentservice[i] = "magenta";
    //   }
    // }
  }

  //退班级
  showExitCoursefirm(): void {
    this.CourseExitVisible = true;
  }

  handleOk_ExitCourse(): void {
    if (this.selectedExitReason!=undefined&&this.selectedExitReason!=""&&this.selectedExitReason!="其他") {
      this.CourseExitVisible = false;
      this.exitlearn_submit();
      //There are something
      this.selectedExitReason = "";
      this.CourseExitinputValue = "";
    }else if(this.CourseExitinputValue != ""&&this.CourseExitinputValue != undefined){
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

  //加入班级
  joinclass_submit() {
    if(this.userId==null){
      this.notification.create(
        'error',
        '发生错误！',
        `请先登录`)
      return;
    }
    this.classinfservice.joinclass_submit(this.classid, this.userId).subscribe((res: any) => {
      this.joinClass.emit();
      this.notification.create(
        'success',
        '提交成功！',
        `提交成功`)
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    })
  }

  //退出学习
  exitlearn_submit() {
    this.classinfservice.exitlearn_submit(this.classid,this.userId).subscribe((res: any) => {
      this.exitClass.emit();
      this.notification.create(
        'success',
        '提交成功！',
        `提交成功`)
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    })
  }

}
