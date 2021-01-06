import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenresourcedetailService {
  constructor(private http: HttpClient) { }

  updateHit(courseId) {
    return this.http.post(`/course/open/hit?openCourseId=${courseId}`, {}).toPromise();
  }

  joinOpenCourseWithLogin(courseId, userId) {
    return this.http.post(`/course/open/joinOpenCourseWithLogin?openCourseId=${courseId}&userId=${userId}`, {}).toPromise();
  }

  joinOpenCourseWithoutLogin(courseId) {
    return this.http.post(`/course/open/joinOpenCourseWithLogin?openCourseId=${courseId}`, {}).toPromise();
  }

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

  getRecommendCourse(courseId) {
    return this.http.get(`/course/open/getRecommendCourse?openCourseId=${courseId}`).toPromise();
  }

  setLikeNum(courseId) {
    return this.http.put(`/course/open/like?openCourseId=${courseId}`, {}).toPromise();
  }
  
  collectCourse(courseId, userId) {
    return this.http.post(`/course/open/favourite?openCourseId=${courseId}&userId=${userId}`,{}).toPromise();
  }

  disCollectCourse(courseId, userId) {
    return this.http.post(`/course/open/favourite?openCourseId=${courseId}&userId=${userId}`,{}).toPromise();
  }
}
