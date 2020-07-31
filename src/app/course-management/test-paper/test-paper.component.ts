import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router'
import {NzEmptyService, NzNotificationService} from 'ng-zorro-antd';
import { CourseManagementUtilService } from 'src/app/service/course-management-util/course-management-util.service';
import {QuestionCreateService} from '../../service/question-create/question-create.service';

@Component({
  selector: 'app-test-paper',
  templateUrl: './test-paper.component.html',
  styleUrls: ['./test-paper.component.less']
})
export class TestPaperComponent implements OnInit {

  @ViewChild('customTpl', { static: true }) customTpl: TemplateRef<any>;

  pageSize: number = 10;
  pageIndex = 1;
  total: number;
  displayData = [];
  loading: boolean = true;

  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  isAllDisplayDataChecked = false;

  paperStatus = {
    open: '已发布',
    closed: '已关闭',
    draft: '草稿'
  };

  courseId: any;
  constructor(
    private router: Router,
    private nzEmptyService: NzEmptyService,
    private _courseManagementUtilService: CourseManagementUtilService,
    private questionCreate$: QuestionCreateService,
    private _notification: NzNotificationService
  ) {
    this.nzEmptyService.setDefaultContent(this.customTpl);
  }

  ngOnInit() {
    this.nzEmptyService.setDefaultContent(this.customTpl);
    this.courseId = this._courseManagementUtilService.setCourseIdFrom(location);
    this.searchData();
  }

  check() {
    this.nzEmptyService.setDefaultContent(this.customTpl);
  }

  navigateByUrl(url) {
    console.log(url);
    
    // this.router.navigateByUrl(url);
  }

  searchData() {
    this.displayData = [];
    this.loading = true;
    this.questionCreate$.getExamListByCourseId(this.courseId, this.pageIndex, this.pageSize).subscribe(result => {
      this.loading = false;
      this.total = result.data.total;
      this.displayData = result.data.data;
      this.displayData.forEach(item => {
        this.mapOfCheckedId[item.id] = false;
      });
      this.isAllDisplayDataChecked = false;
      this.isIndeterminate = false;
    }, error1 => {
      this.loading = false;
      this._notification.error('发生错误！', `${error1.error}`)
    })
  }



  checkAll(value: boolean): void {
    this.displayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.displayData
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.displayData.some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
  }

  publish(id: string) {
    this.questionCreate$.openTestPaper(id).subscribe(result => {
      this.searchData();
      this._notification.success('发布成功！', '')
    }, error1 => {
      this._notification.error('发布失败！', `${error1.error}`)
    })
  }

  delete(id: string) {
    this.questionCreate$.deleteTestPaper(id).subscribe(result => {
      this.searchData();
      this._notification.success('删除成功！', '')
    }, error1 => {
      this._notification.error('删除失败！', `${error1.error}`)
    })
  }

  close(id: string) {
    this.questionCreate$.closeTestPaper(id).subscribe(result => {
      this.searchData();
      this._notification.success('关闭成功！', '')
    }, error1 => {
      this._notification.error('关闭失败！', `${error1.error}`)
    })
  }

  deleteList() {
    let idList = [];
    for (let mapOfCheckedIdKey in this.mapOfCheckedId) {
      if (this.mapOfCheckedId[mapOfCheckedIdKey]) {
        idList.push(mapOfCheckedIdKey)
      }
    }
    this.questionCreate$.deleteTestPaperList(idList).subscribe(result => {
      this.searchData();
      this._notification.success('删除成功！', '')
    }, error1 => {
      this._notification.error('删除失败！', `${error1.error}`)
    })
  }

}
