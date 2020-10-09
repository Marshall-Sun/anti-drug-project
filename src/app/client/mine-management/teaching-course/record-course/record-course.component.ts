import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd';
import {MyteachingService} from '../../../../service/myteaching/myteaching.service';

@Component({
  selector: 'app-record-course',
  templateUrl: './record-course.component.html',
  styleUrls: ['./record-course.component.less']
})
export class RecordCourseComponent implements OnInit {


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
    private routerInfo: ActivatedRoute,
    private _notification: NzNotificationService,
    private MyteachingService$:MyteachingService,
    private router: Router
  ) {
  }
  ngOnInit() {
    this.teacherId = window.localStorage.getItem('id');
    this.searchData()
  }

  filterStudent() {

  }

  searchData(pageIndex: number = this.pageIndex) {
    this.recordList = [];
    this.loading = true;
    this.MyteachingService$.getCourseList(pageIndex,8,this.teacherId,"openCourse").subscribe(result=>{
        this.loading = false;
        this.dataList = result.data;
        this.recordList = this.dataList;
        this.total = this.recordList[0]? this.recordList[0].totalNum: 0
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
