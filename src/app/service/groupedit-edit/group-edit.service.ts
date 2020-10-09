import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupEditService {

  constructor(private _http: HttpClient) { }
  setGroupInfo(title:string,content:string,groupId:string): Observable<any>{
    return this._http.put(`/groupGate/setGroupInfo`, {
      about:content,
      title:title,
      groupId:groupId

    })
  }
  changeStatus: Subject<number> = new BehaviorSubject<number>(1);
  //话题中发表回复
  getCommentListByArticleId(pageIndex: number, pageSize: number, articleId: string): Observable<any> {
    return this._http.get(`/groupComment/groupsThreadComments?objId=${articleId}&pageNum=${pageIndex}&pageSize=${pageSize}`)
  }

  insertComment(comment: any, objecttype: string): Observable<any> {
    return this._http.post(`/groupComment/insertComment`, {
      content: comment.content,
      objectid: comment.objectid,
      userid: comment.userId,
      objecttype: objecttype
    })
  }

  deleteComment(id: string): Observable<any> {
    return this._http.delete(`/groupComment/deleteComment?id=${id}`)
  }
}
