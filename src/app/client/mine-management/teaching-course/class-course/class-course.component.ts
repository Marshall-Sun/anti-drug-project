import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd';
import {MyteachingService} from '../../../../service/myteaching/myteaching.service';

@Component({
  selector: 'app-class-course',
  templateUrl: './class-course.component.html',
  styleUrls: ['./class-course.component.less']
})
export class ClassCourseComponent implements OnInit {

  @Input()
  name: string;
  recordList = [];
  total: number;
  loading: boolean = false;
  pageIndex: number = 1;

  dataList = [];
  displayData = [];
  totalPage: number;

   teacherId;
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
    this.MyteachingService$.getCourseList(pageIndex,8,this.teacherId,"classCourse").subscribe(result=>{
        this.loading = false;
        this.dataList = result.data;
        this.recordList = this.dataList;
        this.total = this.recordList[0].totalNum;
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
