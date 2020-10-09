import { Component, OnInit,EventEmitter } from '@angular/core';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {TeachingPlanAddingModalComponent} from '../../core/modal/teaching-plan-adding-modal/teaching-plan-adding-modal.component';
import {CourseManagementBackHalfService} from '../../service/course-management-back-half/course-management-back-half.service';
  import { from } from 'rxjs';
@Component({
  selector: 'app-teaching-plan-management',
  templateUrl: './teaching-plan-management.component.html',
  styleUrls: ['./teaching-plan-management.component.less']
})
export class TeachingPlanManagementComponent implements OnInit {

  courseId: string;

  planList = [];
  total: number;
  loading: boolean = false;
  pageIndex: number = 1;

  navigateTPage: EventEmitter<string>;//用于菜单切换

  constructor(
    private _modal: NzModalService,
    private route: Router,
    private courseManagement$: CourseManagementBackHalfService,
    private _notification: NzNotificationService
  ) { 
    this.navigateTPage = new EventEmitter();
  }

  ngOnInit() {
    this.courseId = location.pathname.split('/')[3];
    this.searchData()
  }

  searchData(pageIndex: number = this.pageIndex) {
    this.loading = true;
    this.courseManagement$.getTeachingPlan(this.courseId).subscribe(result => {
      this.loading = false;
      this.planList = result.data;
      console.log(result);
    })

  }

  navigateTo(url: string) {
    this.route.navigateByUrl(url)
  }

  copy(data: any) {
    const modal = this._modal.create({
      nzTitle: '复制教学计划',
      nzContent: TeachingPlanAddingModalComponent,
      nzComponentParams: {
        courseId: this.courseId
      },
      nzWidth: 600,
      nzOkText: '提交',
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.destroy()
    });
    modal.afterClose.subscribe(result => {
      if (result) {
        this.courseManagement$.addTeachingPlan(result).subscribe(result => {
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

  closePlan(id: string) {
    this._modal.confirm({
      nzTitle: '是否要关闭该计划？',
      nzOnOk: () => {
        this.courseManagement$.updatePlanStatus(id, 'closed').subscribe(result => {
          this.searchData();
          this._notification.success(
            '关闭成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '关闭失败！',
            `${error1.error}`
          )
        })
      }
    })
  }

  deletePlan(id: string) {
    this._modal.confirm({
      nzTitle: '是否要删除该计划？',
      nzOnOk: () => {
        this.courseManagement$.deletePlan(id).subscribe(result => {
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

  publishPlan(id: string) {
    this._modal.confirm({
      nzTitle: '是否要发布该计划？',
      nzOnOk: () => {
        this.courseManagement$.updatePlanStatus(id, 'published').subscribe(result => {
          this.searchData();
          this._notification.success(
            '发布成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '发布失败！',
            `${error1.error}`
          )
        })
      }
    })
  }


  openAddingPlanModal() {
    const modal = this._modal.create({
      nzTitle: '创建教学计划',
      nzContent: TeachingPlanAddingModalComponent,
      nzComponentParams: {
        courseId: this.courseId,
        courseSetTitle:this.planList[0].coursesettitle
      },
      nzWidth: 600,
      nzOkText: '创建',
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.destroy()
    });
    modal.afterClose.subscribe(result => {
      if (result) {
        this.courseManagement$.addTeachingPlan(result).subscribe(result => {
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
