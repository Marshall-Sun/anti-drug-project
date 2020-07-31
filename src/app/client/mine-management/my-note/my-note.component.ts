import { Component, OnInit } from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd';
import {MyteachingService} from '../../../service/myteaching/myteaching.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-note',
  templateUrl: './my-note.component.html',
  styleUrls: ['./my-note.component.less']
})
export class MyNoteComponent implements OnInit {
  pageIndex: number;
  noteList = [];
  dataList = [];
  loading = false;

  userId:string='1';
  location: Location;

  constructor(
    private _notification: NzNotificationService,
    private MyteachingService$: MyteachingService,
    private router: Router
  ) {
    this.userId = window.localStorage.getItem("id");
  }

  ngOnInit() {
    this.searchData()
  }

  searchData(pageIndex: number = this.pageIndex) {
    this.noteList = [];
    this.loading = true;
    this.MyteachingService$.getMyNoteList(1, 10, this.userId).subscribe(result => {
        this.loading = false;
        this.dataList = result.data;
        this.noteList = this.dataList;
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
