import { Component, OnInit } from '@angular/core';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {MyteachingService} from '../../../service/myteaching/myteaching.service';

@Component({
  selector: 'app-my-class',
  templateUrl: './my-class.component.html',
  styleUrls: ['./my-class.component.less']
})
export class MyClassComponent implements OnInit {

  classroomId: string;

  userId:string= window.localStorage.getItem('id');
  classroomList = [];
  title: string;

  coursenum: string;
  studentnum: number;
  todayNewStudent: number;
  threadnum: number;

  total: number;
  loading: boolean = false;
  pageIndex: number = 1;

  dataList = [];
  totalPage: number;

  constructor(
    private _modal: NzModalService,
    private routerInfo: ActivatedRoute,
    private _notification: NzNotificationService,
    private MyteachingService$: MyteachingService,
    private route: Router
  ) {
  }

  ngOnInit() {
    this.searchData()
  }

  searchData() {
    this.loading = true;
    this.classroomList = [];
    this.MyteachingService$.getMyClassList(1, 10,this.userId ).subscribe(result => {
        this.loading = false;
        this.dataList = result.data;
        this.classroomList = this.dataList;
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
  choiceColor(status:string){
    if(status=="closed"){
      return "red";
    }
    if(status=="published"){
      return "green";
    }
  }

  navigatTo(url: string) {
    this.route.navigateByUrl(url)
  }

}
