import { Injectable } from '@angular/core';
import {HttpClient,HttpParams } from '@angular/common/http';
import {Observable, Subject, BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PlanTasksService {

  constructor(
    private _http: HttpClient,
  ) { }
  // //编辑下载任务时增加下载材料时使用，新增下载任务时勿用。
  // addTask_CourseMaterialV8(copyid: number,courseid:number,coursesetid:number,
  //         createdtime:number, description:string,fileid:number,
  //         filemime:string,filesize:number,fileuri:string,
  //         lessonid:number,link:string,source:string,
  //         title:string,type:string,userid:number
  // ): Observable<any> {
  //   return this._http.post(`/course/addTask_CourseMaterialV8 `, {
  //     copyid:copyid, courseid:courseid, coursesetid:coursesetid,
  //     createdtime:createdtime, description:description, fileid:fileid,
  //     filemime:filemime,filesize:filesize,fileuri:fileuri,
  //     lessonid:lessonid,link:link,source:source,
  //     title:title,type:type,userid:userid,
  //   })
  // }
  // //（预习、练习、作业、课外）子任务（讨论），子任务与任务插入区别为无需插入course_chapter表
  // createSubTask_Discuss(activity_content:string, activity_copyid:number,activity_endtime:number,
  //                       activity_fromcourseid:number, activity_fromcoursesetid:number,activity_fromuserid:number,
  //                       activity_length:number, activity_mediatype:string, activity_migratelessonid:number,
  //                       activity_remark:string, activity_starttime:number, activity_title:string,
  //                       courseChapter_id:number, courseTask_copyid:number, courseTask_courseid:number,
  //                       courseTask_createduserid:number, courseTask_endtime:number, courseTask_fromcoursesetid:number,
  //                       courseTask_isfree:number, courseTask_isoptional:number, courseTask_length:number,
  //                       courseTask_maxonlinenum: number, courseTask_mediasource:number, courseTask_migratelessonid:number,
  //                       courseTask_mode:string, courseTask_number:string, courseTask_seq:number,
  //                       courseTask_starttime:number, courseTask_status:string, courseTask_title:string,
  //                       courseTask_type:string):Observable<any> {
  //     return this._http.post(`/course/ createSubTask_Discuss`,{
  //         activity_content:activity_content,activity_copyid:activity_copyid,activity_endtime:activity_endtime,
  //         activity_fromcourseid:activity_fromcourseid,activity_fromcoursesetid:activity_fromcoursesetid,activity_fromuserid:activity_fromuserid,
  //         activity_length:activity_length,activity_mediatype:activity_mediatype,activity_migratelessonid:activity_migratelessonid,
  //         activity_remark:activity_remark,activity_starttime:activity_starttime,activity_title:activity_title,
  //         courseChapter_id:courseChapter_id,courseTask_copyid:courseTask_copyid,courseTask_courseid:courseTask_courseid,
  //         courseTask_createduserid:courseTask_createduserid,courseTask_endtime:courseTask_endtime,courseTask_fromcoursesetid:courseTask_fromcoursesetid,
  //         courseTask_isfree:courseTask_isfree,courseTask_isoptional:courseTask_isoptional,courseTask_length:courseTask_length,
  //         courseTask_maxonlinenum:courseTask_maxonlinenum,courseTask_mediasource:courseTask_mediasource,courseTask_migratelessonid:courseTask_migratelessonid,
  //         courseTask_mode:courseTask_mode,courseTask_number:courseTask_number,courseTask_seq:courseTask_seq,
  //         courseTask_starttime:courseTask_starttime,courseTask_status:courseTask_status,courseTask_title:courseTask_title,
  //         courseTask_type:courseTask_type,
  //   })
  // }
  // //新增任务讨论
  // createTask_Discuss(activity_content:string, activity_copyid:number,activity_endtime:number,
  //                    activity_fromcourseid:number, activity_fromcoursesetid:number, activity_fromuserid:number,
  //                    activity_length:number, activity_mediatype:string,activity_migratelessonid:number,
  //                    activity_remark:string, activity_starttime:number, activity_title:string,
  //                    courseChapter_copyid:number, courseChapter_courseid:number, courseChapter_mgratecopytaskid:number,
  //                    courseChapter_migratecopycourseid:number, courseChapter_migratelessonid:number,courseChapter_migratereftaskid:number,
  //                    courseChapter_number:number, courseChapter_seq:number, courseChapter_title:string,
  //                    courseChapter_type:string, courseTask_copyid:number, courseTask_courseid:number,
  //                    courseTask_createduserid:number, courseTask_endtime:number, courseTask_fromcoursesetid: number,
  //                    courseTask_isfree:number, courseTask_isoptional:number, courseTask_length:number,
  //                    courseTask_maxonlinenum:number, courseTask_mediasource:string, courseTask_migratelessonid:number,
  //                    courseTask_mode:string, courseTask_number:string, courseTask_seq:number,
  //                    courseTask_starttime:number, courseTask_status:string, courseTask_title:string,
  //                    courseTask_type:string,
  // ):Observable<any>{
  //   return this._http.post(`/course/createTask_Discuss`,{
  //     activity_content:activity_content,activity_copyid:activity_copyid,activity_endtime:activity_endtime,
  //     activity_fromcourseid:activity_fromcourseid,activity_fromcoursesetid:activity_fromcoursesetid,activity_fromuserid:activity_fromuserid,
  //     activity_length:activity_length,activity_mediatype:activity_mediatype,activity_migratelessonid:activity_migratelessonid,
  //     activity_remark:activity_remark,activity_starttime:activity_starttime,activity_title:activity_title,
  //     courseChapter_copyid:courseChapter_copyid,courseChapter_courseid:courseChapter_courseid,courseChapter_mgratecopytaskid:courseChapter_mgratecopytaskid,
  //     courseChapter_migratecopycourseid:courseChapter_migratecopycourseid,courseChapter_migratelessonid:courseChapter_migratelessonid,courseChapter_migratereftaskid:courseChapter_migratereftaskid,
  //     courseChapter_number:courseChapter_number,courseChapter_seq:courseChapter_seq,courseChapter_title:courseChapter_title,
  //     courseChapter_type:courseChapter_type,courseTask_copyid:courseTask_copyid,courseTask_courseid:courseTask_courseid,
  //     courseTask_createduserid:courseTask_createduserid,courseTask_endtime:courseTask_endtime,courseTask_fromcoursesetid:courseTask_fromcoursesetid,
  //     courseTask_isfree:courseTask_isfree,courseTask_isoptional:courseTask_isoptional,courseTask_length:courseTask_length,
  //     courseTask_maxonlinenum:courseTask_maxonlinenum,courseTask_mediasource:courseTask_mediasource,courseTask_migratelessonid:courseTask_migratelessonid,
  //     courseTask_mode:courseTask_mode,courseTask_number:courseTask_number,courseTask_seq:courseTask_seq,
  //     courseTask_starttime:courseTask_starttime,courseTask_status:courseTask_status,courseTask_title:courseTask_title,
  //     courseTask_type:courseTask_type,
  //   })
  // }
  //新增任务讨论
//新增章/节，在新增章节后排序更改，调用SORT进行重新排序。






  //新增章节，在新增章节后排序更改，请调用sort重新进行排序。
  createChapter( courseid : number ,  number : number , title : string ,
                 type : string , seq : number ):Observable<any> {
    return this._http.post(`/course/createChapter `,{
      courseid : courseid ,
      title : title ,
      type : type,
      seq : seq,
      number : number,
      // copyid: contentBody.copyid, courseid:  contentBody.courseid, mgratecopytaskid: contentBody.mgratecopytaskid,
      // migratecopycourseid:  contentBody.migratecopycourseid, migratelessonid:  contentBody.migratelessonid,migratereftaskid:  contentBody.migratereftaskid,
      // number: contentBody.number,seq: contentBody.seq,title: contentBody.title,type: contentBody.type,
    })
  }
//新增任务（作业），需要插入五张表。
//   createTask_Homework(contentBody:any):Observable<any>{
//     return this._http.post(`/course/createTask_Homework`,{
//       activity_content:contentBody.activity_content, activity_copyid:contentBody.activity_copyid, activity_endtime:contentBody.activity_endtime,
//       activity_fromcourseid:contentBody.activity_fromcourseid, activity_fromcoursesetid:contentBody.activity_fromcoursesetid, activity_fromuserid:contentBody.activity_fromuserid,
//       activity_length:contentBody.activity_length, activity_mediatype:contentBody.activity_mediatype, activity_migratelessonid:contentBody.activity_migratele,
//       activity_remark:contentBody.activity_remark, activity_starttime:contentBody.activity_starttime, activity_title:contentBody.activity_title,
//       courseChapter_copyid:contentBody.courseChapter_copyid, courseChapter_courseid:contentBody.courseChapter_courseid, courseChapter_mgratecopytdyaskid:contentBody.courseChapter_mgratecopytdyaskid,
//       courseChapter_migratecopycourseid:contentBody.courseChapter_migratecopycourseid, courseChapter_migratelessonid:contentBody.courseChapter_migratelessonid, courseChapter_migratereftaskid:contentBody.courseChapter_migratereftaskid,
//       courseChapter_number:contentBody.courseChapter_number, courseChapter_seq:contentBody.courseChapter_seq, courseChapter_titl:contentBody.courseChapter_titl, courseChapter_type:contentBody.courseChapter_type,
//       courseTask_copyid:contentBody.courseTask_copyid, courseTask_courseid:contentBody.courseTask_courseid, courseTask_createduserid:contentBody.courseTask_createduserid,
//       courseTask_endtime:contentBody.courseTask_endtime, courseTask_fromcoursesetid:contentBody.courseTask_fromcoursesetid, courseTask_isfree:contentBody.courseTask_isfree,
//       courseTask_isoptional:contentBody.courseTask_isoptional, courseTask_length:contentBody.courseTask_length, courseTask_maxonlinenum:contentBody.courseTask_maxonlinenum,
//       courseTask_mediasource:contentBody.courseTask_mediasource, courseTask_migratelessonid:contentBody.courseTask_migratelessonid, courseTask_mode:contentBody.courseTask_mode,
//       courseTask_number:contentBody.courseTask_number, courseTask_seq:contentBody.courseTask_seq, courseTask_starttime:contentBody.courseTask_starttime,
//       courseTask_status:contentBody.courseTask_status, courseTask_title:contentBody.courseTask_title, courseTask_type:contentBody.courseTask_type,
//       testpaperV8_copyid:contentBody.testpaperV8_copyid, testpaperV8_courseid:contentBody.testpaperV8_courseid, testpaperV8_coursesetid:contentBody.testpaperV8_coursesetid,
//       testpaperV8_createduserid:contentBody.testpaperV8_createduserid, testpaperV8_description:contentBody.testpaperV8_description, testpaperV8_itemcount:contentBody.testpaperV8_itemcount,
//       testpaperV8_lessonid:contentBody.testpaperV8_lessonid, testpaperV8_limitedtime:contentBody.testpaperV8_limitedtime, testpaperV8_metas:contentBody.testpaperV8_metas,
//       testpaperV8_migratetestid:contentBody.testpaperV8_migratetestid, testpaperV8_name:contentBody.testpaperV8_name, testpaperV8_passedcondition:contentBody.testpaperV8_passedcondition,
//       testpaperV8_pattern:contentBody.testpaperV8_pattern, testpaperV8_score:contentBody.testpaperV8_score, testpaperV8_status:contentBody.testpaperV8_status,
//       testpaperV8_target:contentBody.testpaperV8_target, testpaperV8_type:contentBody.testpaperV8_type, testpaperV8_updateduserid:contentBody.testpaperV8_updateduserid,
//     })
//   }
  createTask_Homework(homeWorkBody : any) : Observable<any>{
    return this._http.post(`/course/createTask_Homework`,{
      courseTask_title : homeWorkBody.courseTaskHomeworkTitle,
      activity_content : homeWorkBody.courseTaskHomeworkIntro,
    })
  }
  //新增任务（考试），需要插入四张表。
  createTask_Testpaper(testBody:any):Observable<any>{
    const api = `/course/createTask_Testpaper`;
    return this._http.post(api,{
      courseTask_title : testBody.courseTaskTestTitle,
      courseTask_type : testBody.courseTaskType,
      courseTask_status : testBody.courseTaskStatus,
      courseTask_number : testBody.courseTestNum, courseTask_seq : testBody.courseTestSeq,
      courseTask_fromcoursesetid : testBody.courseTaskFromCourseId,activity_fromuserid : testBody.courseTaskTestFromCourseId,

    })
  }


  //新增任务（图文），后端需要插入四张表，要42个参数，但是我给不了。我按照原网站的post请求所给的参数来写。
  //很多参数都没有意义。
  // createTask_Text(courseTask_title : any,  courseTask_type : string,
  //                 activity_content : any , courseTask_status : string,
  //                 courseTask_number : string,courseTask_seq : number,
  //                 activity_fromcourseid : number , courseTask_fromcoursesetid : number):Observable<any>{
  //   const api = `/course/createTask_Text`;
  //   return this._http.post(api,{
  //
  //     courseTask_title : courseTask_title, courseTask_type : courseTask_type ,
  //     activity_content : activity_content,courseTask_status : courseTask_status,
  //     courseTask_number : courseTask_number, courseTask_seq : courseTask_fromcoursesetid,
  //     activity_fromcourseid : activity_fromcourseid, courseTask_fromcoursesetid :courseTask_fromcoursesetid,
  //   });
  // }
  createTask_Text(pictureBody){
    const api = `/course/createTask_Text`;
      return this._http.post(api,
        {
              courseTask_title : pictureBody.courseTaskPictureTitle,
              courseTask_type : pictureBody.courseTaskType,
              activity_content : pictureBody.courseTaskPictureIntro,
              courseTask_status : pictureBody.courseTaskStatus,
              courseTask_number : pictureBody.courseNum,
              courseTask_seq : pictureBody.courseTaskSeq,
              activity_fromcourseid : pictureBody.courseTaskPictureIntro,
              courseTask_fromcoursesetid :pictureBody.courseId,

          // activityText_createduserid : pictureBody.activityText_createduserid,
          // activityText_finishdetail : pictureBody.activityText_finishdetail,
          // activityText_finishtype : pictureBody.activityText_finishtype,
          // activityText_migratelessonid : pictureBody.activityText_migratelessonid,
          // activity_content : pictureBody.
          // activity_copyid
          // activity_endtime
          // activity_fromcourseid
          // activity_fromcoursesetid
          // activity_fromuserid
          // activity_length
          // activity_mediatype
          // activity_migratelessonid
          // activity_remark
          // activity_starttime
          // activity_title
          // courseChapter_copyid
          // courseChapter_courseid
          // courseChapter_mgratecopytaskid
          // courseChapter_migratecopycourseid
          // courseChapter_migratelessonid
          // courseChapter_migratereftaskid
          // courseChapter_number
          // courseChapter_seq
          // courseChapter_title
          // courseChapter_type
          // courseTask_copyid
          // courseTask_courseid
          // courseTask_createduserid
          // courseTask_endtime
          // courseTask_fromcoursesetid
          // courseTask_isfree
          // courseTask_isoptional
          // courseTask_length
          // courseTask_maxonlinenum
          // courseTask_mediasource
          // courseTask_migratelessonid
          // courseTask_mode
          // courseTask_number
          // courseTask_seq
          // courseTask_starttime
          // courseTask_status
          // courseTask_title
          // courseTask_type


        })

  }

//新增任务（视频），需要插入五张表
  createTask_Video(
    courseTask_title: string,courseTask_type: string,
    courseTask_status: string ,courseTask_fromcoursesetid:number,
    courseTask_number : string,courseTask_seq : number,
    courseTask_courseid : number,
  ):Observable<any>{
    const api = `/course/createTask_Video`;
    return  this._http.post(api,{
      courseTask_title : courseTask_title,courseTask_type : courseTask_type,
      courseTask_status :courseTask_status,courseTask_fromcoursesetid :courseTask_fromcoursesetid,
      courseTask_number :courseTask_number,courseTask_seq :courseTask_seq,
      courseTask_courseid :courseTask_courseid,
    })
  }
//删除章/节，在删除章节后排序更改，使用sort进行排序
  deleteChapter(id:number):Observable<any>{
    return this._http.delete(`/course/deleteChapter?id=${id}`)
  }
  //删除任务，删除后调用sort方法重新排序
  deleteTask(courseChapterId:number):Observable<any>{
    return this._http.delete(`/course/deleteTask?courseChapterId=${courseChapterId}`)
  }
  //更新章/节标题
    editChapter(id:number , title: string): Observable<any> {
    return this._http.put(`/course/editChapter?chapterId=${id}&chapterTitle=${title}`,{})
  }
  //编辑任务（作业），调用sort排序
  editTask_Homework(contentBody:any):Observable<any>{
    const api = `/course/editTask_Homework`;
    return this._http.post(api,{
      activity_title: contentBody.activity_title, adtivity_id: contentBody.adtivity_id, courseChapter_id:	contentBody.courseChapter_id,
      courseChapter_title:	contentBody.courseChapter_title, courseTask_id:	contentBody.courseTask_id, courseTask_isOptional:	contentBody.courseTask_isOptional,
      courseTask_status:	contentBody.courseTask_status, courseTask_title:	contentBody.courseTask_title, testpaperV8_description:	contentBody.testpaperV8_description,
      testpaperV8_id:	contentBody.testpaperV8_id, testpaperV8_name:	contentBody.testpaperV8_name,
    })
  }
  //编辑任务（考试），调用sort排序
  editTask_Testpaper(contentBody:any):Observable<any>{
    const api = `/course/editTask_Testpaper`;
    return this._http.post(api,{
      activityTestpaper_dotimes: contentBody.activityTestpaper_dotimes, activityTestpaper_finishCondition: contentBody.activityTestpaper_finishCondition, activityTestpaper_id:	contentBody.activityTestpaper_id,
      activityTestpaper_limitedtime:	contentBody.activityTestpaper_limitedtime, activityTestpaper_mediaid:	contentBody.activityTestpaper_mediaid, activityTestpaper_redointerval:	contentBody.activityTestpaper_redointerval,
      activityTestpaper_testmode:	contentBody.activityTestpaper_testmode, activity_content:	contentBody.activity_content, activity_starttime:	contentBody.activity_starttime,
      activity_title:	contentBody.activity_title, adtivity_id:	contentBody.adtivity_id,adtivity_length:	contentBody.adtivity_length,
      courseChapter_id:	contentBody.courseChapter_id,courseChapter_title:	contentBody.courseChapter_title,courseTask_id:	contentBody.courseTask_id,
      courseTask_isOptional:	contentBody.courseTask_isOptional,courseTask_length:	contentBody.courseTask_length,courseTask_starttime:	contentBody.courseTask_starttime,
      courseTask_status:	contentBody.courseTask_status,courseTask_title:	contentBody.courseTask_title,
    })
  }
  //编辑任务（图文），调用sort排序
  editTask_Text(contentBody:any):Observable<any>{
    const api = `/course/editTask_Text`;
    return this._http.post(api,{
      activityText_finishdetail: contentBody.activityText_finishdetail, activityText_id: contentBody.activityText_id, activity_content:	contentBody.activity_content,
      activity_title:	contentBody.activity_title, adtivity_id:	contentBody.adtivity_id, courseChapter_id:	contentBody.courseChapter_id,
      courseChapter_title:	contentBody.courseChapter_title, courseTask_id:	contentBody.courseTask_id, courseTask_isOptional:	contentBody.courseTask_isOptional,
      courseTask_status:	contentBody.courseTask_status, courseTask_title:	contentBody.courseTask_title,
    })
  }
  //编辑任务（视频），调用sort排序
  editTask_Video(contentBody:any):Observable<any>{
    const api = `/course/editTask_Video`;
    return this._http.post(api,{
      activityVideo_finishdetail: contentBody.activityVideo_finishdetail, activityVideo_finishtype: contentBody.activityVideo_finishtype, activityVideo_id:	contentBody.activityVideo_id,
      activityVideo_mediaId:	contentBody.activityVideo_mediaId, activity_title:	contentBody.activity_title, adtivity_id:	contentBody.adtivity_id,
      courseChapter_id:	contentBody.courseChapter_id, courseChapter_title:	contentBody.courseChapter_title, courseMaterialV8_fileid:	contentBody.courseMaterialV8_fileid,
      courseMaterialV8_filesize:	contentBody.courseMaterialV8_filesize, courseMaterialV8_id:	contentBody.courseMaterialV8_id, courseMaterialV8_title:	contentBody.courseMaterialV8_title,
      courseTask_id:	contentBody.courseTask_id, courseTask_isOptional:	contentBody.courseTask_isOptional, courseTask_status:	contentBody.courseTask_status,
      courseTask_title:	contentBody.courseTask_title,
    })
  }
  //获取任务详情，传入courseTask.id,不区分任务和子任务
  getTaskDetail(courseid:string,taskid: string,userid:string): Observable<any> {
    return this._http.get(`/course/getTaskDetail?courseId=${courseid}&taskId=${taskid}&userId=${userid}`)
  }
  //获取计划任务列表。
  listAll(courseId:number): Observable<any>{
      return  this._http.post(`/course/listAll?courseId=${courseId}`,{})
  }
  //发布任务
  publishTask(courseChapterId:number):Observable<any>{
    return this._http.put(`/course/publishTask?courseChapterId=${courseChapterId}`,{})
  }
  //任务、章节、增删改查后均需要用次排序方法对数据库更新排序
  sort(sortList:Array<any>):Observable<any>{
    return this._http.put(`/course/sort?sortList=${sortList}`,{})
  }
  //取消发布任务
  unpublishTask(courseChapterId:number ):Observable<any>{
    return this._http.put(`/course/unpublishTask?courseChapterId=${courseChapterId}`,{})
  }

}
