import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { max } from 'rxjs/operators';
import { QuestionCreateService } from 'src/app/service/question-create/question-create.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-test-paper-create',
  templateUrl: './test-paper-create.component.html',
  styleUrls: ['./test-paper-create.component.less']
})
export class TestPaperCreateComponent implements OnInit {
  validateForm: FormGroup;//表单校验

  userId = 1;

  desc: string = '';
  scope: string = '按课程';//出题范围
  way: string = 'rand';//生成方式
  selectVisible: boolean = false;
  sliderVisible: boolean = false;
  difficulty: any[] = [20, 50];
  minValue: number = 0;
  maxValue: number = 0;

  questions: any[] = [{name:"单选题",type:"single_choice"}, 
                      {name:"多选题",type:"choice"},
                      {name:"不定项选择题",type:"uncertain_choice"},
                      {name:"判断题",type:"determine"},];//, "问答题", "填空题", "材料题"];
  questionNum:any = {
    single_choice:0,
    choice:0,
    uncertain_choice:0,
    determine:0
  };
  questionsInfo: any[] = [
    {name: 'single_choice', count: 0, score: 0},
    {name: 'choice', count: 0, score: 0, part_score: 0},
    {name: 'uncertain_choice', count: 0, score: 0, part_score: 0},
    {name: 'determine', count: 0, score: 0},
  ];
  courseId:any;

  paperInfo: any = {
    choiceCount: 0,
    choiceMissScore: 0,
    choiceScore: 0,
    courseSetId: 0,
    createUserId: 0,
    description: "",
    determineCount: 0,
    determineScore: 0,
    difficultyPercentage: 0,
    itemCount: 0,
    mode: "",
    normalPercentage: 0,
    simplePercentage: 0,
    singleChoiceCount: 0,
    singleChoiceScore: 0,
    testPaperName: "",
    uncertainChoiceCount: 0,
    uncertainChoiceMissScore: 0,
    uncertainChoiceScore: 0
  }

  constructor(private router: Router, private fb: FormBuilder,
    private _questionCreateService: QuestionCreateService,
    private notification: NzNotificationService,
    ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      paperName: [null, [Validators.required]],
      desc: [''],
      score: [0],
      multi_missing: [0],
      indifinite_missing: [0],
      minQuestion: [0]
    });

    this.courseId = location.pathname.split('/')[3];
    this.getQuestionsNum();
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  courseChange(value: string) {
    this.selectVisible = this.scope == '默认教学计划';
  }

  onChange(value: number) {
    // if (value[1] - value[0] == 30) {
    //   this.maxValue = value[1];
    //   this.minValue = value[0];
    // } else if (value[1] - value[0] < 30) {
    //   this.difficulty[0] = this.minValue;
    //   this.difficulty[1] = this.maxValue;
    // }
  }

  wayChange(value: string) {
    if (this.way == 'rand') {
      this.sliderVisible = true;
      this.way = 'difficulty';
    } else {
      this.sliderVisible = false;
      this.way = 'rand';
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    let error_no = true;
    let error_score = false;
    for (let questionsInfoKey in this.questionsInfo) {
      if (this.questionsInfo[questionsInfoKey].count > 0) {
        error_no = false;
        break;
      }
    }
    this.questionsInfo.forEach(item => {
      if (item.count > 0 && item.score == 0) {
        error_score = true
      }
      if (item.count == 0 && item.score > 0) {
        error_no = true
      }
    });
    if (error_no) {
      this.notification.error('请正确填写题目数量！', '')
    } else if (error_score) {
      this.notification.error('请填写题目分值', '')
    } else if (!(this.validateForm.status == 'VALID')) {
      this.notification.error('试卷名称不能为空！', '')
    } else {
      this.paperInfo.choiceCount = this.questionsInfo[1].count;
      this.paperInfo.choiceMissScore = this.questionsInfo[1].part_score;
      this.paperInfo.choiceScore = this.questionsInfo[1].score;
      this.paperInfo.courseSetId = this.courseId;
      this.paperInfo.createUserId = this.userId;
      this.paperInfo.description = this.desc;
      this.paperInfo.determineCount = this.questionsInfo[3].count;
      this.paperInfo.determineScore = this.questionsInfo[3].score;
      if (this.way == 'rand') {
        this.paperInfo.mode = 'rand';
        this.paperInfo.difficultyPercentage = 0;
        this.paperInfo.normalPercentage = 0;
        this.paperInfo.simplePercentage = 0
      } else {
        this.paperInfo.mode = 'difficulty';
        this.paperInfo.difficultyPercentage = 100 - this.difficulty[1];
        this.paperInfo.normalPercentage = this.difficulty[1] - this.difficulty[0];
        this.paperInfo.simplePercentage = this.difficulty[0]
      }
      this.questionsInfo.forEach(item => {
        this.paperInfo.itemCount += item.count;
      });
      this.paperInfo.singleChoiceCount = this.questionsInfo[0].count;
      this.paperInfo.singleChoiceScore = this.questionsInfo[0].score;
      this.paperInfo.testPaperName = this.validateForm.get('paperName').value;
      this.paperInfo.uncertainChoiceCount = this.questionsInfo[2].count;
      this.paperInfo.uncertainChoiceMissScore = this.questionsInfo[2].part_score;
      this.paperInfo.uncertainChoiceScore = this.questionsInfo[2].score;
      this._questionCreateService.createPaper(this.paperInfo).subscribe(result => {
        if (result.code == '200') {
          let newPaperId = result.data;
          this.router.navigateByUrl(`client/course/${this.courseId}/testpaperedit/${newPaperId}`)
        }
      })

    }
  }


  getQuestionsNum(){
    this._questionCreateService.getQuestionNum(this.courseId).subscribe((res: any) => {
      for(var i=0;i<res.data.length;i++){
        this.questionNum[res.data[i].type] = res.data[i].cnt;
      }
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    })
  }

}
