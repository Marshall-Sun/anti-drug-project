import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {UserManagementService} from '../../../service/user-management/user-management.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.less']
})
export class CreateUserModalComponent implements OnInit {

  userCreatingForm: FormGroup;

  checkOption = [];
  constructor(
    private fb: FormBuilder,
    private userManagementService$: UserManagementService,
    private _message: NzMessageService
  ) { }

  ngOnInit() {
    this.userCreatingForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, this.confirmationValidator]]
    });
    this.userManagementService$.getAllUserRoles().subscribe( result => {
      result.data.forEach(item => {
        this.checkOption.push({
          label: item.name,
          value: item.code,
        })
      });
    })
  }

  submit(): boolean {
    let shouldBeClosed = false;
    this.userCreatingForm.markAllAsTouched();
    this.userCreatingForm.controls.username.updateValueAndValidity();
    this.userCreatingForm.controls.password.updateValueAndValidity();
    this.userCreatingForm.controls.confirmPassword.updateValueAndValidity();
    let username = this.userCreatingForm.controls.username.value;
    let flag = false;
    let roleString = '|';
    let updateRoleList = [];
    this.checkOption.forEach(item => {
      if (item.checked) {
        flag = true;
        roleString = roleString + item.value + '|';
        updateRoleList.push(item.value)
      }
    });
    if (flag && !this.userCreatingForm.errors && username !== '') {
      this.userManagementService$.createNewUser(this.userCreatingForm.controls.username.value, this.userCreatingForm.controls.password.value, updateRoleList).subscribe(result => {
        shouldBeClosed = true;
        this._message.success("新增用户成功！");
      }, error1 => {
        this._message.error(error1.error);
        shouldBeClosed = false;
      })

    }
    return shouldBeClosed
  }

  cancel() {

  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.userCreatingForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.userCreatingForm.controls.confirmPassword.updateValueAndValidity());
  }

}
