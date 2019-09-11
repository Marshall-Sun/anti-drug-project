import { Component, OnInit } from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
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
  total: number = 0;
  totalPage: number;
  pageIndex: number = 1;



  constructor(
    private TagManagementService$: TagManagementService,
    private _message: NzMessageService,
    private _modalService: NzModalService,
  ) {
  }

  ngOnInit() {
    this.searchData()
  }



  searchData(pageIndex: number = this.pageIndex) {
    this.displayData = [];
    this.loading = true;
    this.TagManagementService$.getTagList(pageIndex, 10).subscribe(result => {
      this.loading = false;
      this.total = result[0].totalUser;
      this.totalPage = Math.ceil(this.total / 10);
      this.dataList = result;
      this.displayData = this.dataList;
    }, error1 => {
      this.loading = false;
      this._message.error(error1.error)
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
    })
  }

  edit(id: string) {
    const modal = this._modalService.create({
      nzTitle: '编辑标签信息',
      nzContent: TagInfoEditComponent,
      nzComponentParams: {
        id: id
      },
      nzOkText: '提交',
      nzCancelText: '取消',
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.destroy()
    })
  }

  delete(id: string) {
    this._modalService.confirm({
      nzTitle: '是否删除该条标签？',
      nzOnOk: () => console.log('111')
    })
  }

}