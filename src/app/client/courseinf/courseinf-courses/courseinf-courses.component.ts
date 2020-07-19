import { Component, OnInit } from '@angular/core';
import { CourseInfService } from 'src/app/service/courseinf-frontend/courseinf-frontend.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {Router} from '@angular/router';
@Component({
  selector: 'app-courseinf-courses',
  templateUrl: './courseinf-courses.component.html',
  styleUrls: ['./courseinf-courses.component.less'],
  inputs:["courses","courseid","teachplanId","joinINf"],
})
export class CourseinfCoursesComponent implements OnInit {
  courseid="0";
  teachplanId = "0";
  joinINf = null;
  //课程列表
  courses = [{ title: "任务1: 禁毒历史（下）"}];

  // total_course_p_num = 1;//总课程页码
  // coursepage_number = 1;//当前课程页码
  
  constructor(private courseinfservice: CourseInfService,private notification: NzNotificationService,private route: Router) { }

  ngOnInit() {

  }

  navigateByUrl(url: string) {
    if(this.joinINf==null ||this.joinINf.join==false){
      alert("请先加入课程");
    }else{
      this.route.navigateByUrl(url);
    }
  }

  getTaskByType(tasks: any, type: string) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].mode == type) {
        return tasks[i];
      }
    }
    return null;
  }

}
