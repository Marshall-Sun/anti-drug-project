import { Component, OnInit } from '@angular/core';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {MyteachingService} from '../../../../service/myteaching/myteaching.service';
import {CourseManagementService} from '../../../../service/course-management/course-management.service';

@Component({
  selector: 'app-favorite-course',
  templateUrl: './favorite-course.component.html',
  styleUrls: ['./favorite-course.component.less']
})
export class FavoriteCourseComponent implements OnInit {

  userId;
  courseList = [];
  dataList = [];
  total: string;
  pageIndex: number;
  private loading: boolean;

  constructor(
    private _modal: NzModalService,
    private routerInfo: ActivatedRoute,
    private _notification: NzNotificationService,
    private MyteachingService$:MyteachingService,
    private courseManagementService$: CourseManagementService,
    private router: Router
  ) { }


  ngOnInit() {
    this.userId = window.localStorage.getItem('id');
    this.searchData()
  }

  searchData(pageIndex: number = this.pageIndex) {
    this.courseList = [];
    this.loading = true;
    this.courseManagementService$.getMyStars(this.userId).subscribe(result=>{
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
    return watchTime/learnTime * 100;
  }

  viewCourse(url: string) {
    this.router.navigateByUrl(url)
  }
}
