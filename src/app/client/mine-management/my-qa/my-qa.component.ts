import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NzNotificationService} from 'ng-zorro-antd';
import {MyteachingService} from '../../../service/myteaching/myteaching.service';

@Component({
  selector: 'app-my-qa',
  templateUrl: './my-qa.component.html',
  styleUrls: ['./my-qa.component.less']
})
export class MyQAComponent implements OnInit {
  pageIndex: number;
  questionList = [];
  dataList = [];
  loading = false;
  userId :string = window.localStorage.getItem('id');

  constructor(
    private _notification: NzNotificationService,
    private MyteachingService$: MyteachingService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.searchData()
  }

  searchData(pageIndex: number = this.pageIndex) {
    this.questionList = [];
    this.loading = true;
    this.MyteachingService$.getMyQAList(1, 10, this.userId).subscribe(result => {
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
