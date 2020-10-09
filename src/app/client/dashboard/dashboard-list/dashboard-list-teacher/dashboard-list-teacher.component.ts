import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { TeacherManagementService } from "src/app/service/teacher-management/teacher-management.service";

@Component({
  selector: "app-dashboard-list-teacher",
  templateUrl: "./dashboard-list-teacher.component.html",
  styleUrls: ["./dashboard-list-teacher.component.less"],
})
export class DashboardListTeacherComponent implements OnInit {
  displayData: any[] = [];
  loading: boolean;

  constructor(
    private router: Router,
    private teacherManagementService: TeacherManagementService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.displayData = [];
    this.loading = true;
    this.teacherManagementService.getTeacherList(1, 4).subscribe(
      (result) => {
        this.loading = false;
        this.displayData = result.data.teachers;
        this.displayData.forEach((item) => {
          item.isshow = true;
        });
      },
      (error1) => {
        this.loading = false;
        this.message.create("error", `${error1.error}`);
      }
    );
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}
