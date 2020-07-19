import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {QuestionCreateService} from '../../../service/question-create/question-create.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalRef, NzModalService, NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-select-question',
  templateUrl: './select-question.component.html',
  styleUrls: ['./select-question.component.less']
})
export class SelectQuestionComponent implements OnInit {

  @Input()
  type: string;
  @Input()
  paperId: string;
  @Input()
  questionId: string;
  @Input()
  courseId: string;
  @Input()
  questions = [];
  @Input()
  category: string;

  pageSize: number = 10;
  pageIndex = 1;
  total: number;


  displayData = [];
  loading: boolean = true;

  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  isAllDisplayDataChecked = false;


  questionsType = {
    'single_choice': '单选题',
    'choice': '多选题',
    'uncertain_choice': '不定项选择题',
    'determine': '判断题'
  };

  answerList = [];
  questionList = [];
  detail: any;

  tplModal: NzModalRef;
  tplModalButtonLoading = false;
  characterList = ['A' , 'B' , 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  keyword: string;

  constructor(
    private questionCreate$: QuestionCreateService,
    private routerInfo: ActivatedRoute,
    private _notification: NzNotificationService,
    private modalService: NzModalService,
    private router: Router,
    private modalRef: NzModalRef
  ) { }

  ngOnInit() {
    this.searchData();
  }

  submit() {
    this.displayData.forEach(item => {
      if (this.mapOfCheckedId[item.questionId]) {
        this.questions.push(item)
      }
    });
    this.modalRef.destroy(this.questions)
  }

  cancel() {
    this.modalRef.destroy(this.questions)
  }

  searchData() {
    this.mapOfCheckedId = {};
    this.displayData = [];
    this.loading = true;
    let quesIds = [];
    this.questions.forEach(item => quesIds.push(item.questionId));
    this.questionCreate$.getAddQuestionList(this.courseId, quesIds, this.pageIndex, this.pageSize, this.category).subscribe(result => {
      this.loading = false;
      this.displayData = result.data.data;
      this.total = result.data.total;
      this.displayData.forEach(item => {
        this.mapOfCheckedId[item.questionId] = false;
      });
      this.isAllDisplayDataChecked = false;
      this.isIndeterminate = false;
    }, error1 => {
      this.loading = false;
      this._notification.error('发生错误！', `${error1.error}`)
    })
  }

  search() {
    this.mapOfCheckedId = {};
    this.displayData = [];
    this.loading = true;
    let quesIds = [];
    this.questions.forEach(item => quesIds.push(item.questionId));
    this.questionCreate$.searchQuestion(this.pageIndex, this.pageSize, this.courseId, quesIds, this.keyword, this.category).subscribe(result => {
      this.loading = false;
      this.displayData = result.data.data;
      this.total = result.data.total;
      this.displayData.forEach(item => {
        this.mapOfCheckedId[item.questionId] = false;
      });
      this.isAllDisplayDataChecked = false;
      this.isIndeterminate = false;
    }, error1 => {
      this.loading = false;
      this._notification.error('发生错误！', `${error1.error}`)
    })
  }



  swap(data: any) {
    let temp = [];
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].questionId === this.questionId) {
        temp.push(data)
      } else {
        temp.push(this.questions[i])
      }
    }
    this.questions = temp;
    this.searchData();
  }

  add(data: any) {
    this.questions.push(data);
    this.searchData();
  }



  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}> ,questionId:number): void {
    this.detail = [];
    this.questionCreate$.getQuestionDetail(questionId).subscribe(result => {
        this.detail = result.data;
        this.answerList = this.getJson(this.detail.answer);
        this.questionList = this.getJson(this.detail.metas);
        this.questionList.forEach((item, index) => {
          let option = 'A' + index;
          let strList = item.split('<p>');
          strList[1] = strList[1] + option;
          strList[0] = '<p>';
          item = strList.join('');
          console.log(item)
        })
      },
      error1 => {
        this._notification.create(
          'error',
          '发生错误',
          `${error1.error}`
        )
      })

    this.tplModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });

  }

  destroyTplModal(): void {
    this.tplModal.destroy();
  }

  getAnswer(answer){
    console.log(answer);
    if(answer[0] =="0")
      return "A";
    if(answer[0]=="1")
      return "B";
    if(answer[0]=="2")
      return "C";
    else return "D";
  }


  getJson(jsonStr1) {

    return JSON.parse(jsonStr1);
  }


  navigateTo(url: string) {
    this.router.navigateByUrl(url);
    this.modalRef.destroy()
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(item => (this.mapOfCheckedId[item.questionId] = value));
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.displayData
      .every(item => this.mapOfCheckedId[item.questionId]);
    this.isIndeterminate =
      this.displayData.some(item => this.mapOfCheckedId[item.questionId]) &&
      !this.isAllDisplayDataChecked;
  }
}
