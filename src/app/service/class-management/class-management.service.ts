import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassManagementService {
  changeStatus: Subject<number> = new BehaviorSubject<number>(1);

  constructor(private _http: HttpClient) {
  }

  getMessageList(targetPage: number, pageSize: number): Observable<any> {
    return this._http.post(``, {
      pageSize: pageSize,
      pageNum: targetPage,
    })
  }

  filterUserList(targetPage: number, pageSize: number, filterOptions: any): Observable<any> {
    return this._http.post(``, {
      pageSize: pageSize,
      pageNum: targetPage,
      className: filterOptions.className,

    })
  }

  getMyClasses(targetPage: number, pageSize: number,userId:string): Observable<any> {
    const httpParam = new HttpParams()
      .set('pageNum', `${targetPage}`)
      .set('pageSize', `${pageSize}`)
      .set('userId',`${userId}`);
    return this._http.get(`/user/getLearningClassroom`, {
      params: httpParam
    })
  }

  getTeachClasses(targetPage: number, pageSize: number,userId:string): Observable<any> {
    const httpParam = new HttpParams()
      .set('pageNum', `${targetPage}`)
      .set('pageSize', `${pageSize}`)
      .set('teacherId',`${userId}`);
    return this._http.get(`/user/getTeachingClassroom`, {
      params: httpParam
    })
  }

  getClassroomList(targetPage: number, pageSize: number, filterOptions: any): Observable<any> {
    if (filterOptions.className == '') {
      return this._http.post(`/classroom/explore`, {
        pageNum: targetPage,
        pageSize: pageSize,
        classroomName: '',
        sortType: ''
      })
    } else {
      return this._http.post(`/classroom/explore`, {
        pageNum: targetPage,
        pageSize: pageSize,
        classroomName: filterOptions.className,
        sortType: ''
      })
    }

  }


  closeClassroom(id: string): Observable<any> {
    return this._http.post(`/classroom/background/close/${id}`, {})
  }

  setRecommendation(id: string, recSeq: string): Observable<any> {
    return this._http.post(`/classroom/background/setRecommend/${id}?recommendSeq=${recSeq}`, {})
  }

  cancelRecommendation(id: string): Observable<any> {
    return this._http.post(`/classroom/background/cancelRecommend/${id}`, {})
  }

  getRecommendationList(pageSize: number, pageIndex: number): Observable<any> {
    return this._http.post(`/classroom/background/getRecommendClassroom`, {
      pageNum: pageIndex,
      pageSize: pageSize
    })
  }

  publishClassroom(id: string): Observable<any> {
    return this._http.post(`/classroom/background/openClassroom/${id}`, {})
  }

  createNewClass(title: string): Observable<any> {
    return this._http.post(`/classroom/background/create`, {
      title: title
    })
  }


}
