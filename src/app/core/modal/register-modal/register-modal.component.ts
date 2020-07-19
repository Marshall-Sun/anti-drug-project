import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginRegisterService } from 'src/app/service/login-register/login-register.service';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.less']
})
export class RegisterModalComponent implements OnInit {
  isOkLoading = false;
  registerForm: FormGroup;
  dataRegister: any = {}

  constructor(
    private fb: FormBuilder,
    private registerService: LoginRegisterService,
    private msg: NzMessageService,
    private modal: NzModalRef
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: [null, [Validators.required], [this.usernameValidator()]],
      email: [null, [Validators.email, Validators.required]],
      phoneNumber: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.passwordValidator]],
      agree: [false]
    })
  }

  submitRegisterForm() {
    if (this.registerForm.valid) {
      this.isOkLoading = true;
      this.registerService.postRegister(
        this.registerForm.value.username,
        this.registerForm.value.email,
        this.registerForm.value.phoneNumber,
        this.registerForm.value.password
      ).subscribe(
        () => { }, error => {
          this.isOkLoading = false;
          this.dataRegister = error.error;
          if (this.dataRegister.text == "用户名已存在") {
            this.registerForm.controls.username.setErrors({ 'confirm': true });
          } else if (this.dataRegister.text == "邮箱已被注册") {
            this.registerForm.controls.email.setErrors({ 'confirm': true });
          } else if (this.dataRegister.text == "注册成功") {
            this.msg.success('注册成功');
            this.modal.destroy();
          } else {
            this.msg.error("注册失败");
            console.log('error', error);
          }
        }
      );
    }
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.registerForm.controls.checkPassword.updateValueAndValidity());
  }

  passwordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  usernameValidator() {
    return (control: FormControl): any => {
      return control.valueChanges.pipe(
        debounceTime(500),
        switchMap(() => this.registerService.checkUsername(control.value)),
        map(res => res == 200 ? null : { confirm: true, error: true }),
        first()
      );
    }
  };

}
