import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class OpenresourceManagementService {
  constructor(private http: HttpClient) {}

  getOpenCourseById(courseId: any) {
    return this.http
      .get(`course/open/getOpenCourseById?openCourseId=${courseId}`)
      .toPromise();
  }

  getOpenCourseTeacherList(courseId: any) {
    return this.http
      .get(`course/open/getOpenCourseTeacherList?openCourseId=${courseId}`)
      .toPromise();
  }

  updateOpenCourse(data: {
    id: number;
    about: string;
    categoryId: number;
    title: string;
    subtitle: string;
    tagIdList: number[];
  }) {
    return this.http.put("/course/open/updateOpenCourseById", data).toPromise();
  }

  getOpenCourseFileList(courseId: any) {
    return this.http
      .get(`/course/open/getOpenCourseFileList?openCourseId=${courseId}`)
      .toPromise();
  }

  getCourseToRecommend(openCourseId, pageSize = null, pageNum = null, searchStr = "") {
    let etc = "";
    if (pageNum) etc += "&pageNum=" + pageNum;
    if (pageSize) etc += "&pageSize=" + pageSize;
    if (searchStr) etc += "&searchStr=" + searchStr;
    return this.http.get(`/course/open/getCourseToRecommend?openCourseId=${openCourseId}${etc}`).toPromise();
  }
}
