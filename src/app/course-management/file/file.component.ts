import { Component, OnInit } from '@angular/core';
import { NzEmptyService, NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { UploadFile } from 'ng-zorro-antd/upload';
import { filter } from 'rxjs/operators';
import { HttpResponse, HttpRequest, HttpClient } from '@angular/common/http';
import { CourseManagementUtilService } from 'src/app/service/course-management-util/course-management-util.service';
import { CourseFileService } from 'src/app/service/course-file/course-file.service';
enum FILETYPE {
  image = '图片',
  video = '视频',
  office = '文档',
  flash = 'Flash',
  document = '文档',
  other = '其他'
}
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.less']
})
export class FileComponent implements OnInit {

  filetype = FILETYPE;

  fileList: UploadFile[] = [];

  fileUploadedList: any = [];
  total: number = 0;
  loading: boolean = true;
  pageIndex: any = 1;

  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = [];


  isVisible: boolean = false;
  uploading: boolean = false;
  courseId: any;

  isAllChecked: boolean = false;
  mapOfCheckedId: { [key: string]: boolean } = {}
  fileIds: number[] = [];

  checkAll(value: boolean) {
    this.fileUploadedList.forEach((item: { id: string | number; }) => (this.mapOfCheckedId[item.id] = value));
    if (value) {
      this.fileUploadedList.forEach((item) => { this.fileIds.push(item.fileId) })
    } else this.fileIds = [];
    console.log(this.fileIds);
  }

  check(fileId: number) {
    if (this.mapOfCheckedId[fileId]) this.fileIds.push(fileId)
    else this.fileIds.forEach((item, i) => { if (item == fileId) this.fileIds.splice(i, 1) })
    console.log(this.fileIds);
  }

  constructor(
    private _courseManagementUtilService: CourseManagementUtilService,
    private _nzNotificationService: NzNotificationService,
    private _courseFileService: CourseFileService,
    private nzEmptyService: NzEmptyService,
    private msg: NzMessageService,
    private http: HttpClient,
  ) { }



  ngOnInit() {
    this.nzEmptyService.resetDefault();
    this.courseId = this._courseManagementUtilService.setCourseIdFrom(location);
    this.getCourseFileList();
  }

  getCourseFileList(pageIndex: number = this.pageIndex, pageSize: number = 10) {
    this.loading = true;
    this._courseFileService.getCourseFileList(this.courseId, pageIndex, pageSize).subscribe(res => {
      this.fileUploadedList = res.data.data;
      this.total = res.data.total;
      this.loading = false;
    })
  }

  deleteUpload(fileId: number = 0) {
    this._courseFileService.deleteUpload(fileId).subscribe(res => {
      this._nzNotificationService.success('删除成功!', '');
      this.getCourseFileList();
    }, err => {
      this._nzNotificationService.error('删除失败!', `${err.message}`)
    })
  }

  deleteUploadList(fileIds: Array<number> = this.fileIds) {
    this._courseFileService.deleteUploadList(fileIds).subscribe(res => {
      this._nzNotificationService.success('删除成功!', '');
      this.getCourseFileList();
    }, err => {
      this._nzNotificationService.error('删除失败!', `${err.message}`)
    });
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): void {
    let error: boolean = false;
    this.uploading = true;
    this.fileList.forEach((file: any) => {
      const formData = new FormData();
      formData.append('file', file);
      this.http
        .post(`/material/uploadCourseMaterial?courseId=${this.courseId}&userId=1`, formData)
        // .pipe(filter(e => e instanceof HttpResponse))
        .subscribe(
          (res) => {
            this.msg.success('上传成功!');
            this.fileList = [];
            this.getCourseFileList();
            this.uploading = false;
          },
          () => {
            this.msg.error('上传失败!');
            this.uploading = false;}
        );
    })

  }

}
