/**
 * 添加任务的流程
 * 1.设置任务类型 settask
 * 2.填写任务内容表单  pt_title  pt_content  handleOk_addtask提交
 * 
 */


import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseManagementBackHalfService } from 'src/app/service/course-management-back-half/course-management-back-half.service';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService, NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { QuestionCreateService } from 'src/app/service/question-create/question-create.service';
import { MaterialService } from 'src/app/service/material/material.service';
import { CourseFileService } from 'src/app/service/course-file/course-file.service';
enum QUSTIONTYPE {
  single_choice = '单选题',
  choice = '多选题',
  uncertain_choice = '不定项选择题',
  determine = '判断题'
}
@Component({
  selector: 'app-plan-tasks',
  templateUrl: './plan-tasks.component.html',
  styleUrls: ['./plan-tasks.component.less'],
})
export class PlanTasksComponent implements OnInit {
  userid = undefined;
  courseId: any = 0;
  teachplanId: any = 0;
  tasklist = [];

  //题目相关
  questionPageIndex = 0;
  questionTotalpage = 0;
  questionlist: any;
  questionKeyword: any;
  questionType: any;
  questiontypeToChinese = QUSTIONTYPE;
  listOfQuestionTypes: any[] = [
    { label: "单选题", value: "single_choice" },
    { label: "多选题", value: "choice" },
    { label: "不定项选择题", value: "uncertain_choice" },
    { label: "判断题", value: "determine" }
  ]
  selectedQuestions: any;
  questionsIds: any;


  //表单控制变量
  addchapter_visible = false;//添加章
  addtask_visible = false;//添加任务
  addsubject_visible = false;//添加题目
  addtask_currentpage = 0;
  addtssk_currenttype = "None";
  //图文类型
  pt_Form: FormGroup;

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
  ma_Form: FormGroup;
  //考试类型
  testForm: FormGroup;
  testpaper: any;
  radioTestValue = "score";
  testfinisheScore = 0;

  //作业类型
  homeWorkForm: FormGroup;
  mapOfCheckedId: { [key: string]: boolean } = {};

