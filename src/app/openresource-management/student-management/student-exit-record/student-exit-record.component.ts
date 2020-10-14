import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-student-exit-record',
  templateUrl: './student-exit-record.component.html',
  styleUrls: ['./student-exit-record.component.less']
})
export class StudentExitRecordComponent implements OnInit {

  @Input()
  courseId: string;

  name: string;
  recordList = [];
  total: number;
  loading: boolean = false;
  pageIndex: number = 1;

  constructor(
    private routerInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    this.courseId = location.pathname.split('/')[3];
    this.recordList = [
      {
        imgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name: '董卓然',
        exitTime: new Date(),
        exitType: '免费加入',
        exitReason: '免费加入'
      },
      {
        imgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name: '董卓然',
        exitTime: new Date(),
        exitType: '免费加入',
        exitReason: '免费加入'
      },
      {
        imgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name: '董卓然',
        exitTime: new Date(),
        exitType: '免费加入',
        exitReason: '免费加入'
      },
      {
        imgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name: '董卓然',
        exitTime: new Date(),
        exitType: '免费加入',
        exitReason: '免费加入'
      },

    ]
  }

  filterStudent() {

  }

  searchData(pageIndex: number = this.pageIndex) {

  }

}
