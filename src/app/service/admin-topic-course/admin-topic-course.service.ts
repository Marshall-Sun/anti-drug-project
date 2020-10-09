import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminTopicCourseService {

  constructor(private _http: HttpClient) { }
  getPostList(targetPage: number, pageSize: number, filterOptions: any): Observable<any> {
    if (filterOptions.postType == '' && filterOptions.attribute == '' && filterOptions.creator == '' && filterOptions.keyWord == '') {
      return this._http.get(`/course/getAllCourseTopics?pageSize=${pageSize}&pageNum=${targetPage}&type=${filterOptions.postType}`)
    } else {
      return this._http.get(`/course/getAllCourseTopics?pageSize=${pageSize}&pageNum=${targetPage}&attribute=${filterOptions.attribute}&authorName=${filterOptions.creator}&type=${filterOptions.postType}&searchType=${filterOptions.title}&keyWord=${filterOptions.keyWord}`)
    }
  }

  setCourseThreadTop(id: string): Observable<any> {
    return this._http.put(`/course/setCourseThreadStick?id=${id}`, {})
  }

  cancelCourseThreadTop(id: string): Observable<any> {
    return this._http.put(`/course/cancelCourseThreadStick?id=${id}`, {})
  }

  setCourseThreadElite(id: string): Observable<any> {
    return this._http.put(`/course/setCourseThreadElite?id=${id}`, {})
  }

  cancelCourseThreadElite(id: string): Observable<any> {
    return this._http.put(`/course/cancelCourseThreadElite?id=${id}`, {})
  }

  deleteCourseThread(id: string): Observable<any> {
    return this._http.delete(`/course/deleteCourseThread?id=${id}`)
  }

  deleteCourseThreadInBatch(list: any): Observable<any> {
    return this._http.delete(`/course/deleteCourseThreadList?deleteList=${list}`)
  }

  getClassroomThreadList(targetPage: number, pageSize: number, filterOption: any): Observable<any> {
    if (filterOption.keyWord == '' && filterOption.title == '' && filterOption.creator == '') {
      return this._http.get(`/classroom/background/getBackGroundThread?pageNum=${targetPage}&pageSize=${pageSize}`)
    } else {
      return this._http.get(`/classroom/background/getBackGroundThread?pageNum=${targetPage}&pageSize=${pageSize}&nickName=${filterOption.creator}&searchParam=${filterOption.keyWord}&searchType=${filterOption.title}`)
    }
  }


  deleteClassThreadInBatch(idList: any): Observable<any> {
    return this._http.delete(`/classroom/background/delBackGroundThread?threadId=${idList}`)
  }
}
