import { Component, OnInit } from '@angular/core';
import {ProgramaManagementService} from '../../../../service/programa-management/programa-management.service';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import {ProgramaEditModalComponent} from '../../../../core/modal/programa-edit-modal/programa-edit-modal.component';
import {NewsManagementService} from '../../../../service/news-management/news-management.service';

@Component({
  selector: 'app-programa-management-table',
  templateUrl: './programa-management-table.component.html',
  styleUrls: ['./programa-management-table.component.less']
})
export class ProgramaManagementTableComponent implements OnInit {

  dataList = [];
  displayData = [];
  loading: boolean = false;


  constructor(
    private newsManagementService$: NewsManagementService,
    private _notification: NzNotificationService,
    private _modalService: NzModalService
  ) { }

  ngOnInit() {
    this.searchData()
  }

  searchData() {
    this.displayData = [];
    this.loading = true;
    this.newsManagementService$.getCategoryList().subscribe(result => {
      this.loading = false;
      this.dataList = result;
      this.displayData = this.dataList;
    }, error1 => {
      this.loading = false;
      this._notification.error(
        '发生错误！',
        `${error1.error}`)
    })
  }

  // 拖拽排序
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.displayData, event.previousIndex, event.currentIndex);
  }

  // 打开新增栏目模态框
  openCreateProgramaModal() {
    const _modal = this._modalService.create({
      nzTitle: '添加栏目',
      nzContent: ProgramaEditModalComponent,
      nzWidth: 600,
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.destroy()
    });
    _modal.afterClose.subscribe(result => {
      if (result) {
        this.newsManagementService$.insertCategory(result.name, result.code, result.categoryid).subscribe(result => {
          this.searchData();
          this._notification.success(
            '添加成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '添加失败',
            `${error1.error}`
          )
        })
      }
    })
  }

  // 删除栏目
  delete(id: string) {
    this._modalService.confirm({
      nzTitle: '是否删除该栏目？',
      nzOnOk: () => {
        this.newsManagementService$.deleteCategory(id).subscribe(result => {
          this.searchData();
          this._notification.success(
            '删除成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '删除失败！',
            `${error1.error}`
          )
        })
      }
    })
  }

  edit(item: any) {
    const _modal = this._modalService.create({
      nzTitle: '添加栏目',
      nzContent: ProgramaEditModalComponent,
      nzComponentParams: {
        item: item
      },
      nzWidth: 600,
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.destroy()
    });
    _modal.afterClose.subscribe(result => {
      if (result) {
        this.newsManagementService$.updateCategory(item.id, result.name, result.code, result.categoryid).subscribe(result => {
          this.searchData();
          this._notification.success(
            '添加成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '添加失败！',
            `${error1.error}`
          )
        })
      }
    })
  }
}
