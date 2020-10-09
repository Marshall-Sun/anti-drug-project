import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseManagementService {

  constructor(private http: HttpClient) { }

  getMyCourse(targetPage: number, pageSize: number, userId: string,learnstatus:string): Observable<any> {
    const httpParam = new HttpParams()
      .set('learnstatus',`${learnstatus}`)
      .set('pageNum', `${targetPage}`)
      .set('pageSize', `${pageSize}`)
      .set('userId',`${userId}`);
    return this.http.get(`/user/getLearningCourse`, {
      params: httpParam
    })
  }

  getMyStars(userId: string): Observable<any> {
    const httpParam = new HttpParams()
      .set('userId',`${userId}`);
    return this.http.get(`/user/getLikeCourse`, {
      params: httpParam
    })
  }

  getTeachCourse(targetPage: number, pageSize: number, userId: string,courseType:string): Observable<any> {
    const httpParam = new HttpParams()
      .set('courseType',`${courseType}`)
      .set('pageNum', `${targetPage}`)
      .set('pageSize', `${pageSize}`)
      .set('teacherId',`${userId}`);
    return this.http.get(`/user/getTeachingCourse`, {
      params: httpParam
    })
  }
}
