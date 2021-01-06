import { Component, OnInit, OnDestroy } from "@angular/core";
import { addDays, differenceInMilliseconds } from "date-fns";
import { ActivatedRoute, Router } from "@angular/router";
import { OpenresourceService } from "../../service/openresource/openresource.service";
import { NzMessageService, NzNotificationService } from "ng-zorro-antd";
import { OpenresourcedetailService } from "../../service/openresourcedetail/openresourcedetail.service";
import { FollowManagementService } from "../../service/follow-management/follow-management.service";
import { TeacherManagementService } from "../../service/teacher-management/teacher-management.service";
import { UserManagementService } from "src/app/service/user-management/user-management.service";
@Component({
  selector: "app-openresourcedetail",
  templateUrl: "./openresourcedetail.component.html",
  styleUrls: ["./openresourcedetail.component.less"],
})
export class OpenresourcedetailComponent implements OnInit {
  userId: number;
  courseId: number;

  displayData: any;
  movieTitle: any;
  hitNum: any;
  postNum: any;
  likeNum: number;
  subtitle: string;
  teacherNickName: string;
  teacherTitle: string;
  videoCover: string;
  teacherId: string;
  fellowNum: number;
  attentionNum: number;
  isCollected: number;
  teacherAvatar: string;
  isFollowed: boolean;
  likeBtnState: number;
  collectBtnState: number;
  courseList = [];
  courseListLoading: boolean = true;
  videoUrl: string;

  basicData = {
    movieTitle: "",
    subtitle: "",
    introduction: "",
    videoCover: "",
    hitNum: 0,
    postNum: 0,
    likeNum: 0,
    isCollected: false,

    isFollowed: false,
    likeBtnState: 0,
    collectBtnState: 0,
    courseList: [],
    courseListLoading: true,
  };

  teacherData = {
    id: 0,
    nickname: "",
    title: "",
    avatar: "",
    fansNum: 0,
    followNum: 0,
  };

  lessonData = {
    id: 0,
    title: "",
    url: "",
  };

  constructor(
    private router: Router,
    private opendetailService$: OpenresourcedetailService,
    private openService$: OpenresourceService,
    private followMngService$: FollowManagementService,
    private routerInfo: ActivatedRoute,
    private msg: NzMessageService,
    private userManagementService: UserManagementService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.userId = Number(localStorage.getItem("id"));
    this.courseId = Number(this.routerInfo.snapshot.params["id"]);
    this.initBasicData();
    this.initTeacherData();
    this.initLesson();
  }

  async initBasicData() {
    try {
      let res: any = await this.opendetailService$.getInfo(
        this.courseId,
        this.userId
      );
      this.basicData.movieTitle = res.title;
      this.basicData.subtitle = res.subtitle;
      this.basicData.introduction = res.introduction;
      this.basicData.videoCover = res.openCourseCover;
      this.basicData.hitNum = res.hitNum;
      this.basicData.postNum = res.postNum;
      this.basicData.likeNum = res.likeNum;
      this.basicData.isCollected = Boolean(res.isFavourite);
    } catch (e) {
      this.msg.error("基础信息初始化失败");
    }
  }

  async initTeacherData() {
    try {
      let res: any = await this.opendetailService$.getOpenCourseOwner(this.courseId);
      this.teacherData.id = res.data.userId;
      this.teacherData.nickname = res.data.nickname;
      this.teacherData.title = res.data.title;
      this.teacherData.avatar = res.data.avatar;
      let userData: any = await this.userManagementService.getPersonalDetailById(String(this.teacherData.id)).toPromise();
      this.teacherData.fansNum = userData.data.fansNum;
      this.teacherData.followNum = userData.data.followedNum;
    } catch (e) {
      this.msg.error("教师信息初始化失败");
    }
  }

  async initLesson() {
    try {
      let res: any = await this.opendetailService$.getLesson(this.courseId);
      this.lessonData.id = res.data.lessonId;
      this.lessonData.title = res.data.title;
      let urlData: any = await this.opendetailService$.getVideoUrl(this.lessonData.id);
      this.lessonData.url = urlData.data;
      console.log(this.lessonData.url);
      
    } catch (e) {
      this.msg.error("课时信息初始化失败");
    }
  }

  getCourseList() {
    this.openService$.getOpenCourseList().subscribe((res) => {
      for (let i = 0; i < res.length; i++)
        this.courseList.push({
          courseId: res[i].id,
          courseTitle: res[i].title,
        });
      this.courseListLoading = false;
    });
  }

  clickLike() {
    // 点击点赞
    this.likeNum += 1;
    this.opendetailService$.setLikeNum(this.courseId).subscribe();
  }
  clickCollect() {
    // 点击收藏
    if (this.isCollected == 1) {
      this.opendetailService$
        .disCollectCourse(this.userId, this.courseId)
        .subscribe();
      this.isCollected = 0;
    } else {
      this.opendetailService$
        .collectCourse(this.userId, this.courseId)
        .subscribe();
      this.isCollected = 1;
    }
  }
  navigateByUrl(url) {
    this.router.navigateByUrl(url);
  }
  getIsFollowed() {
    this.followMngService$.isFollowed(this.userId, this.teacherId).subscribe(
      (res) => {
        this.isFollowed = res.data;
      },
      (error) => {
        this.notification.create("error", "获取是否关注失败", `${error.error}`);
      }
    );
  }
  follow_submit(item_id: any) {
    if (item_id != this.userId) {
      this.isFollowed = !this.isFollowed;
      this.followMngService$.followUser(this.userId, item_id).subscribe(
        () => {
          this.notification.create("success", "提交成功！", `提交成功`);
        },
        (error) => {
          this.notification.create("error", "发生错误！", `${error.error}`);
        }
      );
    } else {
      this.notification.create("error", "发生错误！", `不能自己关注自己`);
    }
  }
  del_follow_submit(item_id: any) {
    this.isFollowed = !this.isFollowed;
    this.followMngService$.defollow(this.userId, item_id).subscribe(
      () => {
        this.notification.create("success", "提交成功！", `提交成功`);
      },
      (error) => {
        this.notification.create("error", "发生错误！", `${error.error}`);
      }
    );
  }
}
