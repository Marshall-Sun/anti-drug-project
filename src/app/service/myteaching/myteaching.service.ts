import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyteachingService {

  constructor(private _http: HttpClient) { }
  //在教课程
  getCourseList(pageNum: number, pageSize: number, teacherId:string, courseType?:string): Observable<any> {
     return this._http.get(`/user/getTeachingCourse?pageNum=${pageNum}&pageSize=${pageSize}&teacherId=${teacherId}&courseType=${courseType}`)
  }

  //在教班级
  getClassList(pageNum: number, pageSize: number, teacherId:string): Observable<any> {
      return this._http.get(`/user/getTeachingClassroom?pageNum=${pageNum}&pageSize=${pageSize}&teacherId=${teacherId}`)
  }

  //学生问题
  getStudentQAList(pageNum: number, pageSize: number, teacherId:string): Observable<any> {

    return this._http.get(`/user/getCourseQuestion?pageNum=${pageNum}&pageSize=${pageSize}&teacherId=${teacherId}`)
  }

  //学生话题
  getStudentDiscussionList(pageNum: number, pageSize: number, teacherId:string, threadType: string): Observable<any> {

    return this._http.get(`/user/getCourseDiscussion?pageNum=${pageNum}&pageSize=${pageSize}&teacherId=${teacherId}&threadType=${threadType}`)
  }

  //我的课程
  getMyCourseList(pageNum: number, pageSize: number, userId:number, learnStatus:string): Observable<any> {

    return this._http.get(`/user/getLearningCourse?pageNum=${pageNum}&pageSize=${pageSize}&userId=${userId}&learnStatus=${learnStatus}`)
  }

  //我收藏的课程
  getMyLikeCourseList(pageNum: number, pageSize: number, userId:number): Observable<any> {

    return this._http.get(`/user/getLikeCourse?pageNum=${pageNum}&pageSize=${pageSize}&userId=${userId}`)
  }

  //我的班级
  getMyClassList(pageNum: number, pageSize: number, userId:string): Observable<any> {

    return this._http.get(`/user/getLearningClassroom?pageNum=${pageNum}&pageSize=${pageSize}&userId=${userId}`)
  }

  //我的问答
  getMyQAList(pageNum: number, pageSize: number, userId:string): Observable<any> {

    return this._http.get(`/user/getMyQuestion?pageNum=${pageNum}&pageSize=${pageSize}&userId=${userId}`)
  }

  //我的话题
  getMyDiscussionList(pageNum: number, pageSize: number, userId:string, threadType: string): Observable<any> {

    return this._http.get(`/user/getMyDiscussion?pageNum=${pageNum}&pageSize=${pageSize}&userId=${userId}&threadType=${threadType}`)
  }

  //我的笔记
  getMyNoteList(pageNum: number, pageSize: number, userId:string): Observable<any> {

    return this._http.get(`/user/getNoteList?pageNum=${pageNum}&pageSize=${pageSize}&userId=${userId}`)
  }

  //我的笔记详情
  getMyNoteDetilList(pageNum: number, pageSize: number, userId:number, courseId:number): Observable<any> {

    return this._http.get(`/user/getNoteDetil?pageNum=${pageNum}&pageSize=${pageSize}&userId=${userId}&courseId=${courseId}`)
  }
//创建课程
  postCreateCourse(title:string , type:string, userId:number): Observable<any> {

    return this._http.post(`/course/createCourse?title=${title}&type=${type}&userId=${userId}`,{

    })
  }
  //我的考试
  getMyExamList(pageNum: number, pageSize: number, testPaperType:string, userId:number): Observable<any> {

    return this._http.get(`/user/getStudentTestPaper?pageNum=${pageNum}&pageSize=${pageSize}&testPaperType=${testPaperType}&userId=${userId}`)
  }
  //我的收藏题目
  getMyFavoriteList(pageNum: number, pageSize: number, userId:number): Observable<any> {

    return this._http.get(`/user/getFavoriteQuestion?userId=${userId}`)
  }

  //取消收藏题目
  deleteMyFavorite(questionId:number, targetId: number, userId: number): Observable<any> {

    return this._http.delete(`/user/cancelCollection?questionId=${questionId}&targetId=${targetId}&userId=${userId}`)
  }

  //查看题目详情
  getQuestionDetail(questionId:number): Observable<any> {

    return this._http.get(`/user/getQuestionDetail?questionId=${questionId}`)
  }

  //我加入的小组
  getMyJoinGroup(userID:number): Observable<any> {

    return this._http.get(`/groupGate/showMyGroup?userID=${userID}`)
  }
  //我管理的小组
  getMyOwnGroup(userId:number): Observable<any> {

    return this._http.get(`/groupGate/showMyOwnGroup?userId=${userId}`)
  }
  //我发起的话题

  getMyGroupThread(userId:number): Observable<any> {

    return this._http.get(`/groupGate/showMyGroupThread?userId=${userId}`)
  }
  //我回复的话题
  getMyThreadPost(userID:number): Observable<any> {

    return this._http.get(`/groupGate/showMyGroupThreadPost?userID=${userID}`)
  }
  //我收藏的话题
  getMyThreadCollect(userID:number): Observable<any> {

    return this._http.get(`/groupGate/showMyGroupThreadCollect?userID=${userID}`)
  }

  //上传资料

 postUpDate(file:File,id:number): Observable<any> {

   return this._http.post(`/material/uploadFile/{id}`, {
     file: file,
     id: id,

   })
 }
//获取任务详情
  getCourseTask(userId:number,taskId:string): Observable<any> {

    return this._http.get(`/course/plan/getCourseTaskContent?userId=${userId}&taskId=${taskId}`)
  }

//获取个人id
  getUser(userId: string): Observable<any> {
    return this._http.get(`/user/getPersonalDetail?userId=${userId}`)
  }

  showAllGroup(): Observable<any> {
    return this._http.get(`/groupGate/showAllGroup`)
  }
}


