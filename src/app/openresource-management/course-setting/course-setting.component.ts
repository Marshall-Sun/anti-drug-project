import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { AddingOpencourseModalComponent } from 'src/app/core/modal/adding-opencourse-modal/adding-opencourse-modal.component';

@Component({
  selector: 'app-course-setting',
  templateUrl: './course-setting.component.html',
  styleUrls: ['./course-setting.component.less']
})
export class OpenresourceCourseSettingComponent implements OnInit {
  courseList = [];
  classroomId: string;
  userId = localStorage.getItem('id');

  constructor(
    private _modal: NzModalService,
    private msg: NzMessageService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.classroomId = location.pathname.split('/')[3];
    this.getCourseList();
  }

  async getCourseList() {
    try {
      let res: any = await this.http.get(`/course/open/getRecommendCourse?openCourseId=${this.classroomId}`).toPromise();
      this.courseList = res.data;
    } catch (e) {
      this.msg.error("信息初始化失败");
    }
  }

  openAddingCourseModal() {
    const modal = this._modal.create({
      nzTitle: '添加课程',
      nzContent: AddingOpencourseModalComponent,
      nzComponentParams: {
        classroomId: this.classroomId
      },
      nzWidth: 600,
      nzOkText: '添加',
      nzCancelText: '取消',
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.destroy()
    });
    modal.afterClose.subscribe(async (result) => {
      let etc = "";
      for (let i in result) {
        if (result[i]) etc += "&courseSetIdList=" + i;
      }
      try {
        await this.http.post(`/course/open/addRecommendCourse?${etc.slice(1)}&openCourseId=${this.classroomId}`, {}).toPromise();
        this.msg.success("课程添加成功");
        this.getCourseList();
      } catch (e) {
        this.msg.error("课程添加失败");
      }
    })
  }

  deleteCourse(id: any) {
    this._modal.confirm({
      nzTitle: '是否删除该课程？',
      nzOnOk: async () => {
        try {
          await this.http.delete(`/course/open/deleteRecommendCourse?recommendId=${id}`).toPromise();
          this.msg.success("课程删除成功");
          this.getCourseList();
        } catch (e) {
          this.msg.error("课程删除失败");
        }
      }
    })
  }

  async drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.courseList, event.previousIndex, event.currentIndex);
    try {
      let etc = this.courseList.reduce((str, item) => str + "&recommendIdList=" + item.recommendId, "");
      await this.http.put(`/course/open/sortRecommendCourse?${etc.slice(1)}`, {}).toPromise();
      this.getCourseList();
      this.msg.success("排序成功");
    } catch (e) {
      this.msg.error("排序失败");
    }
  }
}
