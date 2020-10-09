import {Component, OnInit, TemplateRef} from '@angular/core';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {TeacherRecommendModalComponent} from '../../../../core/modal/teacher-recommend-modal/teacher-recommend-modal.component';
import {ClassManagementService} from '../../../../service/class-management/class-management.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-class-recommendation-table',
  templateUrl: './admin-class-recommendation-table.component.html',
  styleUrls: ['./admin-class-recommendation-table.component.less']
})
export class AdminClassRecommendationTableComponent implements OnInit {
  dataList = [];
  displayData = [];
  loading = false;
  total: number = 0;
  totalPage: number;
  pageIndex: number = 1;



  constructor(
    private classManagementService$: ClassManagementService ,
    private _notification: NzNotificationService,
    private _modalService: NzModalService
  ) {
    this.classManagementService$.changeStatus.subscribe(value => {
      this.searchData()
    })
  }

  ngOnInit(){

  }
  searchData(pageIndex: number = this.pageIndex) {
    this.displayData = [];
    this.loading = true;
    this.classManagementService$.getRecommendationList(pageIndex, 10).subscribe(result => {
      this.loading = false;

      this.total = result.data[0].totalNum? result.data[0].totalNum: 0;
      this.totalPage = Math.ceil(this.total / 10);
      this.dataList = result.data;

      this.displayData = this.dataList;
    }, error1 => {
      this.loading = false;
      this._notification.create(
        'error',
        '发生错误！',
        `${error1.error}`)
    });
  }
// 取消推荐
  esc(id: string) {
    this._modalService.confirm({
      nzTitle: '是否取消推荐该班级？',
      nzOnOk: () => {
        this.classManagementService$.cancelRecommendation(id).subscribe(result => {
          this._notification.create(
            'success',
            '取消推荐成功！',
            ''
          );
          let i;
          this.classManagementService$.changeStatus.subscribe(value => i = value);
          this.classManagementService$.changeStatus.next(i + 1);
          // this.searchData();
        }, error1 => {
          this._notification.create(
            'error',
            '发生错误！',
            `${error1.error}`
          )
        })
      }
    })
  }
// 设置序号
  edit(id: string) {
    const modal = this._modalService.create({
      nzTitle: '设置班级推荐序号',
      nzContent: TeacherRecommendModalComponent,
      nzComponentParams: {
        id: id
      },
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.destroy()
    });
    modal.afterClose.subscribe(result => {
      if (result) {
        this.classManagementService$.setRecommendation(id, result).subscribe(result => {
          this._notification.create(
            'success',
            '设置推荐序号成功！',
            ''
          );
          let i;
          this.classManagementService$.changeStatus.subscribe(value => i = value);
          this.classManagementService$.changeStatus.next(i + 1);
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


}
