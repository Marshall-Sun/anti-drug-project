import { Component, OnInit } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";
import { OpenresourceManagementService } from "src/app/service/openresource-management/openresource-management.service";
import { UploadChangeParam } from "ng-zorro-antd/upload";

@Component({
  selector: "app-cover-photo",
  templateUrl: "./cover-photo.component.html",
  styleUrls: ["./cover-photo.component.less"],
})
export class OpenresourceCoverPhotoComponent implements OnInit {
  coverUrl: string;
  courseId: any;

  constructor(
    private msg: NzMessageService,
    private openresourceManagementService: OpenresourceManagementService
  ) {
    this.courseId = location.pathname.split("/")[3];
  }

  async ngOnInit() {
    try {
      let courseInfo: any = await this.openresourceManagementService.getOpenCourseById(
        this.courseId
      );
      this.coverUrl = courseInfo.data.cover;
    } catch (e) {
      this.msg.error("信息初始化失败");
    }
  }

  uploadUrl() {
    return `/material/uploadOpenCourseCover?openCourseId=${
      this.courseId
    }&userId=${localStorage.getItem("id")}`;
  }

  handleChange(info: UploadChangeParam): void {
    if (info.file.status === "done") {
      this.msg.success(`${info.file.name} 上传成功`);
      location.reload();
    } else if (info.file.status === "error") {
      this.msg.error(`${info.file.name} 上传失败`);
    }
  }
}
