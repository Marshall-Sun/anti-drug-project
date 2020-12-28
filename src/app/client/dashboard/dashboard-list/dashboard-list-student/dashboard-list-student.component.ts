import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminReviewService } from "src/app/service/admin-review/admin-review.service";
import { UserManagementService } from "src/app/service/user-management/user-management.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-dashboard-list-student",
  templateUrl: "./dashboard-list-student.component.html",
  styleUrls: ["./dashboard-list-student.component.less"],
})
export class DashboardListStudentComponent implements OnInit {
  comment = [];
  dynamic = [];

  constructor(
    private router: Router,
    private adminReviewService: AdminReviewService,
    private http: HttpClient,
    private userManagementService: UserManagementService
  ) {}

  ngOnInit() {
    this.initComment();
    this.initDynamic();
  }

  initComment() {
    this.adminReviewService
      .getClassReviews(1, 5, {
        rating: "",
        author: "",
        course: "",
        keyword: "",
      })
      .subscribe((res) => {
        this.comment = res.data.backGroundClassroomReviewList.map(
          (item: any) => ({
            classroomId: item.classroomId,
            id: item.userId,
            reviewId: item.reviewId,
            nickName: item.nickName,
            classroomTitle: item.classroomTitle,
            content: item.content.replace(/\<[^\>]*\>/g, ""),
            createdTime: this.calculatePeriod(
              Number(new Date(item.createdTime * 1000))
            ),
            rating: item.rating,
            avatar: "",
          })
        );
        this.initAvatar(this.comment);
      });
  }

  initDynamic() {
    this.http
      .get("/teachingPlan/getStudentAffair?pageNum=1&pageSize=5")
      .subscribe((data: any) => {
        this.dynamic = data.map((item: any) => ({
          id: item.userId,
          name: item.nickname,
          course: item.learnMediaName,
          time: this.calculatePeriod(Number(new Date(item.updatedTime * 1000))),
          avatar: item.avatar,
          action: item.action,
        }));
      });
  }

  async initAvatar(itemList: any[]) {
    for (var item of itemList) {
      if (item.id) {
        let res: any = await this.userManagementService
          .getPersonalDetailById(item.id)
          .toPromise();
        item.avatar = res.data.mediumAvatar;
      }
    }
  }

  navigateByUrl(id) {
    this.router.navigateByUrl("/client/userpage/" + id);
  }

  calculatePeriod(timestamp: number): string {
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
