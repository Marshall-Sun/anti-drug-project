import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseManagementBackHalfService } from 'src/app/service/course-management-back-half/course-management-back-half.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService, NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { QuestionCreateService } from 'src/app/service/question-create/question-create.service';
import { MaterialService } from 'src/app/service/material/material.service';
import { CourseFileService } from 'src/app/service/course-file/course-file.service';
@Component({
  selector: 'app-plan-tasks',
  templateUrl: './plan-tasks.component.html',
  styleUrls: ['./plan-tasks.component.less'],
})
export class OpenresourcePlanTasksComponent implements OnInit {
  userid = undefined;
  courseId: any = 0;
  teachplanId: any = 0;
  tasklist = [];

  //表单控制变量
  addchapter_visible = false;//添加章
  addtask_visible = false;//添加任务
  addtssk_currenttype = "video";

  //视频/资料类型
  material_title = "";
  soursedata: any;
  sourcetotalpage = 1;
  soursepage = 1;
  searchKeyword = "";
  current_select_material = undefined;

  soursedata_course: any;
  sourcetotalpage_course = 1;
  soursepage_course = 1;

  vi_Form: FormGroup;

  material_from:"mymaterial";

  //完成条件
  iselective = false

  //添加子任务使用
  addChildTaskSeq = 0;
  TaskMode = "lesson"

  //编辑任务用
  isCreateTask = true;
  currentEditTask: any;

  constructor(public fb: FormBuilder,
    private routerInfo: ActivatedRoute,
    private courseManagement$: CourseManagementBackHalfService,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private _questionCreateService: QuestionCreateService,
    private modalService: NzModalService,
    private materialservice: MaterialService,
    private _courseFileService: CourseFileService,
    private router: Router,
  ) {

  }
  ngOnInit() {
    this.userid = window.localStorage.getItem("id");
    this.vi_Form = this.fb.group({
      courseType: [null],
      fileId: [null],
      finishDetail: [null],
      finishType: [null],
      fromCourseId: [null],
      fromCourseSetId: [null],
      fromUserId: [null],
      isOptional: [null],
      mode: [null],
      seq: [null],
      title: [null, [Validators.required]]
    })
    // this.courseId = location.pathname.split('/')[3];
    // this.teachplanId = location.pathname.split('/')[5];
    this.courseId = "188";
    this.teachplanId = "138";
    this.getTaskList();
  }


