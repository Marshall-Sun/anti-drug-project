import { Component, OnInit } from '@angular/core';
import {MyteachingService} from '../../../../service/myteaching/myteaching.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course-topic',
  templateUrl: './course-topic.component.html',
  styleUrls: ['./course-topic.component.less']
})
export class CourseTopicComponent implements OnInit {

  pageIndex: number;
  topicList = [];
  dataList = [];
  loading = false;

  teacherId:string = window.localStorage.getItem('id');
  constructor(
    private _notification: NzNotificationService,
    private MyteachingService$: MyteachingService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.searchData()
  }

  searchData(pageIndex: number = this.pageIndex) {
    this.topicList = [];
    this.loading = true;
    this.MyteachingService$.getStudentDiscussionList(1, 10, this.teacherId, "courseMemberThread").subscribe(result => {
        this.loading = false;
        this.dataList = result.data;
        this.topicList = this.dataList;
      },
      error1 => {
        this.loading = false;
        this._notification.create(
          'error',
          '发生错误',
          `${error1.error}`
        )

      })

  }

  navigate(url: string) {
    this.router.navigateByUrl(url)
  }
}
