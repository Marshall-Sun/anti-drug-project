import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { AuthService } from "./auth.service";
import { NewsService } from "src/app/service/news/news.service";
import { UserManagementService } from "src/app/service/user-management/user-management.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private msg: NzMessageService,
    private authService: AuthService,
    private newsService: NewsService,
    private userManagementService: UserManagementService
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let url: string = state.url;
    let canActivate: boolean = true;

    // 页面：创建小组，仅限管理员访问
    if (url == "/client/groupcreate") {
      canActivate = this.checkIdentity("SUPER_ADMIN");
    }

    // 页面：后台管理，仅限管理员访问
    if (url == "/admin") {
      canActivate = this.checkIdentity("SUPER_ADMIN");
    }

    // 页面：我的教学系列，限管理员、教师访问
    if (
      url == "/client/mine/teachingcourse" ||
      url == "/client/mine/createcourse" ||
      url == "/client/mine/teachingclass" ||
      url == "/client/mine/studentQA" ||
      url == "/client/mine/studenttopic" ||
      url == "/client/mine/papermarking" ||
      url == "/client/mine/teachingdatabase"
    ) {
      canActivate = this.checkIdentity("ROLE_TEACHER");
    }

    // 页面：课程详情系列，判断关闭状态
    if (url.indexOf("/courseinf") != -1) {
      let targetId = url.split("/")[3];
      let res: any = await this.authService.courseClosedChecker(targetId);
      if (res) {
        this.msg.error("课程未开放");
        canActivate = false;
      }
    }

    // 页面：公开课详情，判断关闭状态，需登录
    if (url.indexOf("/openresourcedetail") != -1) {
      if (!this.authService.userLoginChecker()) {
        this.msg.error("尚未登录");
        canActivate = false;
      } else {
        let targetId = url.split("/")[3];
        let res: any = await this.authService.openCourseClosedChecker(targetId);
        if (res) {
          this.msg.error("公开课未开放");
          canActivate = false;
        }
      }
    }

    // 页面：班级详情，判断关闭状态
    if (url.indexOf("/classinf") != -1) {
      let targetId = url.split("/")[3];
      let res: any = await this.authService.classClosedChecker(targetId);
      if (res) {
        this.msg.error("班级未开放");
        canActivate = false;
      }
    }

    // 页面：新闻资讯详情，判断关闭状态
    if (url.indexOf("/newsdetails") != -1) {
      let targetId = url.split("/")[3];
      let res: any = await this.authService.newsClosedChecker(targetId);
      if (res) {
        this.msg.error("资讯未开放");
        canActivate = false;
      }
    }

    // 页面：新闻标签，判断是否存在
    if (url.indexOf("/newstag") != -1) {
      let targetId = url.split("/")[3];
      try {
        let res: any = await this.newsService.getTagname(targetId).toPromise();
        canActivate = typeof res.data == "string";
      } catch (error) {
        this.msg.error("新闻标签不存在");
        canActivate = false;
      }
    }

    // 页面：用户界面，判断是否存在
    if (url.indexOf("/userpage") != -1) {
      let targetId = url.split("/")[3];
      try {
        let res: any = await this.userManagementService
          .getPersonalDetailById(targetId)
          .toPromise();
        canActivate = typeof res.data.id == "number";
      } catch (error) {
        this.msg.error("用户不存在");
        canActivate = false;
      }
    }

    // 页面：小组系列，判断关闭状态
    if (url.indexOf("/groupmainlist") != -1) {
      let targetUrl = url.split("/");
      if (parseInt(targetUrl[3]) > 0) {
        let res: any = await this.authService.groupClosedChecker(targetUrl[3]);
        if (res) {
          this.msg.error("小组未开放");
          canActivate = false;
        }
      }
    }

    // 页面：个人设置，需登录
    if (url.indexOf("/settings") != -1) {
      if (!this.authService.userLoginChecker()) {
        this.msg.error("尚未登录");
        canActivate = false;
      }
    }

    // 页面：小组话题系列，判断关闭状态
    if (canActivate && url.split("/")[4] == "groupthread") {
      let targetUrl = url.split("/");
      // 页面：创建、编辑小组话题，仅限小组成员访问
      if (
        url.indexOf("/grouptopic") != -1 ||
        url.indexOf("/groupthreadedit") != -1
      ) {
        let res: any = await this.authService.userInGroupChecker(targetUrl[3]);
        if (!res) {
          this.msg.error("您不在此小组内");
          canActivate = false;
        }
      } else if (parseInt(targetUrl[5]) > 0) {
        let res: any = await this.authService.groupThreadClosedChecker(
          targetUrl[5]
        );
        if (res) {
          this.msg.error("小组话题未开放");
          canActivate = false;
        }
      }
    }

    if (!canActivate && this.router.url == "/") {
      this.router.navigate(["404"], { skipLocationChange: true });
    }

    return canActivate;
  }

  checkIdentity(identity): boolean {
    if (!this.authService.userLoginChecker()) {
      this.msg.error("尚未登录");
      return false;
    }
    if (!this.authService.userIdentityChecker(identity)) {
      this.msg.error("权限不足");
      return false;
    }
    return true;
  }
}
