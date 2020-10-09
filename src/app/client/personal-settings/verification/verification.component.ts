import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, UploadXHRArgs, NzNotificationService } from 'ng-zorro-antd';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { VerificationService } from 'src/app/service/verification/verification.service';
import {PersonInfoEditService} from '../../../service/person-info-edit/person-info-edit.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.less']
})
export class VerificationComponent implements OnInit {
  userID:string;
  verifiedName: string = "";
  identityCardNumber: string = "";
  nameNonEditable: boolean = false;
  validateForm: FormGroup;
  faceimg: string;
  backimg: string;
  verificationStatus = {
    nzType:"warning",
    nzMessage:"提示",
    nzDescription:'为保护您的帐号安全、获得更好的服务，请尽快完成实名认证。',
  }
  constructor(
    private _nzNotificationService: NzNotificationService,
    private _verificationService: VerificationService,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private http: HttpClient) { }

  ngOnInit() {
    this.userID = window.localStorage.getItem('id');
    this.validateForm = this.fb.group({
      trueName: [null, [Validators.required, Validators.pattern(/^[\u4E00-\u9FA5]{1,5}$/)]],
      id: [null, [Validators.required, Validators.pattern(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)]],
      userid: [this.userID, [Validators.nullValidator]],
      backimg: [null, [Validators.required]],
      faceimg: [null, [Validators.required]],
    });
    this.validateForm.value.userid = this.userID;
    // this.validateForm.value.userid = '16';//认证成功
    // this.validateForm.value.userid = '2';//认证失败
    this._verificationService.getUserVerificationStatus(this.validateForm.value.userid).subscribe(result => {
      console.log(result);
      if(result.data.状态 == "认证中"){
        this.verificationStatus.nzDescription = '认证中';
        this.verificationStatus.nzMessage = "申请已提交，请耐心等待审核结果";
        this.verifiedName = result.data.真实姓名;
        this.identityCardNumber = result.data.身份证号;
        this.nameNonEditable = true;
      }
      if(result.data.状态 == "认证成功"){
        this.verificationStatus.nzType = "success";
        this.verificationStatus.nzMessage = "";
        this.verificationStatus.nzDescription = '认证成功';
        this.verifiedName = result.data.真实姓名;
        this.nameNonEditable = true;
      }
      if(result.data.状态 == "认证失败"){
        this.verificationStatus.nzType = "error";
        this.verificationStatus.nzMessage = "认证失败";
        this.verificationStatus.nzDescription = '失败原因: '+result.data.失败原因;
      }
    })
  }

  submitForm(): void {
    if(this.verifiedName != ""){
      this._nzNotificationService.create('error', '不可重复认证!', ``);
      return;
    }
    let check: boolean = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      if (this.validateForm.controls[i].hasError('required') || this.validateForm.controls[i].hasError('pattern')) {
        check = false;
      }
    }
    if (check) {
      this.validateForm.value.userid = this.userID;
      this._verificationService.setUserApproval(
        this.validateForm.value.backimg,
        this.validateForm.value.faceimg,
        this.validateForm.value.id,
        this.validateForm.value.trueName,
        this.validateForm.value.userid).subscribe(result => {
        this._nzNotificationService.create('success', '提交成功!', ``);
        this.verificationStatus.nzDescription = '认证中';
        this.verificationStatus.nzMessage = "申请已提交，请耐心等待审核结果";
        this.nameNonEditable = true;
        this.verifiedName = this.validateForm.value.trueName;
        this.identityCardNumber = this.validateForm.value.id;
      }, err => {
        this._nzNotificationService.create('error', '提交失败!', ``);
      })
    }
  }


  backimgReq = (item: UploadXHRArgs) => {
    const formData = new FormData();
    formData.append('file', item.file as any);
    return this.http.post(item.action, formData).subscribe(
      (event: any) => {
        if (event.message === 'SUCCESS') {
          item.onSuccess!(event.body, item.file!, event);
          this.validateForm.patchValue({ backimg: event.data });
          this.backimg = event.data
          console.log(this.backimg);
          this.msg.success('上传成功!')
        } else if (event instanceof HttpResponse) {
        }
      },
      err => {
        item.onError!(err, item.file!);
        this.msg.error('上传失败!')
      }
    );
  };

  faceimgReq = (item: UploadXHRArgs) => {
    const formData = new FormData();
    formData.append('file', item.file as any);
    return this.http.post(item.action, formData).subscribe(
      (event: any) => {
        if (event.message === 'SUCCESS') {
          item.onSuccess!(event.body, item.file!, event);
          this.faceimg = event.data
          console.log(this.faceimg);
          this.validateForm.patchValue({ faceimg: event.data});
          this.msg.success('上传成功!')
        } else if (event instanceof HttpResponse) {
        }
      },
      err => {
        item.onError!(err, item.file!);
        this.msg.error('上传失败!')
      }
    );
  };
}
