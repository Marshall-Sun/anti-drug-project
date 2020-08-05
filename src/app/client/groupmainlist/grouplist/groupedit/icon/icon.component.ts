import { Component, OnInit } from '@angular/core';
import {NzNotificationService, UploadFile, UploadXHRArgs} from 'ng-zorro-antd';
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {ImagesUploadingService} from "../../../../../service/images-uploading/images-uploading.service";
import {ActivatedRoute} from '@angular/router';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.less']
})
export class IconComponent implements OnInit {
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  imageiconList:[];
  imageicon:string;
  fileList: UploadFile[]= [];

  previewImage: string | undefined = '';
  previewVisible = false;

  groupId: string;
  userId: string;

  constructor(private imagesUploadingService$:ImagesUploadingService,
              private  _message: NzMessageService,
              private _notification: NzNotificationService,
              private _http: HttpClient,
              private routerInfo: ActivatedRoute) {
    this.groupId = this.routerInfo.snapshot.params['id'];
    this.userId = window.localStorage.getItem('id')
  }

  ngOnInit() {
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };
  // getIconimage(){
  // this.imagesUploadingService$.getIcon(this.imageicon).subscribe(result=>{
  //   this.imageiconList
  // },error1 => {
  //   this._notification.create(
  //     "error",
  //     "上传头像失败",
  //     `${error1.error}`
  //   )
  //   }
  // )
  // }
  customReq = (item: UploadXHRArgs) => {
    const formData = new FormData();
    formData.append('file', item.file as any);
    formData.append('groupId', this.groupId);
    formData.append('userId', this.userId);
    const req = new HttpRequest('POST', item.action, formData, {
      reportProgress: true,
      withCredentials: true
    });
    return this._http.request(req).subscribe(
      (event: HttpEvent<any>) => {

        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          item.onSuccess!(event.body, item.file!, event);
        }
      },
      err => {
        item.onError!(err, item.file!);
      }
    )
  }
}
