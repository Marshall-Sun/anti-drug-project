import { Component, OnInit } from '@angular/core';
import { UserInfoEditModalComponent } from '../../../core/modal/user-info-edit-modal/user-info-edit-modal.component';
import { PersonInfoEditService } from '../../../service/person-info-edit/person-info-edit.service'
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UploadChangeParam, NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import { HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import {Validators} from '@angular/forms';
import {VerificationService} from '../../../service/verification/verification.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.less']
})
export class InformationComponent implements OnInit {
  userID:string = window.localStorage.getItem("id");
  nameNonEditable: string = "false";
  user: any = {
    about: "",
    company: "",
    fansNum: 0,
    followedNum: 0,
    gender: "",
    id: this.userID,
    job: "",
    mediumAvatar: null,
    nickName: "",
    qq: "",
    signature: "",
    site: "",
    title: "",
    trueName: "",
    weibo: "",
    weixin: ""
  };

  loading: boolean = false;

  introduction: string = '';
  constructor(
    private personInfoEditService: PersonInfoEditService,
    private notification: NzNotificationService,
    private _http: HttpClient,
    private msg: NzMessageService,
    private _verificationService: VerificationService,
  ) { }

  editPersonalInfo() {
    this.personInfoEditService.updateUserDetail(this.user).subscribe(result => {
      this.notification.success('修改成功', '');
    }, err => {
      this.notification.error('修改失败', '');
    })
    this.personInfoEditService.getPersonDetail(this.user.id).subscribe(result => {
      this.user.mediumAvatar = result.data.mediumAvatar;
    })
  }

  customReq = (item: UploadXHRArgs) => {
    this.loading = true;
    const formData = new FormData();
    formData.append('file', item.file as any);
    return this._http.post(item.action, formData).subscribe(
      (event: any) => {
        console.log(event);
        console.log(HttpEventType);
        if (event.message === 'SUCCESS') {
          item.onSuccess!(event.body, item.file!, event);
        } else if (event instanceof HttpResponse) {
          item.onSuccess!(event.body, item.file!, event);
        }
        this.loading = false;
      },
      err => {
        item.onError!(err, item.file!);
      }
    );
  };

  ngOnInit() {
    // this.user.id = "16";
    this.personInfoEditService.getPersonDetail(this.user.id).subscribe(result => {
      let data = result.data;
      this.user.trueName = data.trueName;
      this.user.nickName = data.nickName;
      this.user.gender = data.gender;
      this.user.about = data.about;
      this.user.title = data.title;
      this.user.company = data.company;
      this.user.job = data.job;
      this.user.qq = data.qq;
      this.user.weibo = data.weibo;
      this.user.weixin = data.weixin;
      this.user.site = data.site;
      this.user.signature = data.signature;
      this.user.mediumAvatar = data.mediumAvatar;
      this.user.fansNum = data.fansNum;
      this.user.followedNum = data.followedNum;
    })
    this._verificationService.getUserVerificationStatus(this.user.id).subscribe(result => {
      if(result.data.状态 == "认证成功"){
        this.user.trueName = result.data.真实姓名;
        this.nameNonEditable = "true";
      }
    })
  }
}
