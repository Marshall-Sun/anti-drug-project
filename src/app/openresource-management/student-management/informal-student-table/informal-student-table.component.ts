import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-informal-student-table",
  templateUrl: "./informal-student-table.component.html",
  styleUrls: ["./informal-student-table.component.less"],
})
export class InformalStudentTableComponent implements OnInit {
  courseId: string;
  studentList = [];
  loading: boolean = false;

  constructor(private http: HttpClient, private msg: NzMessageService) {
    this.courseId = location.pathname.split("/")[3];
  }

  async ngOnInit() {
    this.loading = true;
    try {
      let res: any = await this.http
        .get(
          `/course/open/getStudentWithoutLogin?openCourseId=${this.courseId}`
        )
        .toPromise();
      this.studentList = res.data.data;
    } catch (e) {
      this.msg.error("信息初始化失败");
    }
    this.loading = false;
  }

  calculatePeriod(timestamp: number): string {
    timestamp = Number(new Date(timestamp * 1000));
    let now = new Date().getTime();
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    let dayPeriod = (now - timestamp) / 1000 / 86400;

    if (today.getTime() < timestamp) {
      return "今天";
    } else if (dayPeriod < 30) {
      return Math.ceil(dayPeriod) + "天前";
    } else if (dayPeriod < 365) {
      return Math.floor(dayPeriod / 30) + "个月前";
    } else {
      return Math.floor(dayPeriod / 365) + "年前";
    }
  }
}
