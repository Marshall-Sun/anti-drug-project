import { Component, OnInit } from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd';
import {MyteachingService} from '../../../../service/myteaching/myteaching.service';

@Component({
  selector: 'app-my-course-topic',
  templateUrl: './course-topic.component.html',
  styleUrls: ['./course-topic.component.less']
})
export class MyCourseTopicComponent implements OnInit {

  pageIndex: number;
  topicList = [];
  dataList = [];
  loading = false;
  userId: string ='1';

  constructor(
    private _notification: NzNotificationService,
    private MyteachingService$: MyteachingService
  ) {
  }

  ngOnInit() {
    this.searchData()
  }

  searchData(pageIndex: number = this.pageIndex) {
    this.topicList = [];
    this.loading = true;
    this.MyteachingService$.getMyDiscussionList(1, 10, this.userId, "courseMemberThread").subscribe(result => {
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
}
