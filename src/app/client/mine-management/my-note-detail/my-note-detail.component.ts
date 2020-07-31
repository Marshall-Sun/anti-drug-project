import {AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd';
import {MyteachingService} from '../../../service/myteaching/myteaching.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-my-note-detail',
  templateUrl: './my-note-detail.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./my-note-detail.component.less']
})
export class MyNoteDetailComponent implements OnInit {
  pageIndex: number;
  noteDetailList = [];
  dataList = [];
  loading = false;
  noteInfoList = [];

  userId:number = 1;
  courseId:number;
  location: Location;

  panels = [
    {
      active: true,
      disabled: false,
      name: 'This is panel header 1'
    }
  ];

  constructor(
    private _notification: NzNotificationService,
    private MyteachingService$: MyteachingService,
    private router: Router,
    private routerInfo: ActivatedRoute
  ) {
    this.courseId = this.routerInfo.snapshot.params['id'];
    this.userId = parseInt(window.localStorage.getItem("id"));
  }

  ngOnInit() {
    this.searchData();

  }



  searchData(pageIndex: number = this.pageIndex) {
    this.noteDetailList = [];
    this.noteInfoList = [];
    this.loading = true;
    this.MyteachingService$.getMyNoteDetilList(1, 10, this.userId,this.courseId).subscribe(result => {
        this.loading = false;
        this.dataList = result.data;
        this.noteDetailList = this.dataList;
        this.noteInfoList.push(this.noteDetailList[0]);
        console.log(this.noteDetailList);
        console.log(this.noteInfoList)
        }
      ,
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
