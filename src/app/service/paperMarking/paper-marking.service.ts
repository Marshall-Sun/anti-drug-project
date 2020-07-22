import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaperMarkingService {

  constructor(private _http: HttpClient) { }

  //获取试卷批阅列表，courseid是教学计划id
  getTestCheckList(courseId: string):Observable<any>{
    const httpParam = new HttpParams()
      .set('courseId', `${courseId}`);
    return this._http.get(`/course/getTestCheckList`, {
      params: httpParam
    })
  }

  //获取单个试卷批阅详细列表
  getTestPaperResult(pageNum:number,pageSize:number,testId:number):Observable<any>{
    const httpParam = new HttpParams()
      .set('pageNum', `${pageNum}`)
      .set('pageSize', `${pageSize}`)
      .set('testId',`${testId}`);
    return this._http.get(`/course/getTestPaperResult`, {
      params: httpParam
    })
  }

  //获取班级试卷批阅列表
  getClassTestCheckList(classId:string):Observable<any>{
    const httpParam = new HttpParams()
      .set('classId', `${classId}`);
    return this._http.get(`/course/getClassTestCheckList`, {
      params: httpParam
    })
  }


  //获取班级考试
  getClassroomTestpaper(userId: number): Observable<any> {
    const httpParam = new HttpParams()
      .set('userId', `${userId}`);
    return this._http.get(`/user/getClassroomTestpaper`, {
      params: httpParam
    })
  }

  //获取在教课程
  getTeachingCourse(courseType:string,pageNum:number,pageSize:number,teacherId:string):Observable<any>{
    const httpParam = new HttpParams()
      .set('courseType', `${courseType}`)
      .set('pageNum', `${pageNum}`)
      .set('pageSize', `${pageSize}`)
      .set('teacherId',`${teacherId}`);
    return this._http.get(`/user/getTeachingCourse`, {
      params: httpParam
    })
  }

  //获取考试的试卷内容
  getTestPaperContent(courseId:string,taskId:string,userId:string):Observable<any>{
    const httpParam = new HttpParams()
      .set('courseId', `${courseId}`)
      .set('taskId', `${taskId}`)
      .set('userId', `${userId}`);
    return this._http.get(`/course/getTestPaperContent`, {
      params: httpParam
    })
  }

  //提交考试试卷
  submitTestPaper(answers: any[], courseId: string,taskId:string,userId:string): Observable<any> {
    return this._http.post(`/course/submitTestPaper`, {
      answers: answers,
      courseId: courseId,
      taskId:taskId,
      userId:userId
    })
  }
}
