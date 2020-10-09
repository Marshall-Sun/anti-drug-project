import {Component, Input, OnInit} from '@angular/core';

import  {MyteachingService} from "../../../../service/myteaching/myteaching.service";
import {NzNotificationService} from 'ng-zorro-antd';
import {Router} from '@angular/router';




@Component({
  selector: 'app-normal-course',
  templateUrl: './normal-course.component.html',
  styleUrls: ['./normal-course.component.less']
})
export class NormalCourseComponent implements OnInit {

  @Input()
  name: string;
  recordList = [];
  total: number;
  loading: boolean = false;
  pageIndex: number = 1;
  status:string;

  teacherId;
  i: number =1;
  dataList = [];
  displayData = [];
  totalPage: number;


  constructor(
    private _notification: NzNotificationService,
    private MyteachingService$:MyteachingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.teacherId = window.localStorage.getItem('id');
    this.searchData()
  }

  filterStudent() {

  }
  searchData(pageIndex: number = this.pageIndex) {
    this.recordList = [];
    this.loading = true;
    this.MyteachingService$.getCourseList(pageIndex,8 , this.teacherId,"ordinary").subscribe(result=>{
        this.loading = false;
        this.dataList = result.data;
        this.recordList = this.dataList;
        this.total = this.recordList[0].totalNum
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



  navigatTo(url: string) {
    this.router.navigateByUrl(url)
  }
}
