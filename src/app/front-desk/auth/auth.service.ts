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

  // 班级
  async classClosedChecker(classId: string): Promise<boolean> {
    let res: any = await this.http
      .get(`/system/status/isClassDraftOrClosed?classId=${classId}`)
      .toPromise();
    return res.data;
  }

  // 公开课
  async openCourseClosedChecker(openCourseId: string): Promise<boolean> {
    let res: any = await this.http
      .get(`/system/status/isOpenCourseDraftOrClosed?openCourseId=${openCourseId}`)
      .toPromise();
    return res.data;
  }

  // 普通课程
  async courseClosedChecker(courseId: string): Promise<boolean> {
    let res: any = await this.http
      .get(`/system/status/isCourseDraftOrClosed?courseSetId=${courseId}`)
      .toPromise();
    return res.data;
  }
  
  // 小组
  async groupClosedChecker(groupId: string): Promise<boolean> {
    let res: any = await this.http
      .get(`/system/status/isGroupClose?groupId=${groupId}`)
      .toPromise();
    return res.data;
  }

  // 小组话题
  async groupThreadClosedChecker(groupThreadId: string): Promise<boolean> {
    let res: any = await this.http
      .get(`/system/status/isGroupThreadClose?groupTopicId=${groupThreadId}`)
      .toPromise();
    return res.data;
  }

  // 新闻资讯
  async newsClosedChecker(newsId: string): Promise<boolean> {
    let res: any = await this.http
      .get(`/system/status/isInfoUnpublishedOrTrash?articleId=${newsId}`)
      .toPromise();
    return res.data;
  }
}
