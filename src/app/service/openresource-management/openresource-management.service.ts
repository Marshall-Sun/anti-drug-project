import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OpenresourceManagementService {
  constructor(private http: HttpClient) {}

  getOpenCourseById(courseId: any) {
    return this.http.get(`course/open/getOpenCourseById?openCourseId=${courseId}`).toPromise();
  }

  getOpenCourseTeacherList(courseId: any) {
    return this.http.get(`course/open/getOpenCourseTeacherList?openCourseId=${courseId}`).toPromise();
  }
}
