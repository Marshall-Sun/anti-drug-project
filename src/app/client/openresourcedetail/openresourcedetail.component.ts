import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { OpenresourcedetailService } from "../../service/openresourcedetail/openresourcedetail.service";
import { UserManagementService } from "src/app/service/user-management/user-management.service";
@Component({
  selector: "app-openresourcedetail",
  templateUrl: "./openresourcedetail.component.html",
  styleUrls: ["./openresourcedetail.component.less"],
})
export class OpenresourcedetailComponent implements OnInit {
  userId: number;
  courseId: number;

  basicData = {
    movieTitle: "",
    subtitle: "",
    introduction: "",
    videoCover: "",
    hitNum: 0,
    postNum: 0,

    likeNum: 0,
    likeBtnState: 0,
    isLiked: false,

    isCollected: false,
    collectBtnState: 0,
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

  recommendCourse = {
    loading: false,
    list: [],
  };

  constructor(
    private router: Router,
    private detailService: OpenresourcedetailService,
    private routerInfo: ActivatedRoute,
    private msg: NzMessageService,
    private userManagementService: UserManagementService
  ) {}

  ngOnInit() {
    this.userId = Number(localStorage.getItem("id"));
    this.courseId = Number(this.routerInfo.snapshot.params["id"]);
    this.sendUserInfo();
    this.initBasicData();
    this.initTeacherData();
    this.initLesson();
    this.initRecommendCourse();
  }

  sendUserInfo() {
    this.detailService.updateHit(this.courseId);
    if (!this.userId)
      this.detailService.joinOpenCourseWithoutLogin(this.courseId);
    else this.detailService.joinOpenCourseWithLogin(this.courseId, this.userId);
  }

  async initBasicData() {
    try {
      let res: any = await this.detailService.getInfo(
        this.courseId,
        this.userId
      );
      this.basicData.movieTitle = res.title;
      this.basicData.subtitle = res.subtitle;
      this.basicData.introduction = res.introduction.replace(/<\/?.+?\/?>/g, "");
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
      let res: any = await this.detailService.getOpenCourseOwner(this.courseId);
      this.teacherData.id = res.data.userId;
      this.teacherData.nickname = res.data.nickname;
      this.teacherData.title = res.data.title;
      this.teacherData.avatar = res.data.avatar;
      let userData: any = await this.userManagementService
        .getPersonalDetailById(String(this.teacherData.id))
        .toPromise();
      this.teacherData.fansNum = userData.data.fansNum;
      this.teacherData.followNum = userData.data.followedNum;
    } catch (e) {
      this.msg.error("教师信息初始化失败");
    }
  }

  async initLesson() {
    try {
      let res: any = await this.detailService.getLesson(this.courseId);
      this.lessonData.id = res.data.lessonId;
      this.lessonData.title = res.data.title;
      let urlData: any = await this.detailService.getVideoUrl(
        this.lessonData.id
      );
      this.lessonData.url = urlData.data;
    } catch (e) {
      this.msg.error("课时信息初始化失败");
    }
  }

  async initRecommendCourse() {
    this.recommendCourse.loading = true;
    try {
      let res: any = await this.detailService.getRecommendCourse(this.courseId);
      this.recommendCourse.list = res.data;
    } catch (e) {
      this.msg.error("推荐课程初始化失败");
    }
    this.recommendCourse.loading = false;
  }

  async clickLike() {
    if (this.basicData.isLiked) {
      this.msg.info("已经点过赞了");
      return;
    }
    try {
      await this.detailService.setLikeNum(this.courseId);
      this.basicData.likeNum++;
      this.basicData.isLiked = true;
    } catch (e) {
      this.msg.error("点赞失败");
    }
  }

  clickCollect() {
    try {
      if (this.basicData.isCollected) {
        this.detailService.disCollectCourse(this.courseId, this.userId);
      } else {
        this.detailService.collectCourse(this.courseId, this.userId);
      }
      this.basicData.isCollected = !this.basicData.isCollected;
    } catch (e) {
      this.msg.error("操作失败");
    }
  }

  navigateByUrl(url) {
    this.router.navigateByUrl(url);
  }
}
