import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {MyteachingService} from '../../../../service/myteaching/myteaching.service';
import {Router} from '@angular/router';

const count = 5;
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.less']
})
export class TopicComponent implements OnInit {

  MyTopicList = [];
  dataList = [];
  userId:number= parseInt(window.localStorage.getItem('id'));
  loading:boolean;
  detail = [];

  constructor(
    private http: HttpClient,
    private msg: NzMessageService,
    private _notification: NzNotificationService,
    private MyteachingService$: MyteachingService,
    private router: Router,
    private message: NzMessageService,

    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.searchData()
  }


  searchData() {
    this.MyTopicList = [];
    this.loading = true;
    this.MyteachingService$.getMyGroupThread(this.userId).subscribe(result => {
        this.loading = false;
        this.dataList = result.data;
        this.MyTopicList = this.dataList;
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

  getDate(cellValue){
    var date = new Date(cellValue*1000)
    var fmt = 'yyyy-MM-dd hh:mm:ss'

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      "q+" : Math.floor((date.getMonth()+3)/3),
      "S"  : date.getMilliseconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {

        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
    }

    cellValue = fmt
    return cellValue

  }
  getUserDetail(id:string) {
    this.MyteachingService$.getUser(id).subscribe(result=>{
      this.detail=result.data;
    },error1 => {
      this._notification.create(
        'error',
        '成员信息获取失败',
        `${error1.error}`)
    })
  }

  navigate(url: string) {
    this.router.navigateByUrl(url)
  }
}
