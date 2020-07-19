import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseManagementBackHalfService {

  addingStatus: Subject<number> = new BehaviorSubject<number>(1);

  constructor(
    private _http: HttpClient
  ) { }

  // 教学计划设置
  //获得计划任务
  getPlanTaskNew(id: string): Observable<any> {
    return this._http.get(`/course/getTaskList?courseId=${id}`)
  }

  getTeachingPlan(id: string): Observable<any> {
    return this._http.get(`/teachingPlan/getTeachingPlanList?courseSetId=${id}`)
  }

  updatePlanStatus(id: string, status: string): Observable<any> {
    return this._http.put(`/teachingPlan/updateTeachingPlan`, {
      courseId: id,
      status: status
    })
  }

  addTeachingPlan(contentBody: any): Observable<any> {
    return this._http.post(`/teachingPlan/addTeachingPlan`, {
      courseSetId: contentBody.courseSetId,
      creator: contentBody.creator,
      expiryMode: contentBody.expiryMode,
      title: contentBody.courseSetTitle,
      learnMode: contentBody.learnMode,
      expiryDays: contentBody.expiryDays,
      expiryEndDate: contentBody.expiryEndDate,
      expiryStartDate: contentBody.expiryStartDate
    })
  }

  copyTeachingPlan(id: string, contentBody: any): Observable<any> {
    return this._http.post(`/teachingPlan/copyTeachingPlan?fromCourseId=${id}`, {
      courseSetId: contentBody.courseSetId,
      creator: contentBody.creator,
      expiryMode: contentBody.expiryMode,
      title: contentBody.courseSetTitle,
      learnMode: contentBody.learnMode,
      expiryDays: contentBody.expiryDays,
      expiryEndDate: contentBody.expiryEndDate,
      expiryStartDate: contentBody.expiryStartDate
    })
  }

  deletePlan(courseId: string): Observable<any> {
    return this._http.delete(`/teachingPlan/deleteTeachingPlan?courseId=${courseId}`)
  }

  // 试卷批阅
  getCoursePaperMarking(courseId: string): Observable<any> {
    return this._http.get(`/course/getTestCheckList?courseId=${courseId}`);
  }

  getPaperResultList(courseId: string, testId: string, status: string): Observable<any> {
    return this._http.get(`/course/getTestPaperResult?courseId=${courseId}&testId=${testId}&status=${status}`)
  }

  searchPaperResult(courseId: string, testId: string, name: string, status: string): Observable<any> {
    return this._http.get(`/course/getTestPaperResult?courseId=${courseId}&testId=${testId}&userName=${name}&status=${status}`)
  }

  // 教师管理
  addTeacherIntoCourse(id: string, courseId: string, teacherId: string): Observable<any> {
    return this._http.post(`/teachingPlan/addTeacher?courseId=${courseId}&courseSetId=${id}&userId=${teacherId}`, {})
  }

  getTeacherList(courseId: string): Observable<any> {
    return this._http.get(`/teachingPlan/getTeachingPlanTeachers?courseId=${courseId}`)
  }

  searchTeacherWhenAdding(courseId: string, userName: string): Observable<any> {
    return this._http.get(`/teachingPlan/getAddableTeachers?courseId=${courseId}&userName=${userName}`)
  }

  sortTeacherSeq(courseId: string, teacherIds: any): Observable<any> {
    return this._http.put(`/teachingPlan/sortTeacher?courseId=${courseId}&teacherIds=${teacherIds}`, {})
  }

  deleteTeacher(courseId: string, userId: string): Observable<any> {
    return this._http.delete(`/teachingPlan/deleteCourseMember?courseId=${courseId}&userId=${userId}`)
  }

  // 学员管理
  getTeachingPlanStudent(courseId: string, pageSize: number, targetPage: number, userName: string): Observable<any> {
    return this._http.get(`/teachingPlan/getTeachingPlanStudents?courseId=${courseId}&pageNum=${targetPage}&pageSize=${pageSize}&userName=${userName}`)
  }

  searchAddableStudent(courseId: string, userName: string): Observable<any> {
    return this._http.get(`/teachingPlan/getAddableStudents?courseId=${courseId}&userName=${userName}`)
  }

  addStudent(courseId: string, courseSetId: string, studentId: string): Observable<any> {
    return this._http.post(`/teachingPlan/addStudent?courseId=${courseId}&courseSetId=${courseSetId}&studentId=${studentId}`, {

    })
  }

  deleteStudent(courseId: string, userId: string): Observable<any> {
    return this._http.delete(`/teachingPlan/deleteCourseMember?courseId=${courseId}&userId=${userId}`)
  }

  setStudentRemark(courseId: string, remark: string, userId: string): Observable<any> {
    return this._http.put(`/teachingPlan/setStudentRemark?courseId=${courseId}&remark=${remark}&userId=${userId}`, {})
  }

  // 计划设置
  getPlanBasicInfo(id: string): Observable<any> {
    return this._http.get(`/teachingPlan/getTeachingPlanInfo?courseId=${id}`)
  }

  setPlanBasicInfo(id: string, audience: string, enableFinish: number, goals: string, summary: string, title: string): Observable<any> {
    return this._http.put(`/teachingPlan/setTeachingPlanInfo`, {
      audiences: audience,
      courseId: id,
      enableFinish: enableFinish,
      goals: goals,
      summary: summary,
      title: title
    })
  }

  //添加任务
  addPlanTask_Text(pt_form:any): Observable<any> {
    return this._http.post(`/course/createTask_Text`, pt_form)
  }

  addPlanTask_Homework(hk_form:any): Observable<any> {
    return this._http.post(`/course/createTask_Homework`, hk_form)
  }

  addPlanTask_Video(hk_form:any): Observable<any> {
    return this._http.post(`/course/createTask_Video`, hk_form)
  }

  addPlanTask_DownLoad(hk_form:any): Observable<any> {
    return this._http.post(`/course/createTask_Download`, hk_form)
  }

  addPlanTask_Test(testform:any): Observable<any> {
    return this._http.post(`/course/createTask_Testpaper`, testform)
  }

  //排序任务
  sortPlanTask(courseId:string,taskIdArray:any): Observable<any> {
    return this._http.put(`/course/sort?courseId=${courseId}&sortList=${taskIdArray}`, {})
  }

  deleteTask(taskId : string): Observable<any> {
    return this._http.delete(`/course/deleteTask?taskId=${taskId}`)
  }

  deleteSubTask(taskId : string): Observable<any> {
    return this._http.delete(`/course/deleteSubTask?taskId=${taskId}`)
  }

  publishTask(taskId: string): Observable<any> {
    return this._http.put(`/course/publishTask?taskId=${taskId}`, {})
  }

  unpublishTask(taskId: string): Observable<any> {
    return this._http.put(`/course/unpublishTask?taskId=${taskId}`, {})
  }

  getTaskDetail(courseTaskId:any){
    return this._http.get(`/course/getTaskDetail?courseTaskId=${courseTaskId}`)
  }

  edit_text(taskId:any,tx_form:any){
    return this._http.post(`/course/editTask_Text`, {
      finishDetail:tx_form.finishDetail,
      isOptional:tx_form.isOptional,
      taskContent:tx_form.content,
      taskId:taskId,
      taskTitle:tx_form.title
    })
  }

  edit_homework(taskId:any,hw_form:any){
    return this._http.post(`/course/editTask_Homework`, {
      taskDescription:hw_form.content,
      isOptional:hw_form.isOptional,
      taskId:taskId,
      taskTitle:hw_form.title,
      userId:hw_form.fromUserId
    })
  }

  edit_test(taskId:any,test_form:any){
    return this._http.post(`/course/editTask_Testpaper`, {
      doTimes:test_form.doTimes,
      finishScore:test_form.finishScore,
      finishType:test_form.finishType,
      isOptional:test_form.isOptional,
      limitedTime:test_form.limitedTime,
      reDoInterval:test_form.reDoInterval,
      taskId:taskId,
      testpaperId:test_form.testpaperId,
      title:test_form.title
    })
  }


  edit_video(taskId:any,vi_form:any){
    return this._http.post(`/course/editTask_Video`, {
      fileId:vi_form.fileId,
      finishdetail:vi_form.finishDetail,
      finishtype:vi_form.finishType,
      isOptional:vi_form.isOptional,
      taskId:taskId,
      title:vi_form.title
    })
  }

  edit_download(taskId:any,ma_form:any){
    return this._http.post(`/course/editTask_Download`, {
      fileIdList:ma_form.fileIds,
      fromCourseId:ma_form.fromCourseId,
      fromCourseSetId:ma_form.fromCourseSetId,
      isOptional:ma_form.isOptional,
      taskId:taskId,
      title:ma_form.title
    })
  }
}
