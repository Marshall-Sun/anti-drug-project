import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { OpenresourceManagementService } from "../service/openresource-management/openresource-management.service";

@Component({
  selector: "app-openresource-management",
  templateUrl: "./openresource-management.component.html",
  styleUrls: ["./openresource-management.component.less"],
})
export class OpenresourceManagementComponent implements OnInit {
  courseId: string;
  location: Location;
  title: string;
  status: string;
  teachersName: string = "";
  imgUrl: string = "";

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private routerInfo: ActivatedRoute,
    private openresourceManagementService: OpenresourceManagementService
  ) {
    this.location = location;
    this.routerInfo.params.subscribe((res) => {
      this.courseId = res.id;
    });
  }

  async ngOnInit() {
    try {
      let [courseInfo, courseTeacher]: any[] = await Promise.all([
        this.openresourceManagementService.getOpenCourseById(this.courseId),
        this.openresourceManagementService.getOpenCourseTeacherList(
          this.courseId
        ),
      ]);
      this.title = courseInfo.data.title;
      this.teachersName =
        courseTeacher.map((item: any) => item.userName).join("，") ||
        "暂无教师";

      // TODO
      this.status = courseInfo.data.status || true;
      this.imgUrl = courseInfo.data.cover || "../assets/img/timg.jpg";
    } catch (e) {
      this.msg.error("信息初始化失败");
    }
  }
  
  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}
