import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { FrontDeskService } from 'src/app/service/front-desk/front-desk.service';
import { PrivateChatService } from 'src/app/service/private-chat/private-chat.service';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-front-notification',
  templateUrl: './front-notification.component.html',
  styleUrls: ['./front-notification.component.less']
})
export class FrontNotificationComponent implements OnInit {
  userId;
  sixin = [];
  notificationData = [];
  pageIndex = 1;
  pageSize = 5;
  notificationNum:number=0;
  msgNum:number=0;
  notificationLoading:boolean = true;
  msgLoading:boolean = true;

  constructor(
    private notificationService: NotificationService,
    private privateChatService: PrivateChatService,
    private _notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.userId = parseInt(localStorage.getItem('id'));
    this.privateChatService.changeStatus.subscribe(value => {
      this.search();
    })
  }

  search() {
    this.privateChatService.getMessages(0, this.pageIndex, this.pageSize, this.userId).subscribe(result => {
      if (result.data.length != 0) {
        this.sixin = result.data;
        this.msgNum = result.data[0].totalNum;
      }
      this.msgLoading = false;
    }, error1 => {
      this._notification.create(
        'error',
        '发生错误',
        `${error1.error}`
      )
    })
    this.notificationService.getNotifications('0', this.pageIndex, this.pageSize, this.userId).subscribe(result => {
      if (result.data.length != 0) {
        this.notificationData = result.data;
        this.notificationNum = result.data[0].jsonContents.totalNum;
      }
      this.notificationLoading = false;
    }, error1 => {
      this._notification.create(
        'error',
        '发生错误！',
        `${error1.error}`
      )
    })
  }
  readNotification(notificationId: number){
    this.notificationLoading = true;
    this.notificationService.readNotification(notificationId).subscribe( result => {
      this.search();
      this._notification.blank('确认信息：','已确认');
    });
    let i;
    this.notificationService.changeStatus.subscribe(value => i=value);
    this.notificationService.changeStatus.next(i+1);
  }
  readMsg(messageId:number, fromId:number, toId:number){
    this.msgLoading = true;
    if (this.userId==fromId)
      localStorage.setItem('contactId', toId.toString())
    else
      localStorage.setItem('contactId', fromId.toString())
    this.privateChatService.readMessages(messageId).subscribe(() =>{
      this.search();
    })
    let i;
    this.privateChatService.changeStatus.subscribe(value => i = value);
    this.privateChatService.changeStatus.next(i+1);
  }
  note:string;
  dealRealNameAuthenticate(str){
    this.note = this.decodeUnicode(str.split('"')[3]);
    return str.split('"')[7];
  }
  dealFollow(str){
    return str.split('"')[7];
  }

  decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    str = unescape(str);
    var reg = new RegExp("%", "g");
    str = str.replace(reg, "");
    return str;
  }

  @Output() navigateEvent = new EventEmitter();
  navigateByUrl(url: string) {
    this.navigateEvent.emit(url);
  }
}
