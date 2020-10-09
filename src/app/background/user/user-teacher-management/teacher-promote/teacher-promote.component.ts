import {Component, OnInit} from '@angular/core';
import {TeacherManagementService} from '../../../../service/teacher-management/teacher-management.service';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {UserInfoViewModalComponent} from '../../../../core/modal/user-info-view-modal/user-info-view-modal.component';
import {UserInfoEditModalComponent} from '../../../../core/modal/user-info-edit-modal/user-info-edit-modal.component';
import {TeacherRecommendModalComponent} from '../../../../core/modal/teacher-recommend-modal/teacher-recommend-modal.component';


@Component({
  selector: 'app-teacher-promote',
  templateUrl: './teacher-promote.component.html',
  styleUrls: ['./teacher-promote.component.less']
})
export class TeacherPromoteComponent implements OnInit {

  dateRange: string;
  inputValue: string = '';

  dataList = [];
  displayData = [];
  loading: boolean = false;
  total: number = 0;
  totalPage: number;
  pageIndex: number = 1;


  constructor(private teacherManagementService$: TeacherManagementService,
              private _notification: NzNotificationService,
              private _modalService: NzModalService) {
    this.teacherManagementService$.changeStatus.subscribe(value => {
      this.searchData()
    })
  }

  ngOnInit() {

  }

  search() {
    this.displayData = [];
    this.loading = true;

    this.teacherManagementService$.getUserList(1, 10, this.inputValue, 1).subscribe(result => {
      this.loading = false;
      this.total = result.data[0].totalNum ? result.data[0].totalNum: 0;
      this.totalPage = Math.ceil(this.total / 10);
      this.dataList = result.data;
      this.displayData = this.dataList;
    }, error1 => {
      this.loading=false;
      this._notification.create(
        'error',
        '发生错误！',
        `${error1.error}`)
    })
  }

  searchData(pageIndex: number = this.pageIndex) {
    this.displayData = [];
    this.loading = true;
    this.teacherManagementService$.getUserList(pageIndex, 10, this.inputValue, 1).subscribe(result => {
      this.loading = false;
      this.dataList = result.data;
      this.total = this.dataList[0].totalNum;
      this.totalPage = Math.ceil(this.total / 10);
      this.displayData = this.dataList;
    }, error1 => this._notification.create(
      'error',
      '发生错误！',
      `${error1.error}`));
  }


  setRecommend(id: string) {
    const modal = this._modalService.create({
      nzTitle: '编辑推荐序号',
      nzContent: TeacherRecommendModalComponent,
      nzComponentParams: {
        id: id
      },
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.destroy()
    });
    modal.afterClose.subscribe(result => {
      if (result !== 0) {
        this.teacherManagementService$.changePromotedSeq(id, result).subscribe( result => {
          this._notification.create(
            'success',
            '序号编辑成功！',
            ''
          );
          let i;
          this.teacherManagementService$.changeStatus.subscribe(value => i = value);
          this.teacherManagementService$.changeStatus.next(i + 1);
        }, error1 => {
          this._notification.create(
            'error',
            '发生错误！',
            `${error1.error}`
          )
        } );
      }
    })
  }

  removeRecommend(id: string) {
    this._modalService.confirm({
      nzTitle: '是否取消推荐该教师？',
      nzOnOk: () => this.teacherManagementService$.changePromoted(id).subscribe(result=>{
        this._notification.create(
          'success',
          '取消推荐成功！',
      '');
        let i;
        this.teacherManagementService$.changeStatus.subscribe(value => i = value);
        this.teacherManagementService$.changeStatus.next(i + 1);
      })
    });

  }

}
