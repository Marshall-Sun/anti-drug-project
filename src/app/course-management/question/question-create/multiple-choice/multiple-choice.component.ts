import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, ActivatedRoute } from '@angular/router'
import { QuestionCreateService } from 'src/app/service/question-create/question-create.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { CourseBaseInfoEditService } from 'src/app/service/course-base-info-edit/course-base-info-edit.service';
import { CourseManagementUtilService } from 'src/app/service/course-management-util/course-management-util.service';
@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.less']
})
export class MultipleChoiceComponent implements OnInit {

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

  //答案的数量
  answerCount: number = 0;

  categoryId: any;
  courseId: any;

  answer: Array<any> = [];

  questionId: number;

  btnDisable: boolean = false;


  addField(e?: MouseEvent): void {
    if (this.listOfChoiceControl.length == 10) {
      this.message.create('error', '选项最多10个!');
      return;
    }
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfChoiceControl.length > 0 ? this.listOfChoiceControl[this.listOfChoiceControl.length - 1].id + 1 : 0;

    const control = {
      id,
      title: `选项${String.fromCharCode(id + 65)}`,
      uuid: this._questionCreateService.getId(),
    };
    const index = this.listOfChoiceControl.push(control);
    this.validateForm.addControl(
      this.listOfChoiceControl[index - 1].uuid,
      new FormControl(null, Validators.required)
    );
  }

  patchField(value: string = '') {
    if (this.listOfChoiceControl.length == 10) {
      this.message.create('error', '选项最多10个!');
      return;
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
      new FormControl(value, Validators.required)
    );
  }

  removeField(i: { id: number; title: string; isSelected: boolean; uuid: string }, e: MouseEvent): void {
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
    if (this.answer.length < 2) {
      this.message.create('error', '至少选择两个答案!');
      return;
    }
    if (check || !this.validateForm.controls.error) {
      this.getMetas();
      this.validateForm.patchValue({
        courseId: this.courseId,
        categoryId: this.categoryId,
        answer: JSON.stringify(this.answer)
      });
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
        type: 'choice',
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
    private message: NzMessageService,
    private _questionCreateService: QuestionCreateService,
    private _nzNotificationService: NzNotificationService,
    private _courseBaseInfoEditService: CourseBaseInfoEditService,
    private _courseManagementUtilService: CourseManagementUtilService,
    private routerInfo: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
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
    });
    this.routerInfo.params.subscribe(res => {
      this.questionId = res.id;
    })
    if (this.questionId != null) {
      this.btnDisable = true;
      this._questionCreateService.getQuestionInfo(this.questionId).subscribe(res => {
        let choices: any[] = res.data.choices;
        choices.forEach(item => {
          this.patchField(item);
        })
        this.answer = this.answer.concat(res.data.answer)
        this.validateForm.patchValue({
          stem: res.data.stem,
          score: res.data.score,
          answer: res.data.answer,
          analysis: res.data.analysis,
          categoryId: res.data.categoryId,
          difficulty: res.data.difficulty,
          targetID: res.data.targetID,
          courseSetId: res.data.courseSetId,
          courseId: res.data.courseId
        });
      })
    } else {
      //如果需要创建题目
      this.addField();
      this.addField();
      this.addField();
      this.addField();
    }
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
        let content = tmp;
        choices.push(content);
      }
    })
    this.validateForm.patchValue({
      metas: `{\"choices\":${JSON.stringify(choices)}}`
    })
  }


  getCourseInfo() {
    this._courseBaseInfoEditService.getCourseInfo(this.courseId).subscribe(res => {
      this.categoryId = res.data.baseData.categoryid;
    });
  }

  answerChange(value: number[]) {
    console.log(value);
    this.answer = value;
  }

  check(id: number) {
    for (let i = 0; i < this.answer.length; i++) {
      if (this.answer[i] == id) {
        return true;
      }
    }
    return false;
  }
}