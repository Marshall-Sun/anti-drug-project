import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {AddingCourseModalComponent} from '../../core/modal/adding-course-modal/adding-course-modal.component';
import {ActivatedRoute} from '@angular/router';
import {ClientClassManagementService} from '../../service/client-class-management/client-class-management.service';

@Component({
  selector: 'app-course-setting',
  templateUrl: './course-setting.component.html',
  styleUrls: ['./course-setting.component.less']
})
export class CourseSettingComponent implements OnInit {

  courseList = [];
  classroomId: string;

  userId;

  constructor(
    private _modal: NzModalService,
    private routerInfo: ActivatedRoute,
    private classManagement$: ClientClassManagementService,
    private _notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.classroomId = location.pathname.split('/')[3];
    // this.courseList.push({
    //   title: '初中第6课 培养好习惯，牢记拒绝方法我要变得很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长(教学计划：默认教学计划)',
    //   descr: '看清陷阱，远离诱惑',
    //   teacherName: '李晨',
    //   occup: '讲师',
    //   avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //   stuNum: '5',
    //   taskNum: '2',
    //   expireTime: '永久'
    // },
    //   {
    //     title: '初中第3课 培养好习惯，牢记拒绝方法我要变得很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长(教学计划：默认教学计划)',
    //     descr: '看清陷阱，远离诱惑',
    //     teacherName: '李晨',
    //     occup: '讲师',
    //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //     stuNum: '5',
    //     taskNum: '2',
    //     expireTime: '永久'
    //   },
    //   {
    //     title: '初中第4课 培养好习惯，牢记拒绝方法我要变得很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长(教学计划：默认教学计划)',
    //     descr: '看清陷阱，远离诱惑',
    //     teacherName: '李晨',
    //     occup: '讲师',
    //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //     stuNum: '5',
    //     taskNum: '2',
    //     expireTime: '永久'
    //   },
    //   {
    //     title: '初中第5课 培养好习惯，牢记拒绝方法我要变得很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长(教学计划：默认教学计划)',
    //     descr: '看清陷阱，远离诱惑',
    //     teacherName: '李晨',
    //     occup: '讲师',
    //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //     stuNum: '5',
    //     taskNum: '2',
    //     expireTime: '永久'
    //   });
    this.getCourseList();
    this.userId = window.localStorage.getItem('id')
  }

  openAddingCourseModal() {
    const modal = this._modal.create({
      nzTitle: '添加课程',
      nzContent: AddingCourseModalComponent,
      nzComponentParams: {
        classroomId: this.classroomId
      },
      nzWidth: 600,
      nzOkText: '添加',
      nzCancelText: '取消',
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.destroy()
    });
    modal.afterClose.subscribe(result => {
      if (result && result.length > 0) {
        this.classManagement$.addCourseIntoClass(this.classroomId, result, this.userId).subscribe(result => {
          this.getCourseList();
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

  deleteCourse(courseId: string) {
    this._modal.confirm({
      nzTitle: '是否删除该课程？',
      nzOnOk: () => {
        this.classManagement$.deleteCourse(this.classroomId, courseId).subscribe(result => {
          this.getCourseList();
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

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.courseList, event.previousIndex, event.currentIndex);
    let idList = [];
    this.courseList.forEach((item, index) => {
      let courseBody = {
        classroomId: this.classroomId,
        classroomCourseId: item.classroomCourseId,
        seq: index + 1
      };
      idList.push(courseBody)
    });
    console.log(idList);
    this.classManagement$.sortCourseSeq(idList).subscribe(result => {
      this.getCourseList();
      this._notification.success(
        '排序成功！',
        ''
      )
    }, error1 => {
      this._notification.error(
        '发生错误！',
        `${error1.error}`
      )
    })
  }

  getCourseList() {
    return this.classManagement$.getClassCourseList(this.classroomId).subscribe(result => {
      this.courseList = result.data.list
    }, error1 => {
      this._notification.error(
        '发生错误！',
        `${error1.error}`
      )
    })
  }
}
