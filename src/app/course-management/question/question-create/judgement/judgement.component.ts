import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { QuestionCreateService } from 'src/app/service/question-create/question-create.service';
import { CourseBaseInfoEditService } from 'src/app/service/course-base-info-edit/course-base-info-edit.service';
import { CourseManagementUtilService } from 'src/app/service/course-management-util/course-management-util.service';

@Component({
  selector: 'app-judgement',
  templateUrl: './judgement.component.html',
  styleUrls: ['./judgement.component.less']
})
export class JudgementComponent implements OnInit {

  //栅格的长度
  lblLength: number = 3;
  conLength: number = 18;

  //选择器的隐藏
  selectVisible: boolean = true;
  //高级选项的可见性
  isCollapse: boolean = false;
  //表单冒号可见性
  colonVisible: boolean = false;

  validateForm: FormGroup;

  courseId: any = 105;
  categoryId: any;

  questionId: number;

  btnDisable: boolean = false;

  submitForm(command: string = 'back'): void {
    let check: boolean = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      if (this.validateForm.controls[i].hasError('required')) {
        check = false;
      }
    }
    if (check || this.validateForm.controls.error) {
      this.getAnswer();
      this.validateForm.patchValue({
        courseId: this.courseId,
        categoryId: this.categoryId
      })
      if (this.questionId == null) {
        console.log("添加");
        this._questionCreateService.createQuestion(this.validateForm.value).subscribe(result => {
          this._nzNotificationService.create('success', '添加成功!', ``);
        }, err => {
          this._nzNotificationService.create('error', '添加失败!', ``);
        });
      } else {
        console.log("修改");
        this.validateForm.addControl('questionId', new FormControl(this.questionId, Validators.nullValidator))
        this._questionCreateService.editQuestion(this.validateForm.value).subscribe(result => {
          this._nzNotificationService.create('success', '修改成功!', ``);
        }, err => {
          this._nzNotificationService.create('error', '修改失败!', ``);
        })
      }
      console.log(this.validateForm.value);
    }
    if (check && command === "continue") {
      console.log(command);
      this.validateForm.patchValue({
        type: 'determine',
        stem: null,
        score: 2,
        answer: null,
        analysis: null,
        metas: null,
        categoryId: 1,
        difficulty: 'normal',
        targetID: null,
        courseSetId: 105,
        courseId: 105,
        questionId: null
      })
    } else if (check && command == "back") {
      console.log('back');
      this.navigateByUrl(`client/course/${this.courseId}/question`);
    }

  }

  constructor(
    private fb: FormBuilder,
    private _questionCreateService: QuestionCreateService,
    private _nzNotificationService: NzNotificationService,
    private _courseBaseInfoEditService: CourseBaseInfoEditService,
    private _courseManagementUtilService: CourseManagementUtilService,
    private routerInfo: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      type: ['determine', []],
      stem: [null, [Validators.required]],
      score: [2, [Validators.min(0)]],
      answer: [1, [Validators.required]],
      analysis: [null, []],
      metas: [null, []],
      categoryId: [1, []],
      difficulty: ['normal', []],
      targetID: [1, []],
      courseSetId: [location.pathname.split('/')[3], []],
      courseId: [105, []]
    });
    this.routerInfo.params.subscribe(res => {
      this.questionId = res.id;
    })
    if (this.questionId != null) {
      this.btnDisable = true;
      this._questionCreateService.getQuestionInfo(this.questionId).subscribe(res => {
        this.validateForm.patchValue({
          stem: res.data.stem,
          score: res.data.score,
          answer: res.data.answer[0],
          analysis: res.data.analysis,
          categoryId: res.data.categoryId,
          difficulty: res.data.difficulty,
          targetID: res.data.targetID,
          courseSetId: res.data.courseSetId,
          courseId: res.data.courseId
        })
      })
    }
    this.courseId = this._courseManagementUtilService.setCourseIdFrom(location);
    this.getCourseInfo();
  }
  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  getAnswer() {
    let answer = [];
    let tmp = `${this.validateForm.controls.answer.value}`;
    answer.push(tmp);
    this.validateForm.patchValue({
      answer: JSON.stringify(answer)
    })
  }

  getCourseInfo() {
    this._courseBaseInfoEditService.getCourseInfo(this.courseId).subscribe(res => {
      this.categoryId = res.data.baseData.categoryid;
    });
  }
}
