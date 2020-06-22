import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { RegisterModalComponent } from "../register-modal/register-modal.component";
import { NzModalService, NzMessageService, NzModalRef } from "ng-zorro-antd";
import { LoginRegisterService } from "src/app/service/login-register/login-register.service";
import { UserManagementService } from "src/app/service/user-management/user-management.service";

@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.less"],
})
export class LoginModalComponent implements OnInit {
  isOkLoading = false;
  dataLogin: any = {};
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _modalService: NzModalService,
    private loginService: LoginRegisterService,
    private msg: NzMessageService,
    private userManagementService: UserManagementService,
    private modal: NzModalRef
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitLoginForm() {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    if (this.loginForm.valid) {
      this.isOkLoading = true;
      this.loginService
        .postLogin(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe(
          (res: any) => {
            //保存用户信息
            window.localStorage.setItem("id", res);
            this.userManagementService
              .getUserDetailById(res)
              .subscribe((data) => {
                for (let [key, value] of Object.entries(data.data)) {
                  window.localStorage.setItem(key + "", value + "");
                }
              });

            //确保用户名和密码正确再获取令牌
            this.loginService
              .getToken(
                this.loginForm.value.username,
                this.loginForm.value.password
              )
              .subscribe((token: any) => {
                window.localStorage.setItem("token", JSON.stringify(token));
                let expires_time =
                  Date.parse(new Date().toString()) + token.expires_in * 1000;
                window.localStorage.setItem(
                  "expires_time",
                  expires_time.toString()
                );
              });

            this.msg.success("登录成功");
            this.modal.triggerOk();
            this.modal.destroy();
          },
          (error) => {
            this.isOkLoading = false;
            this.dataLogin = error.error;
            if (this.dataLogin.text == "用户不存在") {
              this.loginForm.controls.username.setErrors({ confirm: true });
            } else if (this.dataLogin.text == "密码错误") {
              this.loginForm.controls.password.setErrors({ confirm: true });
            } else {
              console.log(error);
            }
          }
        );
    }
  }

  register() {
    const modal = this._modalService.create({
      nzTitle: "注册",
      nzContent: RegisterModalComponent,
      nzFooter: null,
    });
    this.modal.destroy();
  }
}
