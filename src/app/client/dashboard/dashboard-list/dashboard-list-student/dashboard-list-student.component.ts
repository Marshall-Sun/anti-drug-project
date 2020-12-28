import { Component, OnInit } from "@angular/core";
import { CourseService } from "src/app/service/courselist-frontend/courselist-frontend.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NzNotificationService } from "ng-zorro-antd";
import { ClassInfService } from "src/app/service/classinf-frontend/classinf-frontend.service";
import { AdminReviewService } from "src/app/service/admin-review/admin-review.service";
import { UserManagementService } from "src/app/service/user-management/user-management.service";
import { AuthService } from 'src/app/front-desk/auth/auth.service';

@Component({
  selector: "app-dashboard-list-student",
  templateUrl: "./dashboard-list-student.component.html",
  styleUrls: ["./dashboard-list-student.component.less"],
})
export class DashboardListStudentComponent implements OnInit {
  comment = [];
  dynamic = [];

  constructor(
    private courseservice: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private _notification: NzNotificationService,
    private adminReviewService: AdminReviewService,
    private classinfservice: ClassInfService,
    private userManagementService: UserManagementService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.initComment();
    // this.initDynamic();
    for (let i = 0; i < 5; i++) {
      let timestamp = new Date().getTime();
      this.dynamic.push({
        id: i,
        name: "小明",
        course: "测试课程",
        time: this.calculatePeriod(timestamp - 1000000000),
        avatar: "../assets/img/timg.jpg",
      });
    }
  }

  initComment() {
    this.adminReviewService
      .getClassReviews(1, 5, {
        rating: "",
        author: "",
        course: "",
        keyword: "",
      })
      .subscribe((data) => {
        let resList = [];
        for (var item of data.data.backGroundClassroomReviewList) {
          resList.push({
            classroomId: item.classroomId,
            id: item.userId,
            reviewId: item.reviewId,
            nickName: item.nickName,
            classroomTitle: item.classroomTitle,
            content: item.content.replace(/\<[^\>]*\>/g, ""),
            createdTime: this.calculatePeriod(
              new Date(item.createdTime * 1000).getTime()
            ),
            rating: item.rating,
            avatar: "",
          });
        }
        this.comment = this.comment.concat(resList);
        this.initAvatar(this.comment);
      });
  }

  initDynamic() {
    this.classinfservice
      .getclassstdDynamic("6") //测试课程id为6
      .subscribe((data: any) => {
        let resList = [];
        for (var item of data.data) {
          let timestamp = item.updateTime * 1000;
          resList.push({
            id: item.userId,
            name: item.nickname,
            course: item.courseSetTitle,
            time: this.calculatePeriod(timestamp),
            avatar: "",
          });
        }
        this.dynamic = this.dynamic.concat(resList);
        this.initAvatar(this.dynamic);
      });
  }

  async initAvatar(itemList: any[]) {
    for (var item of itemList) {
      if (item.id) {
        let res: any = await this.userManagementService.getPersonalDetailById(item.id).toPromise();
        let avatar = res.data.mediumAvatar.indexOf("public") == -1 ? res.data.mediumAvatar : "";
        item.avatar = avatar;
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
