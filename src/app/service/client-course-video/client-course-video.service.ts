import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientCourseVideoService {

  constructor(private http: HttpClient) { }
  // 获得任务列表
  getTaskList(id: string): Observable<any> {
    return this.http.get(`/course/getTaskList?courseId=${id}`)
  }
  // 向服务器发送笔记
  postNote(courseid: string,teachplanID:string,taskId:string, content: string, userId: string): Observable<any> {
    const api = '/course/plan/createCourseNote';
    // tslint:disable-next-line: max-line-length
    return this.http.post(api, {
      userId: userId,
      courseSetId: courseid,
      courseId: teachplanID,
      taskId: taskId,
      content: content
    });
  }
  // 向服务器发送问题
  postQuestion(courseid: string,teachplanID:string, content: string,title:string, userId: string): Observable<any> {
    const api = '/course/plan/createCourseQuestion';
    return this.http.post(api, {
      userId: userId,
      courseSetId: courseid,
      courseId: teachplanID,
      taskId: 0,
      title: title,
      content: content
    });
  }

  // 获得任务详细信息
  //courseid就是教学计划id  我一般把它叫做teachplanid
  getCurrentTask(courseid:string,taskid: string,userid:string): Observable<any> {
    return this.http.get(`/course/getTaskDetail?courseId=${courseid}&taskId=${taskid}&userId=${userid}`)
  }

  //告知服务器任务完成
  finishTask(courseid:string,taskid: string,userid:string): Observable<any> {
    return this.http.put(`/course/finishTask?courseId=${courseid}&taskId=${taskid}&userId=${userid}`, {})
  }
}
