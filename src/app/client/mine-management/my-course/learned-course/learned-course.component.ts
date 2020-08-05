import { Component, OnInit } from '@angular/core';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {MyteachingService} from '../../../../service/myteaching/myteaching.service';

@Component({
  selector: 'app-learned-course',
  templateUrl: './learned-course.component.html',
  styleUrls: ['./learned-course.component.less']
})
export class LearnedCourseComponent implements OnInit {

  userId;
  courseList = [];
  dataList = [];
  pageIndex: number;
  total: string;
  private loading: boolean;

  constructor(
    private _modal: NzModalService,
    private routerInfo: ActivatedRoute,
    private _notification: NzNotificationService,
    private MyteachingService$:MyteachingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = window.localStorage.getItem('id');
    this.searchData()
  }

  searchData(pageIndex: number = this.pageIndex) {
    this.courseList = [];
    this.loading = true;
    this.MyteachingService$.getMyCourseList(1,10,this.userId,"finished").subscribe(result=>{
        this.loading = false;
        this.dataList = result.data;
        this.courseList = this.dataList;
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

  choiceColor(serializeMode:string){
    if(serializeMode=="finished"){
      return "green";
    }
    if(serializeMode=="none"){
      return "red";
    }else{
      return "yellow";
    }
  }
  LearnPro(learnTime: number, watchTime: number) {
    return watchTime/learnTime;
  }

  viewCourse(url: string) {
    this.router.navigateByUrl(url)
  }
}
