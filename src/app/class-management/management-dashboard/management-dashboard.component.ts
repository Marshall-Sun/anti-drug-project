import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management-dashboard',
  templateUrl: './management-dashboard.component.html',
  styleUrls: ['./management-dashboard.component.less']
})
export class ManagementDashboardComponent implements OnInit {

  classroomId: string;

  isSetIntro: boolean = true;
  isSetImage: boolean = true;

  commentList = [];

  commentLoading: boolean = false;

  constructor() { }

  ngOnInit() {
    this.classroomId = location.pathname.split('/')[3];
  }

}
