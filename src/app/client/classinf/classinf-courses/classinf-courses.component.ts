import { Component, OnInit } from '@angular/core';
import { ClassInfService } from 'src/app/service/classinf-frontend/classinf-frontend.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {Router} from '@angular/router';
@Component({
  selector: 'app-classinf-courses',
  templateUrl: './classinf-courses.component.html',
  styleUrls: ['./classinf-courses.component.less'],
  inputs:["classid"]
})
export class ClassinfCoursesComponent implements OnInit {
  //课程列表
  classid = "0";
  courses = [{ title: "任务1: 禁毒历史（下）",smallAvatar:"" }, { title: "任务1: 禁毒历史（下）",smallAvatar:"" }];

  total_course_p_num = 50;//总课程页码
  coursepage_number = 1;//当前课程页码

  constructor(private classinfservice: ClassInfService,private notification: NzNotificationService,private route: Router) { }

  ngOnInit() {
    this.classinfservice.getclassCourses(this.classid,this.coursepage_number,6).subscribe((res: any) => {
      this.setclassCourses(res);
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    })
  }

  onPageChange_course(event?: any) {
    this.classinfservice.getclassCourses(this.classid,this.coursepage_number,6).subscribe((res: any) => {
      this.setclassCourses(res);
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    })
    window.scrollTo(0, 0);
  }

  setclassCourses(res: any) {
    this.courses = res.data.list;
    this.total_course_p_num = res.data.total;

    for(var i=0;i<this.courses.length;i++){
      if (this.courses[i].smallAvatar == ""||this.courses[i].smallAvatar == undefined) {
        this.courses[i].smallAvatar = "../../../../assets/img/timg.jpg";
      } else if (this.courses[i].smallAvatar.substr(0, 6) == "public") {
        this.courses[i].smallAvatar = "../../../../assets/img/timg.jpg";
      } else if (this.courses[i].smallAvatar.substr(7, 7) == "edusoho") {
        this.courses[i].smallAvatar = "../../../../assets/img/timg.jpg";
      }
    }

  }

  navigateByUrl(url: string) {
    this.route.navigateByUrl(url)
  }

}
