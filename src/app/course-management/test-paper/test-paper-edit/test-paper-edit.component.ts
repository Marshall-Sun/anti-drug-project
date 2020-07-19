import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseManagementUtilService} from '../../../service/course-management-util/course-management-util.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionCreateService} from '../../../service/question-create/question-create.service';
import {NzModalRef, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {SelectQuestionComponent} from '../../../core/modal/select-question/select-question.component';

@Component({
  selector: 'app-test-paper-edit',
  templateUrl: './test-paper-edit.component.html',
  styleUrls: ['./test-paper-edit.component.less']
})
export class TestPaperEditComponent implements OnInit {

  validateForm: FormGroup;

  userId = 1;
  passedCondition: number = 0;

  // pageSize: number = 10;
  // pageIndex = 1;
  // total: number;
  displayData = [];
  loading: boolean = true;

  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  isAllDisplayDataChecked = false;

  courseId: string;
  paperId: string;

  questionsType = {
    'single_choice': '单选题',
    'choice': '多选题',
    'uncertain_choice': '不定项选择题',
    'determine': '判断题'
  };

  difficultLevel = {
    'simple': '简单',
    'normal': '一般',
    'difficulty': '困难'
  };

  scoreList: { [key: string]: number } = {};

  answerList = [];
  questionList = [];
  detail: any;

  tplModal: NzModalRef;
  tplModalButtonLoading = false;
  characterList = ['A' , 'B' , 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  type: string = 'single_choice';
  listOfOption = [
    {value: 'single_choice', label: '单选题'},
    {value: 'choice', label: '多选题'},
    {value: 'uncertain_choice', label: '不定项选择题'},
    {value: 'determine', label: '判断题'},
  ];
  singleChoiceList = [];
  choiceList = [];
  uncertainChoiceList = [];
  determineList = [];

  constructor(
    private router: Router,
    private _courseManagementUtilService: CourseManagementUtilService,
    private fb: FormBuilder,
    private questionCreate$: QuestionCreateService,
    private routerInfo: ActivatedRoute,
    private _notification: NzNotificationService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.courseId = this._courseManagementUtilService.setCourseIdFrom(location);
    this.paperId = this.routerInfo.snapshot.params['testPaperId'];
    this.validateForm = this.fb.group({
      paperName: [null, [Validators.required]],
      desc: [''],
      score: [0],
      multi_missing: [0],
      indifinite_missing: [0],
      minQuestion: [0]
    });
    this.getPaperInfo();
    this.searchData();
  }

  getPaperInfo() {
    this.questionCreate$.showPaperInfoEdit(this.paperId).subscribe(result => {
      this.validateForm.get('paperName').setValue(result.data[0].name);
      this.validateForm.get('desc').setValue(result.data[0].description)
    }, error1 => {
      this._notification.error('获取试卷信息错误！', `${error1.error}`)
    })
  }

  searchData() {
    this.displayData = [];
    this.singleChoiceList = [];
    this.choiceList = [];
    this.uncertainChoiceList = [];
    this.determineList = [];
    this.scoreList = {};
    this.loading = true;
    this.questionCreate$.viewPaperQuestionEdit(this.paperId).subscribe(result => {
      this.loading = false;
      result.data.data.forEach((item, index) => {
        item.seq = index + 1;
        if (item.questionType == 'single_choice') {
          this.singleChoiceList.push(item)
        } else if (item.questionType == 'choice') {
          this.choiceList.push(item)
        } else if (item.questionType == 'uncertain_choice') {
          this.uncertainChoiceList.push(item)
        } else {
          this.determineList.push(item)
        }
        this.scoreList[item.questionId] = item.score;
      });
      this.changeDisplayData();
      this.passedCondition = result.data.passedCondition;
    }, error1 => {
      this.loading = false;
      this._notification.error('发生错误！', `${error1.error}`)
    })
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url)
  }

  submitForm() {
    let itemCount = this.singleChoiceList.length + this.choiceList.length + this.uncertainChoiceList.length + this.determineList.length;
    let score = 0;
    let testPaperItemList = [];
    this.singleChoiceList.forEach(item => {
      testPaperItemList.push({questionid: item.questionId, questiontype: 'single_choice', score: this.scoreList[item.questionId], seq: item.seq, testid: this.paperId})
    });
    this.choiceList.forEach(item => {
      testPaperItemList.push({questionid: item.questionId, questiontype: 'choice', score: this.scoreList[item.questionId], seq: item.seq, testid: this.paperId})
    });
    this.uncertainChoiceList.forEach(item => {
      testPaperItemList.push({questionid: item.questionId, questiontype: 'uncertain_choice', score: this.scoreList[item.questionId], seq: item.seq, testid: this.paperId})
    });
    this.determineList.forEach(item => {
      testPaperItemList.push({questionid: item.questionId, questiontype: 'determine', score: this.scoreList[item.questionId], seq: item.seq, testid: this.paperId})
    });
    testPaperItemList.forEach(item => {
      score += item.score
    });
    this.questionCreate$.storePaper(itemCount, this.passedCondition, score, this.paperId, testPaperItemList, this.userId).subscribe(result => {
      this.router.navigateByUrl(`/client/course/${this.courseId}/testpaper`);
      this._notification.success('成功保存试卷！', '')
    }, error1 => this._notification.error('保存失败！', `${error1.error}`))

  }

  modifyPaperInfo() {

    this.questionCreate$.editPaperInfo(this.paperId, this.validateForm.get('paperName').value, this.validateForm.get('desc').value).subscribe(result => {
      this._notification.success('成功修改试卷信息！', '');
      this.getPaperInfo()
    }, error1 => {
      this._notification.error('发生错误！', `${error1.error}`)
    })

  }

  sortSeq() {
    let temp = [];
    this.singleChoiceList.forEach(item => temp.push(item));
    this.choiceList.forEach(item => temp.push(item));
    this.uncertainChoiceList.forEach(item => temp.push(item));
    this.determineList.forEach(item => temp.push(item));
    this.singleChoiceList = [];
    this.choiceList = [];
    this.uncertainChoiceList = [];
    this.determineList = [];
    temp.forEach((item, index) => {
      item.seq = index + 1;
      if (item.questionType == 'single_choice') {
        this.singleChoiceList.push(item)
      } else if (item.questionType == 'choice') {
        this.choiceList.push(item)
      } else if (item.questionType == 'uncertain_choice') {
        this.uncertainChoiceList.push(item)
      } else {
        this.determineList.push(item)
      }
    })
  }

  delete(id: string) {
    this.displayData = this.displayData.filter(item => item.questionId !== id);
    delete this.scoreList[id];
    if (this.type == 'single_choice') {
      this.singleChoiceList = this.displayData;
    } else if (this.type == 'choice') {
      this.choiceList = this.displayData;
    } else if (this.type == 'uncertain_choice') {
      this.uncertainChoiceList = this.displayData
    } else {
      this.determineList = this.displayData;
    }
    this.sortSeq();
    this.changeDisplayData()
  }

  deleteList() {
    this.displayData.forEach(item => {
      if (this.mapOfCheckedId[item.questionId]) {
        delete this.scoreList[item.questionId]
      }
    });
    this.displayData = this.displayData.filter(item => !this.mapOfCheckedId[item.questionId]);
    if (this.type == 'single_choice') {
      this.singleChoiceList = this.displayData;
    } else if (this.type == 'choice') {
      this.choiceList = this.displayData;
    } else if (this.type == 'uncertain_choice') {
      this.uncertainChoiceList = this.displayData
    } else {
      this.determineList = this.displayData;
    }
    this.sortSeq();
    this.changeDisplayData()
  }

  openSelectModal(id: string) {
    const modal = this.modalService.create({
      nzTitle: '选择题目',
      nzContent: SelectQuestionComponent,
      nzComponentParams: {
        type: 'swap',
        paperId: this.paperId,
        questionId: id,
        courseId: this.courseId,
        questions: this.displayData,
        category: this.type
      },
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.cancel()
    });
    modal.afterClose.subscribe(result => {
      this.displayData = [];
      this.displayData.push(...result);
      this.displayData.forEach((item, index) => {
        this.scoreList[item.questionId] = item.score;
      });
      this.isAllDisplayDataChecked = false;
      this.isIndeterminate = false;
      if (this.type == 'single_choice') {
        this.singleChoiceList = this.displayData;
      } else if (this.type == 'choice') {
        this.choiceList = this.displayData;
      } else if (this.type == 'uncertain_choice') {
        this.uncertainChoiceList = this.displayData
      } else {
        this.determineList = this.displayData;
      }
      this.sortSeq();
      this.changeDisplayData();
    })
  }

  openAddModal() {
    const modal = this.modalService.create({
      nzTitle: '选择题目',
      nzContent: SelectQuestionComponent,
      nzComponentParams: {
        type: 'add',
        paperId: this.paperId,
        courseId: this.courseId,
        questions: this.displayData,
        category: this.type
      },
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.cancel()
    });
    modal.afterClose.subscribe(result => {
      this.displayData = [];
      this.displayData.push(...result);
      console.log(this.displayData);
      this.displayData.forEach((item, index) => {
        if (!this.scoreList[item.questionId]) {
          this.scoreList[item.questionId] = item.score;
        }
      });
      if (this.type == 'single_choice') {
        this.singleChoiceList = result;
      } else if (this.type == 'choice') {
        this.choiceList = result;
      } else if (this.type == 'uncertain_choice') {
        this.uncertainChoiceList = result
      } else {
        this.determineList = result;
      }
      this.sortSeq();
      this.changeDisplayData()
      console.log(this.displayData)
    })
  }

  // 预览
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
    });

  }

  destroyTplModal(): void {
    this.tplModal.destroy();
  }

  getAnswer(answer){
    if(answer =="0")
      return "A";
    if(answer=="1")
      return "B";
    if(answer=="2")
      return "C";
    else return "D";
  }


  getJson(jsonStr1) {

    return JSON.parse(jsonStr1);
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

  changeDisplayData() {
    this.mapOfCheckedId = {};
    this.displayData = [];
    if (this.type == 'single_choice') {
      this.displayData = this.singleChoiceList
    } else if (this.type == 'choice') {
      this.displayData = this.choiceList
    } else if (this.type == 'uncertain_choice') {
      this.displayData = this.uncertainChoiceList
    } else {
      this.displayData = this.determineList
    }
    this.displayData.forEach(item => {
      this.mapOfCheckedId[item.questionId] = false;
    });
    this.isAllDisplayDataChecked = false;
    this.isIndeterminate = false;
  }

}
