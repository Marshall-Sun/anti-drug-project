import { Component, OnInit,ElementRef,ViewChild,AfterViewInit,Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { PaperMarkingService } from "src/app/service/paperMarking/paper-marking.service";
import {NzMessageService, NzModalService, NzNotificationService, UploadFile} from 'ng-zorro-antd';
import { th } from 'date-fns/locale';
import { ClientCourseVideoService } from 'src/app/service/client-course-video/client-course-video.service';

@Component({
  selector: 'app-preview-testpaper',
  templateUrl: './preview-testpaper.component.html',
  styleUrls: ['./preview-testpaper.component.less'],
  providers: [ClientCourseVideoService]
})
export class PreviewTestpaperComponent implements OnInit {

  testId: string = '75';
  homeworkContent = [];

  courseId: string = '128';
  taskId: string = '467';
  userId: string = '1';

  allUrl: string = '';


  testPaperContent = {
    question: [],
    limitedTime: 0,
    name: '',
    description: ''
  };
  testQuestion = [];
  //题目内容
  singleChoices = [];  //单选
  multChoices = [];  //多选
  uncertainChoices = [];  //不定项
  determineChoices = [];  //判断
  //每种题型的总分
  singleTotalScore: number = 0;
  multTotalScore: number = 0;
  uncertaionTotalScore: number = 0;
  determineTotalScore: number = 0;


  //答案
  singleAnswer: any[] = [];
  determineAnswer: any[] = [];
  multAnswer: any[] = [];
  uncertainAnswer: any[] = [];
  testMUltAnswer: any[] = [{answers: [], questionId: 0}];
  testUncerAnswer: any[] = [{answers: [], questionId: 0}];

  //是否已交卷
  isAlreadySubmit: boolean = false;


  totalAnswer: any[] = [];


  constructor(private router: Router, private paperMarkingService: PaperMarkingService, private courseVideoService: ClientCourseVideoService,
              private _notification: NzNotificationService, private elementRef: ElementRef, private renderer: Renderer) {
  }

  ngOnInit() {

    this.allUrl = location.pathname;
    console.log("url:", this.allUrl);
    if ((this.allUrl.indexOf("testId")) > -1) {
      this.testId = location.pathname.split('/')[3];
      console.log("通过testid得到:", this.testId);
      this.paperMarkingService.previewTestPaper(this.testId).subscribe(result => {
        this.testPaperContent = result.data;
        console.log("试卷：", this.testPaperContent);
        this.dealWithData();
      });
    } else {
      this.courseId = location.pathname.split('/')[3];
      this.taskId = location.pathname.split('/')[5];
      this.userId = window.localStorage.getItem("id");
      console.log("通过taskId得到:", this.courseId, this.taskId, this.userId);
      //获取考试的试卷内容
      this.paperMarkingService.getTestPaperContent(this.courseId, this.taskId, this.userId).subscribe(result => {
        this.testPaperContent = result.data;
        console.log('试卷：', this.testPaperContent);
        //this.testQuestion=this.testPaperContent.question;
        this.dealWithData();
      });
    }

  }

  dealWithData() {
    for (let question of this.testPaperContent.question) {
      if (question.type == "single_choice") {
        this.singleChoices = this.singleChoices.concat(question);
        this.singleTotalScore = this.singleTotalScore + question.score;
      } else if (question.type == "choice") {
        this.multChoices = this.multChoices.concat(question);
        this.multTotalScore = this.multTotalScore + question.score;
      } else if (question.type == "uncertain_choice") {
        this.uncertainChoices = this.uncertainChoices.concat(question);
        this.uncertaionTotalScore = this.uncertaionTotalScore + question.score;
      } else if (question.type == "determine") {
        this.determineChoices = this.determineChoices.concat(question);
        this.determineTotalScore = this.determineTotalScore + question.score;
      } else {
        console.log("未知题型");
      }
    }
    this.singleChoices.forEach(item => {
      this.singleAnswer.push({answers: [], questionId: item.id});
      this.totalAnswer.push({answers: [], questionId: item.id});
    });
    this.multChoices.forEach((item, index) => {
      this.multAnswer.push({answers: [], questionId: item.id});
      this.totalAnswer.push({answers: [], questionId: item.id});
      this.testMUltAnswer.push({answers: [], questionId: item.id});
      item.choices.forEach(chois => {
        this.testMUltAnswer[index + 1].answers.push(false);
      })
    });
    this.uncertainChoices.forEach((item, index) => {
      this.uncertainAnswer.push({answers: [], questionId: item.id});
      this.totalAnswer.push({answers: [], questionId: item.id});
      this.testUncerAnswer.push({answers: [], questionId: item.id});
      item.choices.forEach(chois => {
        this.testUncerAnswer[index + 1].answers.push(false);
      })
    })
    this.determineChoices.forEach(item => {
      this.determineAnswer.push({answers: [], questionId: item.id});
      this.totalAnswer.push({answers: [], questionId: item.id});
    });
    this.testMUltAnswer.reverse();
    this.testMUltAnswer.pop();
    this.testMUltAnswer.reverse();
    this.testUncerAnswer.reverse();
    this.testUncerAnswer.pop();
    this.testUncerAnswer.reverse();
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  isEmpty(v): boolean {
    return (
      (Array.isArray(v) && v.length == 0) || (Object.prototype.isPrototypeOf(v) && Object.keys(v).length == 0)
    );
  }

  changeNumberToLetter(num: number): string {
    if (num == 0) {
      return "A";
    } else if (num == 1) {
      return "B";
    } else if (num == 2) {
      return "C";
    } else {
      return "D";
    }
  }

  ChangeStyle(i) {
    console.log('按下', i);
    console.log('单选长度', this.multChoices.length);
    document.getElementById(i).style.color = "white";
    document.getElementById(i).style.backgroundColor = "green";
  }

  goBack() {
    if (location.pathname.endsWith('preview_testpaper')) {
      history.go(-2)
    } else {
      history.go(-1)
    }
  }
}
