import {Component, OnInit, TemplateRef} from '@angular/core';
import {AdminCourseService} from '../../../../service/admin-course/admin-course.service';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserInfoViewModalComponent} from '../../../../core/modal/user-info-view-modal/user-info-view-modal.component';
import {TeacherRecommendModalComponent} from '../../../../core/modal/teacher-recommend-modal/teacher-recommend-modal.component';

@Component({
  selector: 'app-admin-course-management-table',
  templateUrl: './admin-course-management-table.component.html',
  styleUrls: ['./admin-course-management-table.component.less']
})
export class AdminCourseManagementTableComponent implements OnInit {

  userId;
  options = [
    {
      value: '18',
      label: '学堂在线',
      children: [
        {
          value: '22',
          label: '小学年级',
          isLeaf: true
        },
        {
          value: '23',
          label: '初中年级',
          isLeaf: true
        },
        {
          value: '24',
          label: '高中年级',
          isLeaf: true
        },
        {
          value: '25',
          label: '高职年级',
          isLeaf: true
        }
      ]
    },{
      label: '教师培训',
      value: '26',
      isLeaf: true
    }, {
      label: '寓教于乐',
      value: '21',
      isLeaf: true
    }, {
      label: '专题讲座',
      value: '20',
      isLeaf: true
    }, {
      label: '使用教程',
      value: '1',
      children: [
        {
          label: '管理员',
          value: '4',
          isLeaf: true
        },
        {
          label: '教师',
          value: '5',
          isLeaf: true
        },
        {
          label: '学员',
          value: '6',
          isLeaf: true
        }
      ]
    }
  ];

  courseClassification = [];
  courseType: string = 'normal';
  courseStatus: string = '';
  title: string = "";
  creator: string = "";
  filterOptions = {
    courseClassification: '',
    courseStatus: '',
    courseType: this.courseType,
    title: '',
    creator: ''
  };

  totalCourse = 0;

  displayData = [];
  dataList = [];
  loading: boolean = false;
  pageIndex: number = 1;

  newCourseForm: FormGroup;

  constructor(
    private adminCourseService$: AdminCourseService,
    private _notification: NzNotificationService,
    private _modal: NzModalService,
    private fb: FormBuilder
  ) {
    this.adminCourseService$.changeStatus.subscribe(value => {
      this.searchData()
    })
  }

  ngOnInit() {
    this.userId = window.localStorage.getItem('id');
    this.searchData();
  }

  filterCourse() {
    let courseClassification = '';
    if (this.courseClassification.length > 0) {
      courseClassification = this.courseClassification[this.courseClassification.length - 1]
    }
    this.filterOptions = {
      courseClassification: courseClassification,
      courseStatus: this.courseStatus,
      courseType: this.courseType,
      title: this.title,
      creator: this.creator
    };
    this.displayData = [];
    this.loading = true;
    this.pageIndex = 1;
    this.adminCourseService$.getCourseList(this.pageIndex, 10, this.filterOptions).subscribe(result => {
      this.loading = false;
      this.totalCourse = result.data.total? result.data.total: 0;
      this.dataList = result.data.data;
      this.displayData = this.dataList;
    }, error1 => {
      this.loading = false;
      this._notification.create(
        'error',
        '发生错误！',
        `${error1.error}`
      )
    })
  }

  searchData(pageIndex: number = this.pageIndex) {
    this.displayData = [];
    this.loading = true;
    this.adminCourseService$.getCourseList(pageIndex, 10, this.filterOptions).subscribe( result => {
      this.loading = false;
      this.totalCourse = result.data.total ? result.data.total: 0;
      this.dataList = result.data.data;
      this.displayData = this.dataList
    }, error1 => {
      this.loading = false;
      this._notification.create(
        'error',
        '发生错误！',
        `${error1.error}`)
    })
  }

