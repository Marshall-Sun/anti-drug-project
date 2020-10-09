import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ClientCourseVideoService } from 'src/app/service/client-course-video/client-course-video.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CourseManagementBackHalfService } from 'src/app/service/course-management-back-half/course-management-back-half.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-taskpreview',
  templateUrl: './taskpreview.component.html',
  styleUrls: ['./taskpreview.component.less']
})
export class TaskpreviewComponent implements OnInit {
  courseId: string;
  teachplanId: string;
  taskId: string;
  userId: any;

  taskType: any;

  title: string = '';

  taskList: any;


  videoUrl: any;

  currentTask: any;
  currentactivity: any;
  constructor(private router: Router, private formBuilder: FormBuilder,
    private courseVideoService: ClientCourseVideoService, private message: NzMessageService,
    private courseManagement$: CourseManagementBackHalfService,
    private notification: NzNotificationService,
    private route: Router) { }

  ngOnInit() {
    //各种Id获取
    this.courseId = location.pathname.split('/')[3];
    this.teachplanId = location.pathname.split('/')[5];
    this.taskId = location.pathname.split('/')[7];
    this.userId = window.localStorage.getItem("id");


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

    //获取任务详细信息
    this.getcurrentTask();
  }

  //目录相关
  setCoursesCatalog(res: any) {
    if (res.code == 200) {
      this.taskList = [];
      for (var key in res.data) {
        this.taskList.push(res.data[key])
      }
    } else {
      this.taskList = [];
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

  //获取当前任务详情
  getcurrentTask() {
    this.courseVideoService.getCurrentTaskContent(this.teachplanId.toString(),this.taskId.toString(),this.userId.toString()).subscribe(result => {
      this.currentTask = result.data;
      this.currentactivity = result.data["Activity"];
      this.taskType =  result.data.Activity.mediatype;
      if(this.taskType == "text"){

      }
      if(this.taskType == "video"){
        this.videoUrl = result.data.ActivityVideo.mediauri
      }
      if(this.taskType == "download"){//如果是下载,打开下载链接
        this.message.info('开始下载', { nzDuration: 1000 });
        window.open('http://localhost:9013'+result.data.CourseMaterialV8s[0].fileuri);
      }
      //下面的不用管
      if(this.taskType == "homework"){//如果是作业,跳转到作业页面，本页不处理作业,作业页面尚未处理好
        this.navigateByUrl("client/courseId/"+this.teachplanId+"/taskId/"+this.taskId+"/preview_homework")
      }
      if(this.taskType == "testpaper"){//如果是考试,跳转到考试页面，本页不处理考试
        this.navigateByUrl("client/courseId/"+this.teachplanId+"/taskId/"+this.taskId+"/preview_testpaper")
      }
    });
  }

  //页面跳转
  navigateByUrl(url: string) {
    this.route.navigateByUrl(url)
  }

  //下载资料
  downloadMaterial() {
    this.message.info('开始下载', { nzDuration: 1000 });
    window.open('http://localhost:9013' + this.currentTask.CourseMaterialV8s[0].fileuri);
  }

  //以前的代码

  createMessage(code: number): void {
    if (code === 200) {
      this.message.create('success', '提交成功');
    } else {
      this.message.create('error', '提交失败:' + code);
    }
  }



}
