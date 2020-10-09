import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {UserManagementService} from '../../../service/user-management/user-management.service';
import {NzNotificationService} from 'ng-zorro-antd';
@Component({
  selector: "app-security-problem-edit-modal",
  templateUrl: "./security-problem-edit-modal.component.html",
  styleUrls: ["./security-problem-edit-modal.component.less"]
})
export class SecurityProblemEditModalComponent implements OnInit {

  today = new Date().getTime();
  securityEditForm: FormGroup;
  userID:string = window.localStorage.getItem("id");

  constructor(
    private formBuilder: FormBuilder,
    private secureQuestionEditService:UserManagementService,
    private _nzNotificationService: NzNotificationService,
  ) { }

  ngOnInit() {
    this.securityEditForm = this.formBuilder.group({
      problem: ["你的生日", [Validators.required]],
      answer: [null, [Validators.required]],
      userid: [1, [Validators.nullValidator]]
    })
  }


  doEdit() {
    for (const i in this.securityEditForm.controls) {
      this.securityEditForm.controls[i].markAsDirty();
      this.securityEditForm.controls[i].updateValueAndValidity();
    }
  }

  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return current.getTime() > this.today;
  };


  submitSecureQuestion() {
    if(this.securityEditForm.value.answer != null){
      this.securityEditForm.value.userid = this.userID;
      // console.log( this.securityEditForm.value.userid);
      this.secureQuestionEditService.setSecureQuestion(this.securityEditForm.value.problem,
        this.securityEditForm.value.answer, this.securityEditForm.value.userid).subscribe(result => {
        this._nzNotificationService.create('success', '提交成功!', ``);
      }, err => {
        this._nzNotificationService.create('error', '提交失败!', ``);
      })
    }else{
      this._nzNotificationService.create('error', '答案不能为空!', ``);
    }

  }
}
