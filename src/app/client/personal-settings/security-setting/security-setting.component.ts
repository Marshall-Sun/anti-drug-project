import { Component, OnInit } from '@angular/core';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import { LoginPasswdEditModelComponent } from '../../../core/modal/login-passwd-edit-model/login-passwd-edit-model.component';
import { SecurityProblemEditModalComponent } from '../../../core/modal/security-problem-edit-modal/security-problem-edit-modal.component';
import { LoginModalComponent } from '../../../core/modal/login-modal/login-modal.component';
import { UserManagementService } from "src/app/service/user-management/user-management.service";
import {VerificationService} from '../../../service/verification/verification.service';

@Component({
  selector: 'app-security-setting',
  templateUrl: './security-setting.component.html',
  styleUrls: ['./security-setting.component.less']
})
export class SecuritySettingComponent implements OnInit {
  userID:string = window.localStorage.getItem("id");
  SecureLevel:any ={
    level : "安全等级:中",
    alertType : "warning",
    secureDescription : "可以进一步设置"
  };
  SecureQuestionStatus:any ={
    securityProblemClass : "not-setup",
    securityProblemIcon : "exclamation-circle",
    isSecurityProblemSetted : "未设置",
  };

  list: any[] = [
    { title: '登录密码', description: '经常修改密码有著有保护您的账号安全', setup: true, avatar: { type: 'lock', theme: 'outline' }, type: 'login' },
    { title: '安全问题', description: '设置安全问题，保护帐号密码安全，也可用于找回支付密码', setup: false, avatar: { type: 'safety', theme: 'outline' }, type: 'security' },
  ];

  loading: boolean = false;


  constructor(
    private _modalService: NzModalService,
    private userManagementService: UserManagementService,
    private _nzNotificationService: NzNotificationService,
  ) { }

  ngOnInit() {
    // this.userID = "1";
    this.userManagementService.getSecureQuestionStatus(this.userID).subscribe(result => {
      console.log(result.data);
      if(result.data == "已设置安全问题"){
        this.SecureQuestionStatus.securityProblemClass = "is-setup";
        this.SecureQuestionStatus.securityProblemIcon = "check-circle";
        this.SecureQuestionStatus.isSecurityProblemSetted = "已设置";
        this.SecureLevel.alertType = "success";
        this.SecureLevel.level = "安全等级:高";
        this.SecureLevel.secureDescription = "";
      }
    })
  }

  edit(command) {
    if (command == 'login') { this.editLoginPasswd() }
    else if (command == 'security') { this.editSecurityProblem() }
  }

  editLoginPasswd() {
    const modal = this._modalService.create({
      nzTitle: '密码修改',
      nzContent: LoginPasswdEditModelComponent,
      nzFooter: null
    })
  }

  editSecurityProblem() {
    if(this.SecureQuestionStatus.isSecurityProblemSetted == "已设置"){
      this._nzNotificationService.create('error', '安全问题不可重复设置!', ``);
      return;
    }
    const modal = this._modalService.create({
      nzTitle: '安全问题',
      nzContent: SecurityProblemEditModalComponent,
      nzFooter: null,
      nzWidth: 350
    })
  }


}
