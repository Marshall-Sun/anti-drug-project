import { Component, OnInit } from '@angular/core';
import {ClientClassManagementService} from '../../service/client-class-management/client-class-management.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-management-dashboard',
  templateUrl: './management-dashboard.component.html',
  styleUrls: ['./management-dashboard.component.less']
})
export class ManagementDashboardComponent implements OnInit {

  classroomId: string;

  introduction: string;

  classroom: any;

  commentList = [];

  commentLoading: boolean = false;

  constructor(
    private classroomManagement$: ClientClassManagementService,
    private _notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.classroomId = location.pathname.split('/')[3];
    this.getClassroomDetail();
    this.getReviewList()
  }

  getClassroomDetail() {
    this.classroomManagement$.getClassroomDetail(this.classroomId).subscribe(result => {
      this.classroom = result.data;
    }, error1 => {
      this._notification.error(
        '发生错误！',
        `${error1.error}`
      )
    })
  }

  getIntroduction() {
    this.classroomManagement$.getIntroduction(this.classroomId).subscribe(result => {
      this.introduction = result.data;
    }, error1 => {
      this._notification.error(
        '发生错误！',
        `${error1.error}`
      )
    })
  }

  getReviewList() {
    this.classroomManagement$.getClassroomReview(this.classroomId, 1, 5).subscribe(result => {
      this.commentList = result.data.classReviewList;
    }, error1 => {
      this._notification.error(
        '发生错误！',
        `${error1.error}`
      )
    })
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url)
  }

}
