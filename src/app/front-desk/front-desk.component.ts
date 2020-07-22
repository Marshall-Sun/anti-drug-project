import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { LoginModalComponent } from "../core/modal/login-modal/login-modal.component";
import { RegisterModalComponent } from "../core/modal/register-modal/register-modal.component";
import { AuthService } from "./auth/auth.service";
import { WebsitesAnnouncementService } from '../service/websites-announcement/websites-announcement.service';

@Component({
  selector: "app-front-desk",
  templateUrl: "./front-desk.component.html",
  styleUrls: ["./front-desk.component.less"],
})
export class FrontDeskComponent implements OnInit {
  isLogin: boolean = typeof window.localStorage.getItem("id") == "string";
  isCollapsed: boolean = true;
  userId: string = '1';

  // 搜索框输入值
  keyword: string;

  announcementList = [];

  isHide: boolean = true;
  isShow: boolean = false;

  constructor(
    private router: Router,
    private _modalService: NzModalService,
    private msg: NzMessageService,
    private authService: AuthService,
    private websiteAnnoucementService$: WebsitesAnnouncementService
  ) { }

  ngOnInit() {
    if (this.isLogin) {
      this.checkLoginStatus();
    }
    this.getNewAnnouncement();
    this.search();
  }

  checkLoginStatus() {
    const expireTime =
      (parseInt(window.localStorage.getItem("exp")) +
        parseInt(window.localStorage.getItem("expires_in"))) *
      1000;
    const expireDate = new Date(expireTime);
    const now = new Date();

    if (expireDate.getTime() < now.getTime()) {
      window.localStorage.clear();
      this.isLogin = false;
    }
  }

  checkIdentity(identity: string): boolean {
    return this.authService.userIdentityChecker(identity);
  }

  login() {
    const modal = this._modalService.create({
      nzTitle: "登录",
      nzContent: LoginModalComponent,
      nzFooter: null,
      nzOnOk: () => {
        this.isLogin = typeof window.localStorage.getItem("id") == "string";
      },
    });
  }

  register() {
    const modal = this._modalService.create({
      nzTitle: "注册",
      nzContent: RegisterModalComponent,
      nzFooter: null,
    });
  }

  logout() {
    if (window.localStorage.getItem("id")) {
      window.localStorage.clear();
      this.isLogin = false;
      this.navigateByUrl("/client");
      this.msg.success("注销成功");
    }
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  onResize() {
    if (!this.isCollapsed) {
      this.isCollapsed = true;
    }
  }

  getNewAnnouncement() {
    this.websiteAnnoucementService$.getActiveAnnoucement().subscribe(result => {
      this.announcementList = result.data;
      this.isHide = this.announcementList.length <= 0;
    })
  }


  cancel() {
    this.isShow = false;
    this.isHide = true;
  }

  close() {
    this.isShow = false;
  }

  search() {
    console.log('搜索内容: ', this.keyword);
    if ( this.keyword === '' || this.keyword == null) {
      // alert('请输入关键词');
      return false;
    } else {
      this.router.navigateByUrl('/client/searchcourse?keyword=' + this.keyword);
    }
  }
}
