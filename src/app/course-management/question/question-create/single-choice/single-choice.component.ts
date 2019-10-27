import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router'
import { QuestionCreateService } from 'src/app/service/question-create/question-create.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { CourseBaseInfoEditService } from 'src/app/service/course-base-info-edit/course-base-info-edit.service';
import { CourseManagementUtilService } from 'src/app/service/course-management-util/course-management-util.service';

@Component({
  selector: 'app-single-choice',
  templateUrl: './single-choice.component.html',
  styleUrls: ['./single-choice.component.less']
})
export class SingleChoiceComponent implements OnInit {

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
  listOfChoiceControl: Array<{ id: number; title: string; uuid: string }> = [];

  courseId: any = 105;
  categoryId: any;


  addField(e?: MouseEvent): void {
    if (this.listOfChoiceControl.length == 10) {
      this.message.create('error', '选项最多10个!');
      return;
    }
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfChoiceControl.length > 0 ? this.listOfChoiceControl[this.listOfChoiceControl.length - 1].id + 1 : 0;
    const control =
    {
      id,
      title: `选项${String.fromCharCode(id + 65)}`,
      uuid: this._questionCreateService.getId()
    };
    const index = this.listOfChoiceControl.push(control);
    this.validateForm.addControl(
      this.listOfChoiceControl[index - 1].uuid,
      new FormControl(null, Validators.required)
    );
  }

  removeField(i: { id: number; title: string; uuid: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfChoiceControl.length == 2) {
      this.message.create('error', '选项最少2个!');
      return;
    }
    if (this.listOfChoiceControl.length > 2) {
      const index = this.listOfChoiceControl.indexOf(i);
      this.listOfChoiceControl.splice(index, 1);
      this.validateForm.removeControl(i.uuid);
      this.listOfChoiceControl.forEach((item, i) => {
        this.listOfChoiceControl[i].id = i;
        this.listOfChoiceControl[i].title = `选项${String.fromCharCode(i + 65)}`;
      })
    }
  }


  submitForm(command: string = 'back'): void {
    let check: boolean = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      if (this.validateForm.controls[i].hasError('required')) {
        check = false;
      }
    }
    if (this.validateForm.controls.answer.errors)
      this.message.create('error', '至少选择一个答案');
    if (check || this.validateForm.controls.error) {
      this.getMetas();
      this.validateForm.patchValue({
        courseId: this.courseId,
        categoryId: this.categoryId
      })
      this._questionCreateService.createQuestion(this.validateForm.value).subscribe(result => {
        this._nzNotificationService.create('success', '添加成功!', ``);
      }, err => {
        this._nzNotificationService.create('error', '添加失败!', ``);
      });
    }

    if (check || command == "continue") {
      this.validateForm.reset({
        type: ['choice', []],
        stem: [null, [Validators.required]],
        score: [2, [Validators.min(0)]],
        answer: [null, [Validators.required]],
        analysis: [null, []],
        metas: [null, []],
        categoryId: [1, []],
        difficulty: ['normal', []],
        targetID: [null, []],
        courseSetId: [105, []],
        courseId: [105, []]
      })
    } else if (check)
      this.navigateByUrl(`client/course/${this.courseId}/question`);
  }

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private _questionCreateService: QuestionCreateService,
    private _nzNotificationService: NzNotificationService,
    private _courseBaseInfoEditService: CourseBaseInfoEditService,
    private _courseManagementUtilService: CourseManagementUtilService,
    private router: Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      type: ['single_choice', []],
      stem: [null, [Validators.required]],
      score: [2, [Validators.min(0)]],
      answer: [null, [Validators.required]],
      analysis: [null, []],
      metas: [null, []],
      categoryId: [1, []],
      difficulty: ['normal', []],
      targetID: [null, []],
      courseSetId: [105, []],
      courseId: [105, []]
    });
    this.addField();
    this.addField();
    this.addField();
    this.addField();
    this.courseId = this._courseManagementUtilService.setCourseIdFrom(location);
    this.getCourseInfo();
  }
  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  getMetas() {
    let choices = [];
    this.listOfChoiceControl.forEach((item) => {
      let tmp = this.validateForm.get(item.uuid).value;
      if (tmp != null || tmp != '') {
        let content = this._questionCreateService.getMeta(tmp);
        choices.push(content);
      }
    })
    this.validateForm.patchValue({
      metas: `{choice:${JSON.stringify(choices)}}`
    })
  }

  getCourseInfo() {
    this._courseBaseInfoEditService.getCourseInfo(this.courseId).subscribe(res => {
      this.categoryId = res.data.baseData.categoryid;
    });
  }


}
