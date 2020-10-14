import { Component, OnInit } from '@angular/core';
import { CourseManagementUtilService } from 'src/app/service/course-management-util/course-management-util.service';
import { NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import { HttpResponse, HttpRequest, HttpClient, HttpEventType } from '@angular/common/http';
import { CourseBaseInfoEditService } from 'src/app/service/course-base-info-edit/course-base-info-edit.service';

@Component({
  selector: 'app-cover-photo',
  templateUrl: './cover-photo.component.html',
  styleUrls: ['./cover-photo.component.less']
})
export class OpenresourceCoverPhotoComponent implements OnInit {

  coverUrl: string;
  courseId: any;

  constructor(
    private _courseManagementUtilService: CourseManagementUtilService,
    private _courseBaseInfoEditService: CourseBaseInfoEditService,
    private courseManagemetn$: CourseBaseInfoEditService,
    private msg: NzMessageService,
    private http: HttpClient) { }

  ngOnInit() {
    this.courseId = this._courseManagementUtilService.setCourseIdFrom(location);
    this.getCourseInfo();
  }

  getCourseInfo() {
    this._courseBaseInfoEditService.getCourseInfo(this.courseId).subscribe(res => {
      this.coverUrl = res.data.baseData.cover
    })
  }

  customReq = (item: UploadXHRArgs) => {
    const formData = new FormData();
    formData.append('file', item.file as any);
    return this.http.post(item.action, formData).subscribe(
      // tslint:disable-next-line no-any
      (event: any) => {

        if (event.message === 'SUCCESS') {
          let i;
          this.courseManagemetn$.imgChange.subscribe(value => i = value);
          this.courseManagemetn$.imgChange.next(i + 1);
          item.onSuccess!(event.body, item.file!, event);
        } else if (event instanceof HttpResponse) {
        }
      },
      err => {
        item.onError!(err, item.file!);
      }
    );
  };

}
