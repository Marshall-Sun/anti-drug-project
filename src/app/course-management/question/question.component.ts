import { Component, OnInit } from '@angular/core';
import { NzEmptyService, NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router'
import { CourseManagementUtilService } from 'src/app/service/course-management-util/course-management-util.service';
import { QuestionCreateService } from 'src/app/service/question-create/question-create.service';

enum QUSTIONTYPE {
  single_choice = '单选题',
  choice = '多选题',
  uncertain_choice = '不定项选择题',
  determine = '判断题'
}
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.less']
})
export class QuestionComponent implements OnInit {

  listOfQuestionTypes: any[] = [
    { label: "单选题", value: "single_choice" },
    { label: "多选题", value: "choice" },
    { label: "不定项选择题", value: "uncertain_choice" },
    { label: "判断题", value: "determine" }
  ]

  questiontype = QUSTIONTYPE;


  total: number = 0;

  type: string;
  keyWord: string = '';

  courseId: any;

  questionList: any = [];

  loading: boolean = true;
  pageIndex: any = 1;
  questionIds: Array<number> = [];

  isAllChecked: boolean = false;
  mapOfCheckedId: { [key: string]: boolean } = {}

  checkAll(value: boolean) {
    this.questionList.forEach((item: { id: string | number; }) => (this.mapOfCheckedId[item.id] = value));
  }

  check(questionId: number) {
    if (this.mapOfCheckedId[questionId]) this.questionIds.push(questionId)
    else this.questionIds.forEach((item, i) => { if (item == questionId) this.questionIds.splice(i, 1) })
    console.log(this.questionIds);
  }

  constructor(
    private _courseManagementUtilService: CourseManagementUtilService,
    private _nzNotificationService: NzNotificationService,
    private _questionCreateService: QuestionCreateService,
    private modalService: NzModalService,
    private nzEmptyService: NzEmptyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.nzEmptyService.resetDefault();
    this.courseId = this._courseManagementUtilService.setCourseIdFrom(location);
    this.searchData(1, 10)

  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }


  searchData(pageIndex: number = this.pageIndex, pageSize: number = 10, keyWord: any = this.keyWord, type: string = (this.type == null) ? '' : this.type) {
    this.loading = true;
    this._questionCreateService.getCourseQuestionList(this.courseId, pageIndex, pageSize, keyWord, type).subscribe(res => {
      this.questionList = res.data.data;
      this.total = res.data.total;
      this.loading = false;
    })
  }


  confirmDelete(questionId: number = 1) {
    this.modalService.confirm({
      nzTitle: '真的要删除该题目吗?',
      nzContent: '<b style="color: red;">此题目将不会出现在本课程中</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteQuestion(questionId),
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
      nzOnOk: () => this.deleteQuestionList(),
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }



  deleteQuestion(questionId: number = 1) {
    this._questionCreateService.deleteQuestion(questionId).subscribe(res => {
      this._nzNotificationService.success('删除成功!', '');
      this.searchData();
    }, err => {
      this._nzNotificationService.error('删除失败!', '');
    })
  }

  deleteQuestionList(questionIds: Array<number> = this.questionIds) {
    this._questionCreateService.deleteQuestionList(questionIds).subscribe(res => {
      this._nzNotificationService.success('删除成功!', '');
      this.searchData();
    }, err => {
      this._nzNotificationService.error('删除失败!', '');
    })
  }

}
