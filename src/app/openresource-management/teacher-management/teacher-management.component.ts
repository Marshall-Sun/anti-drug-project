import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {CourseManagementBackHalfService} from '../../service/course-management-back-half/course-management-back-half.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-teacher-management',
  templateUrl: './teacher-management.component.html',
  styleUrls: ['./teacher-management.component.less']
})
export class OpenresourceTeacherManagementComponent implements OnInit {

  teacherList = [];
  courseId: string;
  teachplanId:string;
  loading: boolean = false;


  constructor(
    private courseManagement$: CourseManagementBackHalfService,
    private _notification: NzNotificationService,
    private _modal: NzModalService
  ) { }

  ngOnInit() {
    this.courseId = location.pathname.split('/')[3];
    this.teachplanId = location.pathname.split('/')[5];
    this.getTeacherList(this.teachplanId);
  }


  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.teacherList, event.previousIndex, event.currentIndex);
    let idList = [];
    this.teacherList.forEach(item => {
      idList.push(item.id)
    });
    this.courseManagement$.sortTeacherSeq(this.teachplanId, idList).subscribe(result => {
      this.getTeacherList(this.teachplanId);
      this._notification.success(
        '排序成功！',
        ''
      )
    }, error1 => {
      this._notification.error(
        '排序失败！',
        `${error1.error}`
      )
    })
  }

  getTeacherList(planId: string) {
    this.courseManagement$.getTeacherList(this.teachplanId).subscribe(result => {
      this.teacherList = result.data
    }, error1 => {
      this._notification.error(
        '获取教师列表失败！',
        `${error1.error}`
      )
    })
  }

  addTeacher(data: any) {
    this.courseManagement$.addTeacherIntoCourse(this.courseId, this.teachplanId, data).subscribe(result => {
      this.getTeacherList(this.teachplanId);
      let i;
      this.courseManagement$.addingStatus.subscribe(value => i = value);
      this.courseManagement$.addingStatus.next(i + 1);
      this._notification.success(
        '添加教师成功！',
        ''
      )
    }, error1 => {
      this._notification.error(
        '添加教师失败！',
        `${error1.error}`
      )
    })
  }

  onChange(data: any) {
    this.teachplanId = data;
    this.getTeacherList(this.teachplanId)
  }

  close(id: string) {
    this._modal.confirm({
      nzTitle: '是否删除该教师？',
      nzOnOk: () => {
        this.courseManagement$.deleteTeacher(this.teachplanId, id).subscribe(result => {
          this.getTeacherList(this.teachplanId);
          let i;
          this.courseManagement$.addingStatus.subscribe(value => i = value);
          this.courseManagement$.addingStatus.next(i + 1);
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

}
