import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teacher-management',
  templateUrl: './teacher-management.component.html',
  styleUrls: ['./teacher-management.component.less']
})
export class OpenresourceTeacherManagementComponent implements OnInit {
  teacherList = [];
  listOfOption = [];
  selectedValue = null;
  courseId: string;
  teachplanId:string;

  constructor(
    private _modal: NzModalService,
    private msg: NzMessageService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.courseId = location.pathname.split('/')[3];
    this.getTeacherList();
    this.getAvailableTeacherList();
  }

  async drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.teacherList, event.previousIndex, event.currentIndex);
    try {
      let etc = this.teacherList.reduce((str, teacher) => str + "&tableIdList=" + teacher.tableId, "");
      await this.http.put(`/course/open/sortOpenCourseTeacher?${etc.slice(1)}`, {}).toPromise();
      this.getTeacherList();
      this.msg.success("排序成功");
    } catch (e) {
      this.msg.error("排序失败");
    }
  }

  async getTeacherList() {
    try {
      let teacherList: any = await this.http.get(`/course/open/getOpenCourseTeacherList?openCourseId=${this.courseId}`).toPromise();
      this.teacherList = teacherList;
    } catch (e) {
      this.msg.error("信息初始化失败");
    }
  }

  async getAvailableTeacherList() {
    try {
      let res: any = await this.http.get(`/course/open/getAvailableTeacher?openCourseId=${this.courseId}`).toPromise();
      this.listOfOption = res.data.map((teacher: any) => ({
        label: teacher.username,
        value: teacher.userId,
      }));
    } catch (e) {
      this.msg.error("可选教师信息初始化失败");
    }
  }

  async addTeacher() {
    try {
      await this.http.post(`/course/open/addOpenCourseTeacher?openCourseId=${this.courseId}&teacherId=${this.selectedValue}`, {}).toPromise();
      location.reload();
      this.msg.success("添加成功");
    } catch (e) {
      this.msg.error("添加失败");
    }
  }

  delete(id: string) {
    this._modal.confirm({
      nzTitle: '是否删除该教师？',
      nzOnOk: async () => {
        try {
          await this.http.delete(`/course/open/deleteOpenCourseTeacher?tableId=${id}`).toPromise();
          this.msg.success("删除成功");
          location.reload();
        } catch (e) {
          this.msg.error("删除失败");
        }
      }
    })
  }
}
