import {Component, OnInit, TemplateRef} from '@angular/core';
import {GroupTopicManagementTableService} from '../../../../service/group-topic-management-table/group-topic-management-table.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserInfoViewModalComponent} from '../../../../core/modal/user-info-view-modal/user-info-view-modal.component';


@Component({
  selector: 'app-group-topic-management-table',
  templateUrl: './group-topic-management-table.component.html',
  styleUrls: ['./group-topic-management-table.component.less']
})

export class GroupTopicManagementTableComponent implements OnInit {
  selectedStateFilterValue = '';
  groupName: string = '';
  leader: string = '';
  userId;

  dataList = [];
  displayData = [];
  loading: boolean = false;
  total: number = 0;
  totalPage: number;
  pageIndex: number = 1;

  filterOptions = {
    state: '',
    groupName: '',
    leader: ''
  };
  checkOption = [];
  topicTableListTable: any;

  newGroupForm: FormGroup;
  introductionContent: string = '';
  constructor(
    private groupTopicManagementTableService$: GroupTopicManagementTableService,
    private  _notification: NzNotificationService,
    private  _modalService: NzModalService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userId = window.localStorage.getItem('id');
    this.searchData();

  }
  // 搜索

  navigateTo(url: string) {
    window.open(url, '_blank')
  }

  filterTopicTable() {
    this.displayData = [];
    this.loading = true;
    this.filterOptions = {
      state: this.selectedStateFilterValue,
      groupName: this.groupName,
      leader: this.leader
    };
    this.pageIndex = 1;
    this.groupTopicManagementTableService$.getTopicTableList(1, 10, this.filterOptions).subscribe(result => {
      this.loading = false;
      this.total = result.data.total;
      this.totalPage = Math.ceil(this.total / 10);
      this.dataList = result.data.data;
      this.displayData = this.dataList;
    }, error1 => {
      this.loading = false;
      this._notification.error(
        '发生错误！',
        `${error1.error}`)
    })
  }
  searchData(pageIndex: number = this.pageIndex) {
    this.displayData = [];
    this.loading = true;
    this.groupTopicManagementTableService$.getTopicTableList(pageIndex, 10, this.filterOptions).subscribe(result => {
      this.loading = false;
      this.total = result.data.total;
      this.totalPage = Math.ceil(this.total / 10);
      this.dataList = result.data.data;
      this.displayData = this.dataList
    }, error1 => {
      this.loading = false;
      this._notification.error(
        '发生错误！',
        `${error1.error}`)
    })
  }

  viewUserInfo(id: string) {
    const modal = this._modalService.create({
      nzTitle: '个人详细信息',
      nzContent: UserInfoViewModalComponent,
      nzComponentParams: {
        userId: id
      },
      nzWidth: 600,
      nzFooter: null
    })
  }

  createNewGroup(template: TemplateRef<{}>) {
    this.newGroupForm = this.fb.group({
      groupName: ['', Validators.required]
    });
    this.introductionContent = '';
    this._modalService.create({
      nzTitle: '添加小组',
      nzContent: template,
      nzWidth: 600,
      nzOkText: '创建小组',
      nzOnOk: () => {
        let shouldBeClosed = false;
        this.newGroupForm.markAllAsTouched();
        this.newGroupForm.controls.groupName.updateValueAndValidity();
        if (!this.newGroupForm.controls.groupName.errors) {
          this.groupTopicManagementTableService$.createNewGroup(this.newGroupForm.controls.groupName.value, this.introductionContent, this.userId).subscribe(result => {
            this.searchData();
            this._notification.success(
              '创建成功！',
              ''
            );
          }, error1 => {
            this._notification.error(
              '发生错误！',
              `${error1.error}`
            )
          })
        } else {
          return shouldBeClosed
        }
      }
    })
  }

  openGroup(id: string) {

    this._modalService.confirm({
      nzTitle: '是否要开启小组？',
      nzOnOk: () => {
        this.groupTopicManagementTableService$.openGroup(id).subscribe(result => {
          this.searchData();
          this._notification.success(
            '开启成功！',
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

  // 关闭小组
  closeGroup(id: any){
    this._modalService.confirm({
      nzTitle: '是否要关闭小组？',
      nzOnOk: () => {
        this.groupTopicManagementTableService$.closeGroup(id).subscribe(result => {
          this.searchData();
          this._notification.success(
            '关闭成功！',
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
  // 转移小组
  exchangeGroup(id: any, template: TemplateRef<{}>){
    this._modalService.create({
      nzTitle: '转移小组管理人',
      nzContent: template,
      nzWidth: 600,
      nzOnOk: () => {
        let shouldBeClosed = false;
        this.newGroupForm.markAllAsTouched();
        this.newGroupForm.controls.groupName.updateValueAndValidity();
        return shouldBeClosed
      }
    })
  }
}
