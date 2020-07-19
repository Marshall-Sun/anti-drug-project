import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {getIifeBody} from "@angular/compiler-cli/ngcc/src/host/esm5_host";

@Injectable({
  providedIn: 'root'
})
export class PrivateChatService {
  changeStatus: Subject<number> = new BehaviorSubject<number>(1);
  constructor(private _http: HttpClient) {
  }
  getNickName(id): Observable<any>{
    return this._http.get(`/user/getNickName?userId=${id}`);
  }
  getMessages(isRead:number, pageIndex:number, pageSize:number, userId:number): Observable<any>{
    return this._http.get(`/user/getMessage?isRead=${isRead}&pageNum=${pageIndex}&pageSize=${pageSize}&userId=${userId}`)
  }
  readMessages(messageId: number): Observable<any>{
    return this._http.put(`/user/readMessage?messageId=${messageId}`,{})
  }
  sendMessage(msg,content: string,isRead:string): Observable<any>{
    var time = (new Date().getTime() - new Date('1970-01-01 00:00:00').getTime())/1000;
    return this._http.put(`/user/sendMessage`,{
      content: content,
      createTime: time,
      createTimeString: null,
      fromId: msg.fromId,
      fromNickName: msg.fromNickName,
      fromSmallAvatar: msg.fromSmallAvatar,
      isRead: isRead,
      messageConversationId:msg.messageConversationId,
      messageId:msg.messageId,
      messageRelationId:msg.messageRelationId,
      toId:msg.toId,
      toNickName: msg.toNickName,
      totalMessages: msg.totalMessages+1,
      totalNum: msg.totalNum,
      type: msg.type })
  }
  delConversation(conversationId){
    return this._http.delete(`/user/delConversationById?conversationId=${conversationId}`);
  }
  delMessage(msgId, conversationId){
    return this._http.delete(`/user/delConversationByIdAndMessageId?conversationId=${conversationId}&messageConversationId=${msgId}`);
  }
  getUserList(): Observable<any>{
    return this._http.get(`/user/getUserIdAndName`)
  }
  getConversationId(fromId, toId): Observable<any>{
    return this._http.get(`/user/getConversationId?fromId=${fromId}&toId=${toId}`);
  }
  getConversation(connId, pageNum, pageSize): Observable<any>{
    return this._http.get(`/user/getConversation?conversationId=${connId}&pageNum=${pageNum}&pageSize=${pageSize}`);
  }
}
