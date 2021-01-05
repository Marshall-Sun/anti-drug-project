import { Component, OnInit } from "@angular/core";
import {
  NzMessageService,
  NzNotificationService,
  NzModalService,
} from "ng-zorro-antd";
import { MaterialService } from "src/app/service/material/material.service";
import { HttpClient } from "@angular/common/http";
import { OpenresourceManagementService } from "src/app/service/openresource-management/openresource-management.service";
@Component({
  selector: "app-plan-tasks",
  templateUrl: "./plan-tasks.component.html",
  styleUrls: ["./plan-tasks.component.less"],
})
export class OpenresourcePlanTasksComponent implements OnInit {
  userid = undefined;
  courseId: any = 0;
  teachplanId: any = 0;

  openCourseId: any = 0;
  openCourse: {};

  tasklist = [];

  //表单控制变量
  addchapter_visible = false; //添加章
  addtask_visible = false; //添加任务

  //视频/资料类型
  material_title = "";
  soursedata: any;
  sourcetotalpage = 1;
  soursepage = 1;
  searchKeyword = "";
  current_select_material = undefined;

  soursedata_course: any;
  sourcetotalpage_course = 1;
  soursepage_course = 1;

  material_from: "mymaterial";

  //完成条件
  iselective = false;

  //编辑任务用
  isCreateTask = true;

  constructor(
    private openresourceManagementService: OpenresourceManagementService,
    private msg: NzMessageService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private materialservice: MaterialService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.openCourseId = location.pathname.split("/")[3];
    this.userid = localStorage.getItem("id");
    this.initTask();
  }

  async initTask() {
    try {
      let res: any = await this.http
        .get(
          `/course/open/getOpenCourseLessonById?openCourseId=${this.openCourseId}`
        )
        .toPromise();
      this.openCourse = res.data;
    } catch (e) {
      this.msg.error("获取课时列表失败");
    }
  }

  handleUpload() {
    return `/material/uploadOpenCourseMaterial?openCourseId=${
      this.courseId
    }&userId=${localStorage.getItem("id")}`;
  }

  handleOpen_addtask(): void {
    if (this.openCourse) {
      this.msg.error("课时数量达到上限");
      return;
    }
    this.addtask_visible = true;
    this.isCreateTask = true;
    this.getCourseFileList();
  }

  handleOk_addtask(): void {
    this.createTask_video();
    this.addtask_visible = false;
  }

  async createTask_video() {
    try {
      await this.http
        .post("/course/open/createOpenCourseLesson", {
          mediaid: this.current_select_material.fileID,
          openCourseId: Number(this.openCourseId),
          title: String(this.material_title),
          userid: this.userid,
        })
        .toPromise();
      this.msg.success("课时设置成功");
      this.initTask();
    } catch (e) {
      this.msg.error("课时设置失败");
    }
  }

  handleCancel_addtask(): void {
    this.addtask_visible = false;
  }

  async publishTask(taskid) {
    try {
      await this.http
        .put(`/course/open/publishOpenCourseLesson?lessonId=${taskid}`, {})
        .toPromise();
      this.msg.success("课时发布成功");
      this.initTask();
    } catch (e) {
      this.msg.error("课时发布失败");
    }
  }

  async unpublishTask(taskid) {
    try {
      await this.http
        .put(`/course/open/unpublishOpenCourseLesson?lessonId=${taskid}`, {})
        .toPromise();
      this.msg.success("课时取消发布成功");
      this.initTask();
    } catch (e) {
      this.msg.error("课时取消发布失败");
    }
  }

  deleteTask(taskid) {
    this.modalService.confirm({
      nzTitle: "真的要删除该任务吗?",
      nzContent: "该任务及其子任务将被删除。",
      nzOkText: "确定",
      nzOkType: "danger",
      nzOnOk: async () => {
        try {
          await this.http
            .delete(
              `/course/open/deleteOpenCourseLessonById?lessonId=${taskid}`
            )
            .toPromise();
          this.msg.success("课时删除成功");
          this.initTask();
        } catch (e) {
          this.msg.error("课时删除失败");
        }
      },
      nzCancelText: "取消",
    });
  }

  getMaterials() {
    if (this.material_from == "mymaterial") {
      this.materialservice
        .getMyMaterials(
          this.userid.toString(),
          this.soursepage.toString(),
          "video",
          "",
          "",
          "",
          this.searchKeyword,
          "",
          ""
        )
        .subscribe(
          (res: any) => {
            this.soursedata = res.data.data;
            this.sourcetotalpage = res.data.total;
          },
          (error) => {
            this.notification.create("error", "发生错误！", `${error.error}`);
          }
        );
    } else if (this.material_from == "upload") {
      this.materialservice
        .getCollectedMaterials(
          this.userid.toString(),
          this.soursepage.toString(),
          "video",
          "",
          "",
          "",
          this.searchKeyword,
          "",
          ""
        )
        .subscribe(
          (res: any) => {
            this.soursedata = res.data.data;
            this.sourcetotalpage = res.data.total;
          },
          (error) => {
            this.notification.create("error", "发生错误！", `${error.error}`);
          }
        );
    } else if (this.material_from == "share") {
      this.materialservice
        .getShareTeachingMaterials(
          this.userid.toString(),
          this.soursepage.toString(),
          "video",
          "",
          "",
          "",
          this.searchKeyword,
          "",
          ""
        )
        .subscribe(
          (res: any) => {
            this.soursedata = res.data.data;
            this.sourcetotalpage = res.data.total;
          },
          (error) => {
            this.notification.create("error", "发生错误！", `${error.error}`);
          }
        );
    } else if (this.material_from == "public") {
      this.materialservice
        .getOpenTeachingMaterials(
          this.userid.toString(),
          this.soursepage.toString(),
          "video",
          "",
          "",
          "",
          this.searchKeyword,
          "",
          ""
        )
        .subscribe(
          (res: any) => {
            this.soursedata = res.data.data;
            this.sourcetotalpage = res.data.total;
          },
          (error) => {
            this.notification.create("error", "发生错误！", `${error.error}`);
          }
        );
    }
  }

  searchMaterials() {
    this.soursepage = 1;
    this.getMaterials();
  }

  selectMaterial(material) {
    this.current_select_material = material;
  }

  uploadMaterialChange(info: any) {
    if (info.type === "success") {
      let file = {
        filename: info.file.name,
        fileID: info.file.response.data,
      };
      this.current_select_material = file;
    }
    if (info.type === "error") {
      this.notification.create("error", "发生错误！", `上传失败`);
    }
  }

  async getCourseFileList() {
    try {
      let fileList: any = await this.openresourceManagementService.getOpenCourseFileList(
        this.openCourseId
      );
      this.soursedata_course = fileList.map((item: any) => ({
        createdTime: item.updatedTime,
        fileID: item.fileId,
        filename: item.fileName,
        fileType: item.type,
      }));
    } catch (e) {
      this.msg.error("课程文件获取失败");
    }
  }
}
