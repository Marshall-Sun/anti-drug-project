import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenresourcedetailService {

  constructor(private _http: HttpClient) { }

  getOpenCourseDetailInfor(courseId:number, userid: number): Observable<any> {
    return this._http.get(`/course/open/Info?openCourseID=${courseId}&userId=${userid}`)
  }
  setLikeNum(courseId:number){
    return this._http.put(`/course/open/like?openCourseId=${courseId}`,{});
  }
  collectCourse(userId, openCourseId){
    return this._http.post(`/course/open/favourite?openCourseID=${openCourseId}&userId=${userId}`,{})
  }
  disCollectCourse(userId, openCourseId){
    return this._http.delete(`/course/open/unfavourite?openCourseID=${openCourseId}&userId=${userId}`)
  }
  getTeacherInfo(userId): Observable<any>{
    return this._http.get(`user/getPersonalDetail?userId=${userId}`);
  }
}
