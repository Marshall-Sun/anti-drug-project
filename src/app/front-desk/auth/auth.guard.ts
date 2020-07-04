import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private msg: NzMessageService,
    private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let url: string = state.url;
    console.log(url);

    // 页面：创建小组，仅限管理员访问
    if (url == "/client/groupcreate") {
      return this.checkStatus(url, "SUPER_ADMIN");
    }

    // 页面：后台管理，仅限管理员访问
    if (url == "/admin") {
      return this.checkStatus(url, "SUPER_ADMIN");
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
      return this.checkStatus(url, "ROLE_TEACHER");
    }

    // 页面：创建小组话题，仅限小组成员访问
    if (url.indexOf("/groupthread/grouptopic") != -1) {
      let targetGroupId = url.split("/")[3];
      if (!this.authService.userInGroupChecker(targetGroupId)) {
        this.msg.error("您不在此小组内");
        return false;
      }
      return true;
    }
    return true;
  }

  checkStatus(url: string, identity = null): boolean {
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