  showRecommendCourseModal(courseId: string) {
    const modal = this._modal.create({
      nzTitle: '设置推荐序号',
      nzContent: TeacherRecommendModalComponent,
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.destroy()
    });
    modal.afterClose.subscribe(result => {
      if (result) {
        this.adminCourseService$.setRecommendCourse(courseId, result).subscribe(result => {
          this._notification.create(
            'success',
            '设置推荐成功！',
            ''
          );
          let i;
          this.adminCourseService$.changeStatus.subscribe(value => i = value);
          this.adminCourseService$.changeStatus.next(i + 1);
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

  cancelRecommendCourse(courseId: string) {
    this._modal.confirm({
      nzTitle: '是否要取消推荐？',
      nzOnOk: () => {
        this.adminCourseService$.cancelRecommendCourse(courseId).subscribe(result => {
          this._notification.create(
            'success',
            '取消推荐成功！',
            ''
          );
          let i;
          this.adminCourseService$.changeStatus.subscribe(value => i = value);
          this.adminCourseService$.changeStatus.next(i + 1);
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

  publishCourse(courseId: string) {
    this._modal.confirm({
      nzTitle: '是否要发布该课程？',
      nzOnOk: () => {
        this.adminCourseService$.publishCourse(courseId).subscribe(result => {
          this._notification.create(
            'success',
            '发布成功！',
            ''
          );
          let i;
          this.adminCourseService$.changeStatus.subscribe(value => i = value);
          this.adminCourseService$.changeStatus.next(i + 1);
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

  closeCourse(courseId: string) {
    this._modal.confirm({
      nzTitle: '是否要关闭该课程？',
      nzOnOk: () => {
        this.adminCourseService$.closeCourse(courseId).subscribe(result => {
          this._notification.create(
            'success',
            '关闭成功！',
            ''
          );
          let i;
          this.adminCourseService$.changeStatus.subscribe(value => i = value);
          this.adminCourseService$.changeStatus.next(i + 1);
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

  copyCourse(data: any) {
    this._modal.confirm({
      nzTitle: '是否要复制该课程？',
      nzOnOk: () => {
        this.adminCourseService$.copyCourse(data.id, this.userId, `${data.title}(复制)`).subscribe(result => {
          this._notification.create(
            'success',
            '复制成功！',
            ''
          );
          let i;
          this.adminCourseService$.changeStatus.subscribe(value => i = value);
          this.adminCourseService$.changeStatus.next(i + 1);
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

  deleteCourse(courseId: string) {
    this._modal.confirm({
      nzTitle: '是否要删除该课程？',
      nzOnOk: () => {
        this.adminCourseService$.deleteCourse(courseId).subscribe(result => {
          if (this.displayData.length === 1) {
            this.pageIndex --;
          }
          this.searchData();
          this._notification.create(
            'success',
            '删除成功！',
            ''
          );
          let i;
          this.adminCourseService$.changeStatus.subscribe(value => i = value);
          this.adminCourseService$.changeStatus.next(i + 1);
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

  createNewCourse(template: TemplateRef<{}>) {
    this.newCourseForm = this.fb.group({
      title: ['', Validators.required],
      courseType: ['normal']
    });
    this._modal.create({
      nzTitle: '新建课程',
      nzContent: template,
      nzOnOk: () => {
        this.newCourseForm.controls.title.markAsDirty();
        this.newCourseForm.controls.title.updateValueAndValidity();
        if (!this.newCourseForm.controls.title.errors) {
          this.adminCourseService$.createNewCourse(this.newCourseForm.controls.title.value, this.newCourseForm.controls.courseType.value, this.userId).subscribe( result => {
            let i;
            this.adminCourseService$.changeStatus.subscribe(value => i = value);
            this.adminCourseService$.changeStatus.next(i + 1);
            this._notification.create('success', '创建成功！', '', {nzDuration: 1000})
          }, error1 => this._notification.create('error', '发生错误！', `${error1.error}`, {nzDuration: 1000}
          ))
        } else {
          return false;
        }
      }
    })
  }

  viewUserInfo(id: string) {
    const modal = this._modal.create({
      nzTitle: '个人详细信息',
      nzContent: UserInfoViewModalComponent,
      nzComponentParams: {
        userId: id
      },
      nzWidth: 600,
      nzFooter: null
    })
  }

  navigateTo(url: string) {
    window.open(url, '_blank')
  }


}
