import { Component, OnInit } from "@angular/core";
import {
  NzEmptyService,
  NzMessageService,
  NzNotificationService,
} from "ng-zorro-antd";
import { UploadFile } from "ng-zorro-antd/upload";
import { HttpClient } from "@angular/common/http";
import { OpenresourceManagementService } from "src/app/service/openresource-management/openresource-management.service";
enum FILETYPE {
  image = "图片",
  video = "视频",
  audio = "音频",
  ppt = "幻灯片",
  flash = "Flash",
  document = "文档",
  other = "其他",
}
@Component({
  selector: "app-file",
  templateUrl: "./file.component.html",
  styleUrls: ["./file.component.less"],
})
export class OpenresourceFileComponent implements OnInit {
  filetype = FILETYPE;

  fileList: UploadFile[] = [];

  fileUploadedList: any = [];
  loading: boolean = true;

  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = [];

  isVisible: boolean = false;
  uploading: boolean = false;
  courseId: any;

  mapOfCheckedId: { [key: string]: boolean } = {};
  fileIds: number[] = [];

  check(fileId: number) {
    if (this.mapOfCheckedId[fileId]) this.fileIds.push(fileId);
    else
      this.fileIds.forEach((item, i) => {
        if (item == fileId) this.fileIds.splice(i, 1);
      });
  }

  constructor(
    private _nzNotificationService: NzNotificationService,
    private nzEmptyService: NzEmptyService,
    private msg: NzMessageService,
    private http: HttpClient,
    private openresourceManagementService: OpenresourceManagementService
  ) {}

  async ngOnInit() {
    this.nzEmptyService.resetDefault();
    this.courseId = location.pathname.split("/")[3];
    this.getCourseFileList();
  }

  async getCourseFileList() {
    this.loading = true;
    try {
      let fileList: any = await this.openresourceManagementService.getOpenCourseFileList(
        this.courseId
      );
      console.log(fileList);
      
      this.fileUploadedList = fileList.map((item: any) => ({
        createdTime: item.updatedTime,
        fileId: item.fileId,
        fileName: item.fileName,
        fileType: item.type,
      }));
    } catch (e) {
      this.msg.error("信息初始化失败");
    }
    this.loading = false;
  }

  async deleteUploadList(fileIds: Array<number> = this.fileIds) {
    if (!fileIds.length) {
      this._nzNotificationService.error("删除失败", "请选择要删除的文件");
      return;
    }
    try {
      let query = fileIds.reduce((str, id) => str + "&fileIds=" + id, "");
      await this.http.delete("/material/deleteUploadList?" + query.slice(1)).toPromise();
      this._nzNotificationService.success("删除成功", "");
      location.reload();
    } catch (e) {
      this._nzNotificationService.error("删除失败", "请重新删除文件");
    }
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
      formData.append("file", file);
      this.http
        .post(
          `/material/uploadOpenCourseMaterial?openCourseId=${
            this.courseId
          }&userId=${localStorage.getItem("id")}`,
          formData
        )
        .subscribe(
          (res) => {
            this.msg.success("上传成功!");
            this.fileList = [];
            this.getCourseFileList();
            this.uploading = false;
          },
          () => {
            this.msg.error("上传失败!");
            this.uploading = false;
          }
        );
    });
  }
}
