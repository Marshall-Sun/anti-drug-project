import { Injectable } from "@angular/core";
import { MyteachingService } from "src/app/service/admin-review/myteaching/myteaching.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private myteachingService: MyteachingService,
    private http: HttpClient
  ) {}

  userLoginChecker(): boolean {
    return typeof window.localStorage.getItem("id") == "string";
  }

  userIdentityChecker(identity: string): boolean {
    let localIdentities = window.localStorage.getItem("authorities");
    return localIdentities ? localIdentities.indexOf(identity) != -1 : false;
  }

  async userInGroupChecker(groupId: string): Promise<boolean> {
    let userId = window.localStorage.getItem("id");
    if (userId) {
      let res: any = await this.myteachingService
        .getMyJoinGroup(parseInt(userId))
        .toPromise();
      for (const groupItem of res.data) {
        if (groupItem.id == groupId) {
          return true;
        }
      }
    }
    return false;
  }

  async userOwnGroupChecker(groupId: string): Promise<boolean> {
    let userId = window.localStorage.getItem("id");
    if (userId) {
      let res: any = await this.myteachingService
        .getMyOwnGroup(parseInt(userId))
        .toPromise();
      for (const groupItem of res.data) {
        if (groupItem.id == groupId) {
          return true;
        }
      }
    }
    return false;
  }

  async teacherOwnClassChecker(id: string): Promise<boolean> {
    let userId = window.localStorage.getItem("id");
    if (userId) {
      let res: any = await this.http
      .get(`/user/getHeadTeacherClassroomId?userId=${userId}`).toPromise();
      for (const classId of res.data) {
        if (classId == id) {
          return true;
        }
      }
    }
    return false;
  }

  // 班级
  classClosedChecker(classId: string) {
    return this.http
    .get(`/system/status/isClassDraftOrClosed?classId=${classId}`);
  }

  // 公开课
  openCourseClosedChecker(openCourseId: string) {
    return this.http
    .get(`/system/status/isOpenCourseDraftOrClosed?openCourseId=${openCourseId}`);
  }

  // 普通课程
  courseClosedChecker(courseId: string) {
    return this.http
    .get(`/system/status/isCourseDraftOrClosed?courseSetId=${courseId}`);
  }
  
  // 小组
  groupClosedChecker(groupId: string) {
    return this.http
    .get(`/system/status/isGroupClose?groupId=${groupId}`);
  }

  // 小组话题
  groupThreadClosedChecker(groupThreadId: string) {
    return this.http
    .get(`/system/status/isGroupThreadClose?groupTopicId=${groupThreadId}`);
  }

  // 新闻资讯
  newsClosedChecker(newsId: string) {
    return this.http
    .get(`/system/status/isInfoUnpublishedOrTrash?articleId=${newsId}`);
  }
}
