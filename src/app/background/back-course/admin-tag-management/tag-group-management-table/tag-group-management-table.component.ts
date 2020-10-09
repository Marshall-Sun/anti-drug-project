import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {TagGroupManagementService} from '../../../../service/tag-group-management/tag-group-management.service';
import {CreateTagGroupModalComponent} from '../../../../core/modal/create-tag-group-modal/create-tag-group-modal.component';
import {TagGroupInfoEditModalComponent} from '../../../../core/modal/tag-group-info-edit-modal/tag-group-info-edit-modal.component';

@Component({
  selector: 'app-tag-group-management-table',
  templateUrl: './tag-group-management-table.component.html',
  styleUrls: ['./tag-group-management-table.component.less']
})
export class TagGroupManagementTableComponent implements OnInit {


  dataList = [];
  displayData = [];
  loading: boolean = false;
  total: number = 0;
  totalPage: number;
  pageIndex: number = 1;

  constructor(
    private TagGroupManagementService$: TagGroupManagementService,
    private _message: NzMessageService,
    private _modalService: NzModalService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.searchData()
  }

  searchData(pageIndex: number = this.pageIndex) {
    this.displayData = [];
    this.loading = true;
    this.TagGroupManagementService$.getTagGroupList().subscribe(result => {
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
  openCreateTagGroupModal() {
    const modal = this._modalService.create({
      nzTitle: '新建标签组',
      nzContent: CreateTagGroupModalComponent,
      nzOkText: '提交',
      nzCancelText: '取消',
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.destory()
    })
  }

  edit(id: string) {
    const modal = this._modalService.create({
      nzTitle: '编辑标签组信息',
      nzContent: TagGroupInfoEditModalComponent,
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
      nzTitle: '是否删除该标签组？',
      nzOnOk: () => console.log('111')
    })
  }

}
