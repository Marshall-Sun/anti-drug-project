import { Component, OnInit } from '@angular/core';
import {NzMessageService, NzNotificationService, UploadXHRArgs} from 'ng-zorro-antd';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {ClientClassManagementService} from '../../service/client-class-management/client-class-management.service';

@Component({
  selector: 'app-cover-setting',
  templateUrl: './cover-setting.component.html',
  styleUrls: ['./cover-setting.component.less']
})
export class CoverSettingComponent implements OnInit {

  classroomId: string;

  userId: string = '1';

  constructor(
    private _notification: NzNotificationService,
    private http: HttpClient,
    private classroomService$: ClientClassManagementService
  ) { }

  ngOnInit() {
    this.classroomId = location.pathname.split('/')[3];
    this.userId = window.localStorage.getItem('id')
  }

  customReq = (item: UploadXHRArgs) => {
    const formData = new FormData();
    formData.append('file', item.file as any);
    return this.http.post(item.action, formData).subscribe(
      // tslint:disable-next-line no-any
      (event: any) => {
        console.log(event);
        console.log(HttpEventType);
        if (event.message === 'SUCCESS') {
          // if (event.total! > 0) {
          //   // tslint:disable-next-line:no-any
          //   (event as any).percent = (event.loaded / event.total!) * 100;
          // }
          item.onSuccess!(event.body, item.file!, event);
          let i;
          this.classroomService$.changeStatus.subscribe(value => i = value);
          this.classroomService$.changeStatus.next(i + 1);
        } else if (event instanceof HttpResponse) {
          // item.onSuccess!(event.body, item.file!, event);
        }
      },
      err => {
        item.onError!(err, item.file!);
      }
    );
  };
  //
  // handleChange({ file, fileList }: { [key: string]: any }): void {
  //   const status = file.status;
  //   if (status !== 'uploading') {
  //     console.log(file, fileList);
  //   }
  //   if (status === 'done') {
  //     this._notification.success(`${file.name} file uploaded successfully.`);
  //   } else if (status === 'error') {
  //     this.msg.error(`${file.name} file upload failed.`);
  //   }
  // }

}
