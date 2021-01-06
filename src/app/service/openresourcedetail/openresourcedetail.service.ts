import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenresourcedetailService {

  constructor(private http: HttpClient) { }

  getInfo(courseId, userId) {
    return this.http.get(`/course/open/Info?openCourseID=${courseId}&userId=${userId}`).toPromise();
  }

  getOpenCourseOwner(courseId) {
    return this.http.get(`/course/open/getOpenCourseOwner?openCourseId=${courseId}`).toPromise();
  }

  getLesson(courseId) {
    return this.http.get(`/course/open/getOpenCourseLessonById?openCourseId=${courseId}`).toPromise();
  }

  getVideoUrl(lessonId) {
    return this.http.get(`/course/open/getVideoUrl?openCourseLessonId=${lessonId}`).toPromise();
  }

  
  setLikeNum(courseId:number){
    return this.http.put(`/course/open/like?openCourseId=${courseId}`,{});
  }
  collectCourse(userId, openCourseId){
    return this.http.post(`/course/open/favourite?openCourseID=${openCourseId}&userId=${userId}`,{})
  }
  disCollectCourse(userId, openCourseId){
    return this.http.delete(`/course/open/unfavourite?openCourseID=${openCourseId}&userId=${userId}`)
  }
}
