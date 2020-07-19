import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ClientCourseVideoService } from 'src/app/service/client-course-video/client-course-video.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CourseManagementBackHalfService } from 'src/app/service/course-management-back-half/course-management-back-half.service';
import { NzNotificationService } from 'ng-zorro-antd';
@Component({
  selector: 'app-coursevideo',
  templateUrl: './coursevideo.component.html',
  styleUrls: ['./coursevideo.component.less'],
  providers: [ClientCourseVideoService]
})
export class CoursevideoComponent implements OnInit {
  courseId: string;
  teachplanId: string;
  taskId: string;
  userId: any;

  taskType: any;

  title: string = '';
  catalog_visible = false;
  note_visible = false;
  question_visible = false;
  taskList: any;
  noteForm: FormGroup;
  questionForm: FormGroup;
  videoLearingStatus: string;

  currentTask: any;
  currentactivity: any;
  constructor(private router: Router, private formBuilder: FormBuilder,
    private courseVideoService: ClientCourseVideoService, private message: NzMessageService,
    private courseManagement$: CourseManagementBackHalfService,
    private notification: NzNotificationService,
    private route: Router) { }

  ngOnInit() {
    this.courseId = location.pathname.split('/')[3];
    this.teachplanId = location.pathname.split('/')[5];
    this.taskId = location.pathname.split('/')[7];
    this.userId = window.localStorage.getItem("id");

    // this.courseVideoService.getTaskList(this.teachplanId.toString()).subscribe(result => {
    //   // this.taskList = result;

    //   this.taskList = result.data[Object.keys(result.data)[0]];
    //   // this.taskName="";
    //   // let index=Number(this.taskId)-1;
    //   // this.title = this.taskList[index].title;  // taskId不是数组下标！！

    //   //获取任务信息！！！！！！！！
    // });

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



    this.noteForm = this.formBuilder.group({
      noteContent: ['', Validators.required]
    });

    this.questionForm = this.formBuilder.group({
      questionTitle: ['', Validators.required],
      questionContent: ['', Validators.required]
    });

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
    this.courseVideoService.getCurrentTask(this.taskId.toString()).subscribe(result => {
      this.currentTask = result.data;
      this.currentactivity = result.data["Activity"];
      this.taskType =  result.data.Activity.mediatype;
      if(this.taskType == "download"){
        this.message.info('开始下载', { nzDuration: 1000 });
        window.open('http://172.16.10.94:9013/'+result.data.CourseMaterialV8s[0].fileuri);
      }
      if(this.taskType == "homework"){
        this.navigateByUrl("")
      }
      if(this.taskType == "testpaper"){
        this.navigateByUrl("")
      }
    });
  }
  //记笔记
  noteSubmit({ value, valid }): void {
    let code; // 返回码
    console.log(value.noteContent);
    this.courseVideoService.postNote(this.courseId, this.teachplanId, this.taskId, value.noteContent, this.userId).subscribe(result => {
      this.createMessage(result.code);
      if (result.code == 200) {
        this.noteForm.setValue({ noteContent: '' }); // 清空
        this.closeNote();
      }
    });
  }
  //提问题
  questionSubmit({ value, valid }): void {
    this.courseVideoService.postQuestion(this.courseId, this.teachplanId, value.questionContent, value.questionTitle, this.userId).subscribe(result => {
      this.createMessage(result.code);
      if (result.code == 200) {
        this.questionForm.setValue({ questionTitle: '', questionContent: '' }); // 清空
        this.closeQuestion();
      }
    });
  }

  //任务完成
  finishTask() {
    if (this.checkFinishCondition()) {

    }
  }

  checkFinishCondition() {
    return true
  }



  setVideoLearingStatus(status: any): void {
    this.videoLearingStatus = status;
  }

  createMessage(code: number): void {
    if (code === 200) {
      this.message.create('success', '提交成功');
    } else {
      this.message.create('error', '提交失败:' + code);
    }
  }
  openCatalog(): void {
    this.catalog_visible = true;
  }

  closeCatalog(): void {
    this.catalog_visible = false;
  }
  openNote(): void {
    this.note_visible = true;
  }

  closeNote(): void {
    this.note_visible = false;
  }
  openQuestion(): void {
    this.question_visible = true;
  }

  closeQuestion(): void {
    this.question_visible = false;
  }

  navigateByUrl(url: string) {
    this.route.navigateByUrl(url)
  }

  downloadMaterial(){
    this.message.info('开始下载', { nzDuration: 1000 });
    window.open('http://172.16.10.94:9013/'+this.currentTask.CourseMaterialV8s[0].fileuri);
  }
}
