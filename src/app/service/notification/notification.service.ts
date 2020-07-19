import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  changeStatus:Subject<number> = new BehaviorSubject<number>(1);

  constructor(private _http: HttpClient) { }

  getNotifications(isread: string , pageIndex: number, pageSize: number, userId: number): Observable<any> {
    return this._http.get(`/user/getNotification?isRead=${isread}&pageNum=${pageIndex}&pageSize=${pageSize}&userId=${userId}`);
  }
  readNotification(notificationId:number): Observable<any> {
    return  this._http.put(`/user/readNotification?notificationId=${notificationId}`, {});
  }
  delNotification(notificationId){
    return this._http.delete(`/user/delNotification?notificationId=${notificationId}`);
  }
}
