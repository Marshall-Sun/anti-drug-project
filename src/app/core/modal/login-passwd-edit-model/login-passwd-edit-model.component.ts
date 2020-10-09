import { Component, OnInit } from "@angular/core";
import {FormBuilder,FormControl,FormGroup,Validators} from "@angular/forms";
import {PersonInfoEditService} from '../../../service/person-info-edit/person-info-edit.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {UserManagementService} from '../../../service/user-management/user-management.service';
@Component({
  selector: "app-login-passwd-edit-model",
  templateUrl: "./login-passwd-edit-model.component.html",
  styleUrls: ["./login-passwd-edit-model.component.less"]
})
export class LoginPasswdEditModelComponent implements OnInit {
  userID:string = window.localStorage.getItem("id");
  password: any = {
    id: 0,
    currentPasswd:"",
    newPasswd:""
  };
  passwdEditForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private personInfoEditService: PersonInfoEditService,
    private passwordEditService:UserManagementService,
    private notification: NzNotificationService,
  ) { }

  editPasswd() {
    this.password.id = this.userID;
    // console.log( this.password.id);
    // console.log(this.passwdEditForm.value.currentPasswd);
    // console.log(this.passwdEditForm.value.newPasswd);
    this.passwordEditService.updateNewPassword(this.passwdEditForm.value.newPasswd, this.passwdEditForm.value.currentPasswd,
      this.password.id).subscribe(result => {
       if(result.code==400){
         this.notification.error('修改失败', '');
       }else{
         this.notification.success('修改成功', '');
       }
    })
  }

  ngOnInit() {
    this.passwdEditForm = this.formBuilder.group({
      currentPasswd: [null, [Validators.required]],
      newPasswd: [null, [Validators.required]],
      newPasswdAgain: [null, [Validators.required, this.confirmmationValidator]]
    });
    this.personInfoEditService.getPersonDetail(1).subscribe(result => {
      let data = result.data;
      this.password.id = data.id;
      //this.password.id = 2;
    })

  }

  updateConfirmValidator() {
    Promise.resolve().then(() =>
      this.passwdEditForm.controls.newPasswdAgain.updateValueAndValidity()
    );
  }

  confirmmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.passwdEditForm.controls.newPasswd.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  doEdit() {
    for (const i in this.passwdEditForm.controls) {
      this.passwdEditForm.controls[i].markAsDirty();
      this.passwdEditForm.controls[i].updateValueAndValidity();
    }
  }
}