  getTaskList() {
    this.tasklist = []
    this.courseManagement$.getPlanTaskNew(this.teachplanId).subscribe(res => {
      for (const key of Object.keys(res.data)) {
        this.tasklist.push(res.data[key]);
      }
      this.tasklist.sort(function (a, b) {
        return a[0].sequence - b[0].sequence;
      })
      console.log(res);
    })
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.tasklist, event.previousIndex, event.currentIndex);
    let idList = [];
    let taskIdlist = []
    this.tasklist.forEach((item, index) => {
      idList.push(item)
      taskIdlist.push(parseInt(item[0].taskId))//sequence可能需要改变
    });
    this.tasklist = idList;
    console.log(taskIdlist)
    //保存到后端
    this.courseManagement$.sortPlanTask(this.teachplanId, taskIdlist).subscribe(result => {
      if (result.code == 200) {
        this.getTaskList();
        this.notification.success(
          '排序成功！',
          '排序成功'
        )
      } else {
        this.getTaskList();
        this.notification.error(
          '排序失败！',
          '排序失败！'
        )
      }

    }, error1 => {
      this.notification.error(
        '发生错误！',
        `${error1.error}`
      )
    })
  }


  //表单控制函数
  //---------------------------------添加章
  //---------------------------------添加任务
  handleOpen_addtask(addChildTaskSeq = 0, TaskMode = 'lesson'): void {
    this.addtask_visible = true;
    this.addChildTaskSeq = addChildTaskSeq;
    this.TaskMode = TaskMode;
    this.isCreateTask = true;
    this.initform_addtask();
  }

  handleOk_addtask(): void {
    this.addtask_visible = false;
    switch (this.addtssk_currenttype) {
      case "video": {
        this.createTask_video();
        break;
      }
    }
    this.initform_addtask();
  }

  createTask_video() {
    var optional = 0;
    if (this.iselective) {
      optional = 1;
    }

    this.vi_Form.patchValue({
      courseType: "",
      fileId: this.current_select_material.fileID || this.current_select_material.fileId,
      finishDetail: "观看视频",
      finishType: "",
      fromCourseId: parseInt(this.teachplanId),
      fromCourseSetId: parseInt(this.courseId),
      fromUserId: this.userid,
      isOptional: optional,
      mode: this.TaskMode,
      seq: this.addChildTaskSeq || this.tasklist.length + 1,
      title: this.material_title
    })
    this.courseManagement$.addPlanTask_Video(this.vi_Form.value).subscribe((res: any) => {
      this.notification.create(
        'success',
        '发送成功',
        `发送成功`)
      this.getTaskList();
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    })
  }

  handleCancel_addtask(): void {
    this.addtask_visible = false;
    this.initform_addtask();
  }

  //表单初始化
  initform_addtask(): void {
    this.addtssk_currenttype = "";
    this.vi_Form = this.fb.group({
      courseType: [null],
      fileId: [null],
      finishDetail: [null],
      finishType: [null],
      fromCourseId: [null],
      fromCourseSetId: [null],
      fromUserId: [null],
      isOptional: [null],
      mode: [null],
      seq: [null],
      title: [null, [Validators.required]]
    })
    this.material_title = "";
    this.current_select_material = undefined;
    this.sourcetotalpage = 1;
    this.sourcetotalpage_course = 1;
    this.iselective = false;
  }

  //1.设置任务类型
  // settask(inf: string): void {
  //   this.addtssk_currenttype = inf;
  //   if (this.addtssk_currenttype == "video" || this.addtssk_currenttype == "download") {
  //     this.getMaterials();
  //     this.getCourseFileList();
  //   }
  //   if (this.addtssk_currenttype == 'testpaper') {
  //     this.getTestPapers();
  //   }
  // }

  //自定义管道太麻烦，用函数代替
  TaskType(type: string) {
    switch (type) {
      case "lesson":
        return "课程";
      case "video":
        return "视频";
    }
    return "None";
  }

  checkContent() {
    if (this.addtssk_currenttype == "video" || this.addtssk_currenttype == "download") {
      if (this.material_title != "" && this.current_select_material != undefined) {
        return true;
      } else {
        return false;
      }
    }
    return true
  }

  publishTask(taskid) {
    this.courseManagement$.publishTask(taskid).subscribe(res => {
      this.getTaskList();
    })
  }

  unpublishTask(taskid) {
    this.courseManagement$.unpublishTask(taskid).subscribe(res => {
      this.getTaskList();
    })
  }

  deleteTask(taskid) {
    this.modalService.confirm({
      nzTitle: '真的要删除该任务吗?',
      nzContent: '该任务及其子任务将被删除。',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.courseManagement$.deleteTask(taskid).subscribe(res => {
          this.getTaskList();
        })
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  getMaterials() {
    if(this.material_from =="mymaterial"){
      var matype = this.addtssk_currenttype == "video" ? "video" : "";
      this.materialservice.getMyMaterials(
        this.userid.toString(),
        this.soursepage.toString(),
        matype,
        "",
        "",
        "",
        this.searchKeyword,
        "",
        ""
      ).subscribe((res: any) => {
        this.soursedata = res.data.data;
        this.sourcetotalpage = res.data.total;
      }, error => {
        this.notification.create(
          'error',
          '发生错误！',
          `${error.error}`)
      });
    }else if(this.material_from =="upload"){
      var matype = this.addtssk_currenttype == "video" ? "video" : "";
      this.materialservice.getCollectedMaterials(
        this.userid.toString(),
        this.soursepage.toString(),
        matype,
        "",
        "",
        "",
        this.searchKeyword,
        "",
        ""
      ).subscribe((res: any) => {
        this.soursedata = res.data.data;
        this.sourcetotalpage = res.data.total;
      }, error => {
        this.notification.create(
          'error',
          '发生错误！',
          `${error.error}`)
      });
    }else if(this.material_from == "share"){
      var matype = this.addtssk_currenttype == "video" ? "video" : "";
      this.materialservice.getShareTeachingMaterials(
        this.userid.toString(),
        this.soursepage.toString(),
        matype,
        "",
        "",
        "",
        this.searchKeyword,
        "",
        ""
      ).subscribe((res: any) => {
        this.soursedata = res.data.data;
        this.sourcetotalpage = res.data.total;
      }, error => {
        this.notification.create(
          'error',
          '发生错误！',
          `${error.error}`)
      });
    }else if(this.material_from == "public"){
      var matype = this.addtssk_currenttype == "video" ? "video" : "";
      this.materialservice.getOpenTeachingMaterials(
        this.userid.toString(),
        this.soursepage.toString(),
        matype,
        "",
        "",
        "",
        this.searchKeyword,
        "",
        ""
      ).subscribe((res: any) => {
        this.soursedata = res.data.data;
        this.sourcetotalpage = res.data.total;
      }, error => {
        this.notification.create(
          'error',
          '发生错误！',
          `${error.error}`)
      });
    }
  }

  searchMaterials() {
    this.soursepage = 1;
    this.getMaterials();
  }

  selectMaterial(material) {
    this.current_select_material = material;
  }

  uploadMaterialChange(info: any) {
    if (info.type === 'success') {
      let file = {
        filename: info.file.name,
        fileID: info.file.response.data
      }
      this.current_select_material = file;
    }
    if (info.type === 'error') {
      this.notification.create(
        'error',
        '发生错误！',
        `上传失败`)
    }
  }

  getCourseFileList(pageIndex: number = this.soursepage_course, pageSize: number = 12) {
    this._courseFileService.getCourseFileList(this.courseId, pageIndex, pageSize).subscribe(res => {
      this.soursedata_course = res.data.data;
      this.sourcetotalpage_course = res.data.total;
    })
  }
  getTaskByType(tasks: any, type: string) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].mode == type) {
        return tasks[i];
      }
    }
    return null;
  }


  editTask(task: any, mode: string) {
    this.initform_addtask();
    this.courseManagement$.getTaskContent(this.teachplanId, task.taskId, this.userid).subscribe((res: any) => {
      this.currentEditTask = task;
      let curretntask = res.data;
      this.isCreateTask = false;
      this.addtssk_currenttype = task.type;
      if (this.addtssk_currenttype == "video" || this.addtssk_currenttype == "download") {
        this.getMaterials();
        this.getCourseFileList();
      }

      switch (this.addtssk_currenttype) {
        case "video": {
          this.edit_video(curretntask);
          break;
        }
      }
      this.addtask_visible = true;
      this.addChildTaskSeq = task.sequence;
      this.TaskMode = mode;
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
      return null
    })
  }

  edit_video(task: any) {
    if (task.isOptional == 1) {
      this.iselective = true;
    }
    this.vi_Form.patchValue({
      fileId: task.ActivityVideo.mediaid,
      finishDetail: task.ActivityVideo.finishdetail,
      finishType: task.ActivityVideo.finishtype,
      isOptional: task.CourseTask.isoptional,
      title: task.Activity.title
    })
    this.material_title = task.Activity.title;
    let faleName = task.ActivityVideo.mediauri.split("/")
    let file = {
      filename: faleName[faleName.length - 1],
      fileID: task.ActivityVideo.mediaid
    }
    this.current_select_material = file;
  }

  handleOk_edittask(): void {
    this.addtask_visible = false;
    var optional = 0;
    if (this.iselective) {
      optional = 1;
    }
    switch (this.addtssk_currenttype) {
      case "video": {
        this.vi_Form.patchValue({
          isOptional: optional,
          title: this.material_title,
          fileId: this.current_select_material.fileID || this.current_select_material.fileId
        })
        this.courseManagement$.edit_video(this.currentEditTask.taskId, this.vi_Form.value).subscribe((res: any) => {
          this.notification.create(
            'success',
            '发送成功',
            `发送成功`)
          this.getTaskList();
        }, error => {
          this.notification.create(
            'error',
            '发生错误！',
            `${error.error}`)
        })
        break;
      }
    }
    this.initform_addtask();
  }

  deleteChildTask() {
    this.modalService.confirm({
      nzTitle: '真的要删除该任务吗?',
      nzContent: '该任务将被删除。',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.courseManagement$.deleteSubTask(this.currentEditTask.taskId).subscribe(res => {
          this.getTaskList();
          this.initform_addtask();
          this.addtask_visible = false;
        })
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}
