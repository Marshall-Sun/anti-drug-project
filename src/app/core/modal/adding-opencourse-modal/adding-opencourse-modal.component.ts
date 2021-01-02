import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef, NzNotificationService} from 'ng-zorro-antd';
import { OpenresourceManagementService } from 'src/app/service/openresource-management/openresource-management.service';

@Component({
  selector: 'app-adding-opencourse-modal',
  templateUrl: './adding-opencourse-modal.component.html',
  styleUrls: ['./adding-opencourse-modal.component.less']
})
export class AddingOpencourseModalComponent implements OnInit {

  @Input()
  classroomId: string;

  title: string = '';
  courseList = [];
  displayData = [];

  loading: boolean = false;
  total: number = 0;
  totalPage: number;
  pageIndex: number = 1;

  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  selectedValue: { [key: string]: string } = {};

  constructor(
    private _modal: NzModalRef,
    private openresourceManagementService: OpenresourceManagementService,
    private _notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.searchData()
  }

  submit() {
    this._modal.destroy(this.mapOfCheckedId)
  }

  destroy() {
    this._modal.destroy()
  }

  filterCourse() {
    this.pageIndex = 1;
    this.searchData();
  }

  searchData() {
    this.loading = true;
    this.openresourceManagementService.getCourseToRecommend(this.classroomId, 8, this.pageIndex, this.title).then((result: any) => {
      this.loading = false;
      this.courseList = result.data.data;
      this.total = result.data.total;
      this.courseList.forEach(item => {
        this.mapOfCheckedId[item.courseId] = false;
      });
      this.isAllDisplayDataChecked = false;
      this.isIndeterminate = false;
    }).catch(error1 => {
      this.loading = false;
      this._notification.error(
        '发生错误',
        `${error1.error}`
      )
    })
  }

  checkAll(value: boolean): void {
    this.courseList.forEach(item => (this.mapOfCheckedId[item.courseId] = value));
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.courseList
      .every(item => this.mapOfCheckedId[item.courseId]);
    this.isIndeterminate =
      this.courseList.some(item => this.mapOfCheckedId[item.courseId]) &&
      !this.isAllDisplayDataChecked;
  }
}
