import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class BackgroundHomePageService {
  constructor(private http: HttpClient) {}

  getOnlineUserNum() {
    return this.http.get(`/user/getOnlineUserNumAndNewUserNum`);
  }

  getNoPostQuestionNum() {
    return this.http.get(`/course/getNoPostQuestionsNum`);
  }

  getNewCourseStudentNum() {
    return this.http.get(`/course/plan/getNewAddCourseNum`);
  }

  getNewClassStudentNum() {
    return this.http.get(`/classroom/management/getnewAddClassStudentNum`);
  }

  getAllQuestionsNum() {
    return this.http.get(`/course/getAllQuestionsNum`);
  }

  getEverydayTaskResultNum() {
    return this.http.get(`/course/getEverydayTaskResultNum?days=30`);
  }

  getCourseRankings() {
    return this.http.get(`/course/getCourseRankings?days=30`);
  }
}
