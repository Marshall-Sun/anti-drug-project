import {Component, OnInit, TemplateRef} from '@angular/core';
import {ClassManagementService} from '../../../../service/class-management/class-management.service';
import { NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {TeacherRecommendModalComponent} from '../../../../core/modal/teacher-recommend-modal/teacher-recommend-modal.component';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-admin-class-management-table',
  templateUrl: './admin-class-management-table.component.html',
  styleUrls: ['./admin-class-management-table.component.less']
})
export class AdminClassManagementTableComponent implements OnInit {
  className: string = '';

  classNum = 0;

  dataList = [];
  displayData = [];
  loading = false;
  total: number = 0;
  totalPage: number;
  pageIndex: number = 1;

  filterOptions = {
    className: ''
  };

  newClassForm: FormGroup;

  constructor(
    private classManagementService$: ClassManagementService,
    private _notification: NzNotificationService,
    private _modalService: NzModalService,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.classManagementService$.changeStatus.subscribe(value => {
      this.searchData()
    })
  }

  ngOnInit() {

  }

  searchData(pageIndex: number = this.pageIndex) {
    this.displayData = [];
    this.loading = true;
    this.classManagementService$.getClassroomList(pageIndex, 10, this.filterOptions).subscribe(result => {
      this.loading = false;
      this.total = result.data[0].totalNum ? result.data[0].totalNum: 0;
      this.classNum = this.total;
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
  filterClass() {
    this.displayData = [];
    this.pageIndex = 1;
    this.loading = true;
    this.filterOptions = {
      className: this.className,
    };
    this.classManagementService$.getClassroomList(1, 10, this.filterOptions).subscribe(result => {
      this.loading = false;
      this.total = result.data[0].totalNum ? result.data[0].totalNum: 0;
      this.classNum = this.total;
      this.totalPage = Math.ceil(this.total / 10);
      this.dataList = result.data;
      this.displayData = this.dataList;
    }, error1 => {
      this.loading = false;
      this._notification.create(
        'error',
        '发生错误！',
        `${error1.error}`)
    })
  }

  // 查看班级课程的详情
  checkCourseDetail(id: string) {
    window.open(`/client/classroom/${id}/coursesetting`, '_blank')
  }
  // 发布班级
  publishClass(id: string) {
    this._modalService.confirm({
      nzTitle: '是否确定要发布班级？',
      nzOnOk: () => {
        this.classManagementService$.publishClassroom(id).subscribe(result => {
          this._notification.create(
            'success',
            '发布成功！',
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
        })
      }
    })
  }

  // 关闭班级
  closeClass(id: string) {
    this._modalService.confirm({
      nzTitle: '是否确定要关闭班级？',
      nzOnOk: () => {
        this.classManagementService$.closeClassroom(id).subscribe(result => {
          this._notification.create(
            'success',
            '关闭班级成功',
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
        })
      }
    })
  }

  // 推荐班级
  recommendationClass(id: string) {
    const modal = this._modalService.create({
      nzTitle: '设置班级的推荐序号',
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
            '设置推荐成功！',
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

  // 取消推荐
  cancelRecommendation(id: string) {
    this._modalService.confirm({
      nzTitle: '是否取消班级的推荐？',
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

  // 管理
  management(id: string) {
    window.open(`/client/classroom/${id}/manage`, '_blank')
  }

  navigateTo(url: string) {
    window.open(url, '_blank')
  }

  createClass(template: TemplateRef<{}>) {
    this.newClassForm = this.fb.group({
      title: ['', Validators.required]
    });
    this._modalService.create({
      nzTitle: '创建新班级',
      nzContent: template,
      nzOnOk: () => {
        this.newClassForm.controls.title.markAsDirty();
        this.newClassForm.controls.title.updateValueAndValidity();
        if (!this.newClassForm.controls.title.errors) {
          this.classManagementService$.createNewClass(this.newClassForm.controls.title.value).subscribe( result => {
            let i;
            this.classManagementService$.changeStatus.subscribe(value => i = value);
            this.classManagementService$.changeStatus.next(i + 1);
            this._notification.create('success', '创建成功！', '', {nzDuration: 1000})
          }, error1 => this._notification.create('error', '发生错误！', `${error1.error}`, {nzDuration: 1000}
          ))
        } else {
          return false;
        }
      }
    })
  }

}
