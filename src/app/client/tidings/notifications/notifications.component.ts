import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../../service/notification/notification.service";
import {Notification} from "rxjs";
import {NzNotificationService} from "ng-zorro-antd";
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.less']
})
@Injectable()
export class NotificationsComponent implements OnInit {
  userId: number;
  pageIndex: number = 1;
  pageSize: number = 8;
  total: number;
  loading: boolean = true;
  notification = [];

  constructor(private notificationservice: NotificationService,
              private _notification: NzNotificationService) {}
  ngOnInit() {
    this.userId = parseInt(localStorage.getItem('id'));
    this.search();
  }
  readNotification(notificationId: number){
    this.loading = true;
    this.notificationservice.readNotification(notificationId).subscribe( result => {
      this.search();
      this._notification.blank('确认信息：','已确认');
    });
    let i;
    this.notificationservice.changeStatus.subscribe(value => i=value);
    this.notificationservice.changeStatus.next(i+1);
  }
  search() {
    this.notificationservice.getNotifications('1',this.pageIndex, this.pageSize, this.userId).subscribe( result => {
      this.notification = result.data;
      this.total= result.data[0].jsonContents.totalNum;
      this.notification.forEach(item => {
        item.needDel = false;
      })
      this.loading = false;
    }, error1 => {
      this._notification.create(
        'error',
        '发生错误！',
        `${error1.error}`
      )
    })
  }
  loadData(pi: number): void {
    this.pageIndex = pi;
    this.loading = true;
    this.search()
    window.scrollTo(0, 110);
  }
  decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    str = unescape(str);
    let reg = new RegExp("%","g");
    str = str.replace(reg,"")
    return str;
  }
  note:string;
  dealRealNameAuthenticate(str){
    this.note = this.decodeUnicode(str.split('"')[3]);
    return str.split('"')[7];
  }
  dealFollow(str){
    return str.split('"')[7];
  }
  delNotification(notificationId){
    this.notificationservice.delNotification(notificationId).subscribe(()=>{
      this.loading = true;
      this.search();
    })
  }
}
