import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import {
  NzMessageService,
  NzModalService,
  NzNotificationService,
} from "ng-zorro-antd";
import { UserInfoViewModalComponent } from "../../../core/modal/user-info-view-modal/user-info-view-modal.component";
import { ClientClassManagementService } from "../../../service/client-class-management/client-class-management.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-formal-student-table",
  templateUrl: "./formal-student-table.component.html",
  styleUrls: ["./formal-student-table.component.less"],
})
export class FormalStudentTableComponent implements OnInit {
  @Input()
  planId: string;

  courseId: string;
  userId: string = localStorage.getItem("id");
  name: string = "";
  studentList = [];
  total: number;
  loading: boolean = false;
  pageIndex: number = 1;

  messageContent: string = "";
  commentContent: string = "";
  expireTime: Date;

  constructor(
    private _modal: NzModalService,
    private classManagement$: ClientClassManagementService,
    private _notification: NzNotificationService,
    private http: HttpClient,
    private msg: NzMessageService
  ) {
    this.courseId = location.pathname.split("/")[3];
  }

  ngOnInit() {
    this.getStudent();
  }

  async getStudent(pageNum = null, username = null) {
    this.loading = true;
    try {
      let etc = "";
      if (pageNum) etc += "&pageNum=" + pageNum;
      if (username) etc += "&username=" + username;
      let res: any = await this.http
        .get(
          `/course/open/getStudentWithLogin?openCourseId=${this.courseId}${etc}`
        )
        .toPromise();
      this.studentList = res.data.data.filter((stu: any) => stu.userId);
      console.log(this.studentList);
    } catch (e) {
      this.msg.error("获取学生列表失败");
    }
    this.loading = false;
  }

  sendMessage(id: string, template: TemplateRef<{}>) {
    this._modal.create({
      nzTitle: "编辑私信内容",
      nzContent: template,
      nzOkText: "发送",
      nzCancelText: "取消",
      nzOnOk: () => {
        if (this.messageContent == "") {
          this._notification.error("私信内容不能为空！", "");
          return false;
        } else {
          this.classManagement$
            .sendMessage(this.userId, id, this.messageContent)
            .subscribe(
              (result) => {
                this._notification.success("私信发送成功！", "");
              },
              (error1) => {
                this._notification.error("私信发送失败！", `${error1.error}`);
              }
            );
        }
      },
      nzOnCancel: () => console.log(this.messageContent),
    });
  }

  checkInfo(id: string) {
    this._modal.create({
      nzTitle: "个人详细信息",
      nzContent: UserInfoViewModalComponent,
      nzComponentParams: {
        userId: id,
      },
      nzWidth: 600,
      nzFooter: null,
    });
  }
}
