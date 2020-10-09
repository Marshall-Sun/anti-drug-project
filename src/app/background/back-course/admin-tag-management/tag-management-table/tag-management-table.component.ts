import { Component, OnInit } from '@angular/core';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {TagInfoEditComponent} from '../../../../core/modal/tag-info-edit-modal/tag-info-edit.component';
import {TagManagementService} from '../../../../service/tag-management/tag-management.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CreateTagModalComponent} from '../../../../core/modal/create-tag-modal/create-tag-modal.component';

@Component({
  selector: 'app-tag-management-table',
  templateUrl: './tag-management-table.component.html',
  styleUrls: ['./tag-management-table.component.less']
})
export class TagManagementTableComponent implements OnInit {


  dataList = [];
  displayData = [];
  loading: boolean = false;



  constructor(
    private tagManagementService$: TagManagementService,
    private _notification: NzNotificationService,
    private _modalService: NzModalService,
  ) {
  }

  ngOnInit() {
    this.searchData()
  }



  searchData() {
    this.displayData = [];
    this.loading = true;
    this.tagManagementService$.getTagList().subscribe(result => {
      this.loading = false;
      this.dataList = result.data;
      this.displayData = this.dataList;
      console.log(this.displayData)
    }, error1 => {
      this.loading = false;
      this._notification.error(
        '发生错误！',
        `${error1.error}`)
    })
  }

  //新建标签
  openCreateTagModal() {
    const modal = this._modalService.create({
      nzTitle: '新建标签',
      nzContent: CreateTagModalComponent,
      nzOkText: '提交',
      nzCancelText: '取消',
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.cancel()
    });
    modal.afterClose.subscribe(result => {
      if (result) {
        this.tagManagementService$.createNewTag(result).subscribe(result => {
          this.searchData();
          this._notification.success(
            '创建成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '发生错误！',
            `${error1.error}`
          )
        })
      }
    })
  }

  edit(item: any) {
    const modal = this._modalService.create({
      nzTitle: '编辑标签信息',
      nzContent: TagInfoEditComponent,
      nzComponentParams: {
        item: item
      },
      nzOkText: '提交',
      nzCancelText: '取消',
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.destroy()
    });
    modal.afterClose.subscribe(result => {
      if (result) {
        this.tagManagementService$.updateTagDetail(result.id, result.name).subscribe(result => {
          this.searchData();
          this._notification.success(
            '修改成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '发生错误！',
            `${error1.error}`
          )
        })
      }
    })
  }

  delete(id: string) {
    this._modalService.confirm({
      nzTitle: '是否删除该条标签？',
      nzOnOk: () => {
        this.tagManagementService$.deleteTag(id).subscribe(result => {
          this.searchData();
          this._notification.success(
            '删除成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '发生错误！',
            `${error1.error}`
          )
        })
      }
    })
  }

}