  refreshStatus(): void {
    console.log(this.mapOfCheckedId);
  }
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
  ) {

  }
  ngOnInit() {
    this.userid = window.localStorage.getItem("id");
    this.pt_Form = this.fb.group({
      content: [null, [Validators.required]],
      createdUserId: [null],
      finishDetail: [null],
      fromCourseId: [null],
      fromCourseSetId: [null],
      isOptional: [null],
      remark: [null],
      mode: [null],
      seq: [null],
      title: [null, [Validators.required]]
    });
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
    this.ma_Form = this.fb.group({
      courseType: [null],
      fileIds: [null],
      fromCourseId: [null],
      fromCourseSetId: [null],
      introduction: [null],
      isOptional: [null],
      mode: [null],
      seq: [null],
      title: [null, [Validators.required]],
      userId: [null]
    })
    this.testForm = this.fb.group({
      content: [null],
      createdUserId: [null],
      doTimes: [null, [Validators.required]],
      finishScore: 0,
      finishType: [null],
      fromCourseId: [null],
      fromCourseSetId: [null],
      isOptional: [null],
      limitedTime: [null, [Validators.required]],
      mode: [null],
      reDoInterval: [null, [Validators.required]],
      remark: [null],
      seq: [null],
      testpaperId: [null, [Validators.required]],
      title: [null, [Validators.required]],
    });
    this.homeWorkForm = this.fb.group({
      content: [null, [Validators.required]],
      fromCourseId: [null],
      fromCourseSetId: [null],
      fromUserId: [null],
      isOptional: [null],
      itemCount: [null],
      itemsDtos: [null],
      limitedTime: [null],
      //mediaType: [null],
      mode: [null],
      remark: [null],
      seq: [null],
      title: [null, [Validators.required]]
    });
    this.courseId = location.pathname.split('/')[3];
    this.teachplanId = location.pathname.split('/')[5];
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
      case "text": {
        var optional = 0;
        if (this.iselective) {
          optional = 1;
        }
        if (this.pt_Form.valid) {
          this.pt_Form.patchValue({
            createdUserId: this.userid,
            finishDetail: "观看图文",
            fromCourseId: parseInt(this.teachplanId),
            fromCourseSetId: parseInt(this.courseId),
            isOptional: optional,
            remark: "",
            mode: this.TaskMode,
            seq: this.addChildTaskSeq || this.tasklist.length + 1,
          })
          this.courseManagement$.addPlanTask_Text(this.pt_Form.value).subscribe((res: any) => {
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
        } else {
          this.notification.create(
            'error',
            '请完成表单再提交',
            `请完成表单再提交`)
        }
        break;
      }
      case "homework": {
        this.createTask_homework();
        break;
      }
      case "video": {
        this.createTask_video();
        break;
      }
      case "download": {
        this.createTask_download();
        break;
      }
      case "testpaper": {

        this.createTask_test();
        break;

      }
    }
    this.initform_addtask();
  }

  createTask_homework() {
    var optional = 0;
    if (this.iselective) {
      optional = 1;
    }
    var questionitems = []
    for (let i = 0; i < this.selectedQuestions.length; i++) {
      questionitems.push(
        {
          copyid: 0,
          migrateitemid: 0,
          missScore: 0,
          parentid: 0,
          questionid: this.selectedQuestions[i].id,
          questiontype: this.selectedQuestions[i].type,
          score: this.selectedQuestions[i].score,
          seq: i + 1,
          testid: 0,
          type: "homework"
        }
      )
    }
    this.homeWorkForm.patchValue({
      fromCourseId: parseInt(this.teachplanId),
      fromCourseSetId: parseInt(this.courseId),
      fromUserId: this.userid,
      isOptional: optional,
      itemCount: questionitems.length,
      itemsDtos: questionitems,
      limitedTime: 0,
      //mediaType: "",
      //mode:"",
      remark: "",
      mode: this.TaskMode,
      seq: this.addChildTaskSeq || this.tasklist.length + 1,
    })
    this.courseManagement$.addPlanTask_Homework(this.homeWorkForm.value).subscribe((res: any) => {
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

  createTask_download() {
    var optional = 0;
    if (this.iselective) {
      optional = 1;
    }

    this.ma_Form.patchValue({
      courseType: "",
      fileIds: [this.current_select_material.fileID || this.current_select_material.fileId],
      fromCourseId: parseInt(this.teachplanId),
      fromCourseSetId: parseInt(this.courseId),
      introduction: "",
      isOptional: optional,
      mode: this.TaskMode,
      seq: this.addChildTaskSeq || this.tasklist.length + 1,
      title: this.material_title,
      userId: this.userid
    })
    this.courseManagement$.addPlanTask_DownLoad(this.ma_Form.value).subscribe((res: any) => {
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

  createTask_test() {
    var optional = 0;
    if (this.iselective) {
      optional = 1;
    }

    this.testForm.patchValue({
      finishType: this.radioTestValue,
      finishScore: this.testfinisheScore,
      content: "",
      createdUserId: parseInt(this.userid),
      fromCourseId: parseInt(this.teachplanId),
      fromCourseSetId: parseInt(this.courseId),
      isOptional: optional,
      remark: "",
      mode: this.TaskMode,
      seq: this.addChildTaskSeq || this.tasklist.length + 1,
    })
    this.courseManagement$.addPlanTask_Test(this.testForm.value).subscribe((res: any) => {
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


  //添加任务
  handleOpen_addsubject(): void {
    this.searchData();
    this.addsubject_visible = true;
  }

  handleOk_addsubject(): void {
    this.addsubject_visible = false;
  }

  handleCancel_subject(): void {
    this.addsubject_visible = false;
  }

  //表单初始化
  initform_addtask(): void {
    this.addtask_currentpage = 0;
    this.addtssk_currenttype = "";
    this.pt_Form = this.fb.group({
      content: [null, [Validators.required]],
      createdUserId: [null],
      finishDetail: [null],
      fromCourseId: [null],
      fromCourseSetId: [null],
      isOptional: [null],
      remark: [null],
      mode: [null],
      seq: [null],
      title: [null, [Validators.required]]
    });
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
    this.ma_Form = this.fb.group({
      courseType: [null],
      fileIds: [null],
      fromCourseId: [null],
      fromCourseSetId: [null],
      introduction: [null],
      isOptional: [null],
      mode: [null],
      seq: [null],
      title: [null, [Validators.required]],
      userId: [null]
    })
    this.material_title = "";
    this.current_select_material = undefined;
    this.sourcetotalpage = 1;
    this.sourcetotalpage_course = 1;
    this.iselective = false;
    this.selectedQuestions = [];
    this.questionsIds = [];
    this.mapOfCheckedId = {};
    this.homeWorkForm = this.fb.group({
      content: [null, [Validators.required]],
      fromCourseId: [null],
      fromCourseSetId: [null],
      fromUserId: [null],
      isOptional: [null],
      itemCount: [null],
      itemsDtos: [null],
      limitedTime: [null],
      //mediaType: [null],
      mode: [null],
      remark: [null],
      seq: [null],
      title: [null, [Validators.required]]
    });
    this.testForm = this.fb.group({
      content: [null],
      createdUserId: [null],
      doTimes: [null, [Validators.required]],
      finishScore: 0,
      finishType: [null],
      fromCourseId: [null],
      fromCourseSetId: [null],
      isOptional: [null],
      limitedTime: [null, [Validators.required]],
      mode: [null],
      reDoInterval: [null, [Validators.required]],
      remark: [null],
      seq: [null],
      testpaperId: [null, [Validators.required]],
      title: [null, [Validators.required]],
    });
    this.radioTestValue = "score";
    this.testfinisheScore = 0;
  }

  //1.设置任务类型
  settask(inf: string): void {
    this.addtssk_currenttype = inf;
    this.addtask_currentpage += 1;
    if (this.addtssk_currenttype == "video" || this.addtssk_currenttype == "download") {
      this.getMaterials();
      this.getCourseFileList();
    }
    if (this.addtssk_currenttype == 'testpaper') {
      this.getTestPapers();
    }
  }

  nextpage() {
    if (this.checkContent()) {
      this.addtask_currentpage += 1;
    } else {
      this.notification.create(
        'error',
        '发生错误！',
        `请填写表单所有内容`)
    }

  }

  lastpage() {
    this.addtask_currentpage -= 1;
    if (this.addtask_currentpage == 0) {
      this.initform_addtask();
    }
  }


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
    if (this.addtssk_currenttype == "text") {
      if (this.pt_Form.controls['title'].valid && this.pt_Form.controls['content'].valid) {
        return true;
      } else {
        return false;
      }
    } else if (this.addtssk_currenttype == "homework") {
      if(this.isCreateTask){
        if (this.homeWorkForm.controls['title'].valid && this.homeWorkForm.controls['content'].valid && this.selectedQuestions.length > 0) {
          return true;
        } else {
          return false;
        }
      }else{
        if (this.homeWorkForm.controls['title'].valid && this.homeWorkForm.controls['content'].valid) {
          return true;
        } else {
          return false;
        }
      }
    } else if (this.addtssk_currenttype == "video" || this.addtssk_currenttype == "download") {
      if (this.material_title != "" && this.current_select_material != undefined) {
        return true;
      } else {
        return false;
      }
    } else if (this.addtssk_currenttype == "testpaper") {
      if (this.testForm.valid) {
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

  //题目相关--------------------------------------------------

  searchData(pageIndex: number = this.questionPageIndex, pageSize: number = 10, keyWord: any = this.questionKeyword, type: string = (this.questionType == null) ? '' : this.questionType) {
    this._questionCreateService.getCourseQuestionList(this.courseId, pageIndex, pageSize, keyWord, type).subscribe(res => {
      this.questionlist = res.data.data;
      this.questionTotalpage = res.data.total;
    })
  }

  check(question: any) {
    var key = true;
    for (var i = 0; i < this.selectedQuestions.length; i++) {
      if (this.selectedQuestions[i].id == question.id) {
        key = false;
        this.selectedQuestions.splice(i, 1);
      }
    }
    if (key) {
      this.selectedQuestions.push(question)
    }

    console.log(this.selectedQuestions);
  }

  check2(questionId: number) {
    var key = true;
    for (var i = 0; i < this.questionsIds.length; i++) {
      if (this.questionsIds[i] == questionId) {
        key = false;
        this.questionsIds.splice(i, 1);
      }
    }
    if (key) {
      this.questionsIds.push(questionId)
    }
  }



  confirmDelete(questionId: number = 1) {
    this.modalService.confirm({
      nzTitle: '真的要删除该题目吗?',
      nzContent: '<b style="color: red;">此题目将不会出现在本课程中</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        for (var i = 0; i < this.selectedQuestions.length; i++) {
          if (this.selectedQuestions[i].id == questionId) {
            this.selectedQuestions.splice(i, 1);
            this.mapOfCheckedId[questionId] = false;
            break;
          }
        }
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  confirmDeleteList() {
    this.modalService.confirm({
      nzTitle: '真的要删除这些题目吗?',
      nzContent: '<b style="color: red;">此题目将不会出现在本课程中</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        var j = 0;
        var i = 0;
        var isdelete = false;
        while (i < this.questionsIds.length) {
          isdelete = false;
          while (j < this.selectedQuestions.length) {
            if (this.selectedQuestions[j].id == this.questionsIds[i]) {
              this.selectedQuestions.splice(j, 1);
              this.mapOfCheckedId[this.questionsIds[i]] = false;
              this.questionsIds.splice(i, 1);
              isdelete = true;
              break;
            }
          }
          if (isdelete == false) {
            i++;
          }
        }
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  getMaterials() {
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


  getTestPapers() {
    this._questionCreateService.getExamListByCourseId(this.courseId).subscribe(result => {
      //this.total = result.data.total;
      this.testpaper = result.data.data;
    }, error1 => {
      this.notification.error('发生错误！', `${error1.error}`)
    })
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
    this.courseManagement$.getTaskDetail(this.teachplanId,task.taskId,this.userid).subscribe((res: any) => {
      this.currentEditTask = task;
      let curretntask = res.data;
      this.isCreateTask = false;
      this.addtssk_currenttype = task.type;
      this.addtask_currentpage += 1;
      if (this.addtssk_currenttype == "video" || this.addtssk_currenttype == "download") {
        this.getMaterials();
        this.getCourseFileList();
      }
      if (this.addtssk_currenttype == 'testpaper') {
        this.getTestPapers();
      }

      switch (this.addtssk_currenttype) {
        case "text": {
          this.edit_text(curretntask);
          break;
        }
        case "homework": {
          this.edit_homework(curretntask);
          break;
        }
        case "video": {
          this.edit_video(curretntask);
          break;
        }
        case "download": {
          this.edit_download(curretntask);
          break;
        }
        case "testpaper": {
          this.edit_test(curretntask);
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

  edit_text(task: any) {
    if (task.isOptional == 1) {
      this.iselective = true;
    }
    this.pt_Form.patchValue({
      content: task.Activity.content,
      finishDetail: "观看图文",
      isOptional: task.CourseTask.isoptional,
      title: task.Activity.title
    });
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
      filename: faleName[faleName.length-1],
      fileID: task.ActivityVideo.mediaid
    }
    this.current_select_material = file;
  }

  edit_homework(task: any) {
    if (task.isOptional == 1) {
      this.iselective = true;
    }
    this.homeWorkForm.patchValue({
      content: task.Activity.content,
      fromUserId: this.userid,
      isOptional: task.CourseTask.isoptional,
      title: task.Activity.title
    });
  }

  edit_download(task: any) {
    if (task.isOptional == 1) {
      this.iselective = true;
    }
    this.ma_Form.patchValue({
      fileIds: task.ActivityDownload.fileids,
      fromCourseId: task.CourseTask.courseid,
      fromCourseSetId: task.CourseTask.fromcoursesetid,
      isOptional: task.CourseTask.isoptional,
      title:  task.Activity.title
    })
    this.material_title = task.Activity.title;
    let faleName = task.CourseMaterialV8s[0].title
    let file = {
      filename: faleName,
      fileID: task.ActivityDownload.fileids
    }
    this.current_select_material = file;
  }

  edit_test(task: any) {
    if (task.isOptional == 1) {
      this.iselective = true;
    }
    this.testForm.patchValue({
      doTimes:task.ActivityTestpaper.dotimes,
      finishScore: task.ActivityTestpaper.finishcondition.finishScore,
      finishType: task.ActivityTestpaper.finishcondition.type,
      isOptional: task.CourseTask.isoptional,
      limitedTime: task.ActivityTestpaper.limitedtime,
      reDoInterval: task.ActivityTestpaper.redointerval,
      testpaperId: task.ActivityTestpaper.mediaid,
      title: task.Activity.title,
    });
  }


  handleOk_edittask(): void {
    this.addtask_visible = false;
    var optional = 0;
    if (this.iselective) {
      optional = 1;
    }
    switch (this.addtssk_currenttype) {
      case "text": {
        this.pt_Form.patchValue({
          isOptional:optional
        })
        this.courseManagement$.edit_text(this.currentEditTask.taskId, this.pt_Form.value).subscribe((res: any) => {
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
      case "homework": {
        this.homeWorkForm.patchValue({
          isOptional:optional
        })
        this.courseManagement$.edit_homework(this.currentEditTask.taskId, this.homeWorkForm.value).subscribe((res: any) => {
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
      case "video": {
        this.vi_Form.patchValue({
          isOptional:optional,
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
      case "download": {
        this.ma_Form.patchValue({
          isOptional:optional,
          title: this.material_title,
          fileIds: [this.current_select_material.fileID || this.current_select_material.fileId]
        })
        this.courseManagement$.edit_download(this.currentEditTask.taskId, this.ma_Form.value).subscribe((res: any) => {
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
      case "testpaper": {
        this.testForm.patchValue({
          isOptional:optional
        })
        this.courseManagement$.edit_test(this.currentEditTask.taskId, this.testForm.value).subscribe((res: any) => {
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

  deleteChildTask(){
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

}
