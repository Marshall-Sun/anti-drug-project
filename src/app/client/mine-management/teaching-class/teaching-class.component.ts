import { Component, OnInit } from '@angular/core';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MyteachingService} from '../../../service/myteaching/myteaching.service';

@Component({
  selector: 'app-teaching-class',
  templateUrl: './teaching-class.component.html',
  styleUrls: ['./teaching-class.component.less']
})
export class TeachingClassComponent implements OnInit {

  classroomId: string;

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

  teacherId = window.localStorage.getItem('id');

  constructor(
    private _modal: NzModalService,
    private routerInfo: ActivatedRoute,
    private _notification: NzNotificationService,
    private MyteachingService$: MyteachingService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.searchData()
  }

  searchData() {
    this.loading = true;
    this.classroomList = [];
    this.MyteachingService$.getClassList(1, 10, this.teacherId).subscribe(result => {
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
    this.router.navigateByUrl(url)
  }
}

