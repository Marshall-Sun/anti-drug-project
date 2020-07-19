import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoticeManagementService {

  constructor(private _http: HttpClient) {
  }

  getMessageList(targetPage: number, pageSize: number): Observable<any> {
    return this._http.get(`/system/getBatchNotifications?pageNum=${targetPage}&pageSize=${pageSize}`)
  }

  createNewNotification(content: string, fromUserId: number, title: string): Observable<any> {
    return this._http.post(`/system/createBatchNotifications?content=${content}&fromUserId=${fromUserId}&title=${title}`, {
    })
  }

  deleteNotification(id: string): Observable<any> {
    return this._http.delete(`/system/deleteBatchNotifications?id=${id}`)
  }

}
