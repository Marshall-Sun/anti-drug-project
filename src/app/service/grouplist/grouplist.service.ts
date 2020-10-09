import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrouplistService {

  constructor(private _http: HttpClient) {
  }

  //搜索
  getSearch(leader: string,groupId:string): Observable<any> {
    return this._http.get(`/groupGate/searchThread?content=${leader}&groupId=${groupId}`)
  }

  //获取展示新进小组成员
  getNewMember(groupId: string, memberNumber: number): Observable<any> {
    return this._http.get(`/groupGate/showNewMembers?groupId=${groupId}&memberNumber=${memberNumber}`)

  }

//展示气泡框小组成员信息
  showMemberMessage(groupId: string): Observable<any> {
    return this._http.get(`/groupGate/showGroupMembers?groupID=${groupId}`)

  }

  //获取小组介绍
  showGroupIntroduction(groupId: string): Observable<any> {
    return this._http.get(`/groupGate/showGroupIntroduction?groupID=${groupId}`)
  }

//获取个人id
  getUser(userId: string): Observable<any> {
    return this._http.get(`/user/getPersonalDetail?userId=${userId}`)
  }

  //获取新晋小组
  getNewGroup(groupNumber: number): Observable<any> {
    return this._http.get(`/user/showNewGroup?groupNumber=${groupNumber}`)
  }



  //关注用户
  followedUser(userId: string, toId: string): Observable<any> {
    return this._http.put(`/user/followedUser`, {
      fromId: userId,
      toId: toId

    })
  }

  //取消关注用户
  delFollowedUser(userId: string, toId: string): Observable<any> {
    return this._http.put(`/user/delFollowedUser`, {
      fromId: userId,
      toId: toId
    })
  }

  //发送私信
  sendMessage(content: string, userId: string, toId: string, messageIdList: any): Observable<any> {
    console.log(messageIdList)
    let messageConversationId = 0;
    let messageId = 0;
    let messageRelationId = 0;
    if(messageIdList !== []) {
      messageConversationId = messageIdList.messageConversationId;
      messageId = messageIdList.messageId;
      messageRelationId = messageIdList.messageRelationId
    }
    return this._http.put(`/user/sendMessage`, {
      fromId: userId,
      content: content,
      toId: toId,
      messageConversationId: messageConversationId,
      messageId: messageId,
      messageRelationId: messageRelationId
    })
  }
  //是否已经关注
  isFocus(userId:string,toId:string):Observable<any>{
    return this._http.get(`/user/isFollowed?userId=${userId}&fellowId=${toId}`)
  }
  //获取我的小组

  getMyGroup(userId:string,groupId:string):Observable<any>{
    return this._http.get(`/groupGate/showMyselfInGroup?userId=${userId}&groupId=${groupId}`)
  }
  //获取小组成员
  getGroupMembers(groupId:string):Observable<any>{
    return this._http.get(`/groupGate/showGroupMembers?groupID=${groupId}`)
  }

  // 加入小组
  joinInGroup(groupId: string, role: string, userId: string): Observable<any> {
    return this._http.post(`/groupGate/addNewGroupMember`, {
      groupId: groupId,
      role: role,
      userId: userId
    })
  }

  isJoinInGroup(groupId: string, userId: string): Observable<any> {
    return this._http.get(`/groupGate/isJoinGroup?groupId=${groupId}&userId=${userId}`)
  }
}
