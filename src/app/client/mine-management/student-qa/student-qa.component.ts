import { Component, OnInit } from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd';
import {MyteachingService} from '../../../service/myteaching/myteaching.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-student-qa',
  templateUrl: './student-qa.component.html',
  styleUrls: ['./student-qa.component.less']
})
export class StudentQAComponent implements OnInit {
 pageIndex: number;
 questionList = [];
dataList = [];
  loading = false;
teacherId:string = window.localStorage.getItem('id');
  constructor(
    private _notification: NzNotificationService,
    private MyteachingService$:MyteachingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchData()
  }
  searchData(pageIndex: number = this.pageIndex) {
    this.questionList = [];
    this.loading = true;
    this.MyteachingService$.getStudentQAList(1,10,this.teacherId).subscribe(result=>{
        this.loading = false;
        this.dataList = result.data;
        this.questionList = this.dataList;
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

  navigate(url: string) {
    this.router.navigateByUrl(url)
  }


}
