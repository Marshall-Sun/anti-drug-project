import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassInfService {

  constructor(private http: HttpClient) { }

  //New--------------------------------
  getClass(id: string) {
    const uri = `/classroom/explore/${id}`;
    return this.http.get(uri);//.pipe(map(data => data.classes));
  }

  getUser(id: string) {
    const uri = `http://localhost:3000/user/${id}`;
    return this.http.get(uri);
  }
  getstudents(id: string) {//获取的事班级学生列表
    const params = new HttpParams()
      .set('pageNum', "1")
      .set('pageSize', "12")
    const uri = `/classroom/management/get_students/${id}`;
    return this.http.get(uri, { params });
  }

  getclassIntroduce(id: string) {
    const params = new HttpParams()
      .set('classroomId', id)
    const uri = `/classroom/classIntroduction`;
    return this.http.get(uri, { params });
  }

  getclassCourses(id: string, page: number,pageSize:number) {
    const params = new HttpParams()
      .set('orderBy', "createdTime DESC")
      .set('pageNum', page.toString())
      .set('pageSize', pageSize.toString())
    const uri = `
        /classroom/management/get_courses/${id}`;
    return this.http.get(uri, { params });
  }

  getclassTeachers(id: string, page: number,pageSize:number) {
    const params = new HttpParams()
      .set('classroomId', `${id}`)
      .set('pageNum', page.toString())
      .set('isClosed', pageSize.toString())
    const uri = `/classroom/getClassroonTeacher`;
    return this.http.get(uri, { params });
  }

  getclassTopics(id: string,pageSize:number, nice: string = "0", orderBy: string = "createdTime", page: number = 1) {
    const params = new HttpParams()
      .set('classroomId', `${id}`)
      .set('nice', `${nice}`)
      .set('orderBy', `${orderBy}`)
      .set('pageNum', page.toString())
      .set('pageSize', pageSize.toString())
      .set('type', `classroom`)
    const uri = `/classroom/getClassroomThread`;
    return this.http.get(uri, { params });
  }

  getclassNotes(id: string,pageSize:number, courseid: string = "", orderBy: string = "createdTime") {
    const params = new HttpParams()
      .set('classroomId', id)
      .set('courseId', courseid)
      .set('orderBy', orderBy)
      .set('pageNum', '1')
      .set('pageSize', pageSize.toString())
    const uri = `/classroom/getClassroomNote`;
    return this.http.get(uri, { params });
  }

  getclassComments(id: string, page: number,pageSize:number) {
    const params = new HttpParams()
      .set('classroomId', `${id}`)
      .set('pageNum', page.toString())
      .set('pageSize', pageSize.toString())
    const uri = `/classroom/getClassroomReview`;
    return this.http.get(uri, { params });
  }

  getclassHeadmaster(id: string) {
    const params = new HttpParams()
      .set('classroomId', `${id}`)
    const uri = `/classroom/management/getClassroomHeadTeacher`;
    return this.http.get(uri, { params });
  }

  getclassstdDynamic(id: string) {
    const params = new HttpParams()
      .set('pageNum', `1`)
      .set('pageSize', `5`)
    const uri = `/classroom/management/activity/${id}`;
    return this.http.get(uri, { params });
  }

  // getclassNotices(id: string) {
  //     const uri = `http://localhost:3000/Notices`;
  //     return this.http.get(uri);
  // }

  getTopicResponses(topicid: string, posterType: string = "All") {
    const params = new HttpParams()
      .set('posterType', posterType)
      .set('threadId', topicid)
    const uri = `/classroom/getClassroomThreadPost`;
    return this.http.get(uri, { params });
  }



  //信息提交
  topic_submit(classroomId: string, content: string, title: string, userId: string) {
    const uri = `/classroom/setClassroomThread`;
    return this.http.post(uri,
      {
        classroomId: classroomId,
        content: content,
        createdTime: 0,
        delete: 0,
        nice: 0,
        sticky: 0,
        threadId: 0,
        title: title,
        type: "话题",
        userId: userId
      });
  }

  questoin_submit(classroomId: string, content: string, title: string, userId: string) {
    const uri = `/classroom/setClassroomThread`;
    return this.http.post(uri,
      {
        classroomId: classroomId,
        content: content,
        createdTime: 0,
        delete: 0,
        nice: 0,
        sticky: 0,
        threadId: 0,
        title: title,
        type: "问题",
        userId: userId
      });
  }


  question_response_submit(classroomId: string, threadid:string,parentId: string, content: string,userId:string) {
    const uri = `/classroom/setClassroomThreadPost`;
    return this.http.post(uri,
      {
        classroomId: classroomId,
        content: content,
        createdTime: 0,
        parentId: parentId,
        threadId: threadid,
        threadPostId: parentId,
        userId: userId,
      });
  }

  response_submit() {

  }

  comment_submit(classroomId: string, parentId: string, content: string, title: string, rate: number, userId: string) {
    const uri = `/classroom/setClassroomReview`;
    return this.http.post(uri,
      {
        classroomId: classroomId,
        content: content,
        createdTime: 0,
        parentId: parentId,
        rating: rate,
        title: content,
        updateTime: 0,
        userId: userId
      });
  }

  comment_Response_submit(classroomId: string, parentId: string, content: string, title: string, rate: number, userId: string) {
    const uri = `/classroom/setClassroomReview`;
    return this.http.post(uri,
      {
        classroomId: classroomId,
        content: content,
        createdTime: 0,
        parentId: parentId,
        rating: rate,
        title: content,
        updateTime: 0,
        userId: userId
      });
  }

  notice_submit() {

  }

  //加入班级
  joinclass_submit(classroomid: string, userid: string) {
    const uri = `/classroom/management/add_student`;
    return this.http.post(uri,
      {
        classroomId: classroomid,
        deadline: 0,
        remark: 0,
        userId: userid,
      });
  }

  //退出学习
  exitlearn_submit(classroomid: string, userid: string) {
    const uri = `/classroom/management/delete_student/${classroomid}`;
    const params = new HttpParams()
      .set('id', classroomid)
      .set('studentId', userid)
    return this.http.delete(uri, { params })
  }



  //笔记点赞
  note_like(courseNoteid: string, courseNotelikeid: string,userId:string) {
    const uri = `/classroom/setClassroomNoteNice`;
    return this.http.post(uri, { courseNoteId: courseNoteid, courseNoteLikeId: courseNotelikeid, createdTime: 0, userId: userId, })
  }

  //取消关注
  delfollow_submit(userid: string, toid: string) {
    const uri = `/user/delFollowedUser`;
    return this.http.put(uri,
      {
        fromId: userid,
        toId: toid,
      });
  }

  //关注
  follow_submit(userid: string, toid: string) {
    const uri = `/user/followedUser`;
    return this.http.put(uri,
      {
        fromId: userid,
        toId: toid,
      });
  }


  //检查是否已经关注
  isfollowing(userid: string, toid: string){
    const uri = `/user/isFollowed`;
    const params = new HttpParams()
      .set('fellowId', toid)
      .set('userId', userid)
    return this.http.get(uri,{params});

  }

  //私信
  privateletter_submit(userid: string, toid: string, title: string, content: string) {
    const uri = `/user/sendMessage`;
    return this.http.put(uri,
      {
        content:content,
        createdTime: 0,
        createdTimeString: "string",
        fromId: userid,
        fromNickName: "string",
        fromSmallAvatar: "string",
        isRead: "string",
        messageConversationId: 0,
        messageId: 0,
        messageRelationId: 0,
        toId: toid,
        toNickName: "string",
        totalMessages: 0,
        totalNum: 0,
        type: "string"
      });
  }


  get_class_isJoin(userid: string,targetid: string) {
    const uri = `/user/getIsJoin`;
    return this.http.post(uri,
      {
        classificationname: "classroom",
        targetId: targetid,
        userId: userid
      });
  }
}
