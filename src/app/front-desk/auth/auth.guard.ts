import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { AuthService } from "./auth.service";
import { NewsService } from "src/app/service/news/news.service";
import { UserManagementService } from "src/app/service/user-management/user-management.service";
import { MyteachingService } from "src/app/service/myteaching/myteaching.service";
import { CourseInfService } from "src/app/service/courseinf-frontend/courseinf-frontend.service";
import { ClientCourseVideoService } from "src/app/service/client-course-video/client-course-video.service";
import { PaperMarkingService } from "src/app/service/paperMarking/paper-marking.service";
import { ClientClassManagementService } from "src/app/service/client-class-management/client-class-management.service";
import { PaperResultDetailService } from "src/app/service/paper-result-detail/paper-result-detail.service";
import { PrivateChatService } from "src/app/service/private-chat/private-chat.service";
import { CourseBaseInfoEditService } from "src/app/service/course-base-info-edit/course-base-info-edit.service";
import { QuestionCreateService } from "src/app/service/question-create/question-create.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private msg: NzMessageService,
    private authService: AuthService,
    private newsService: NewsService,
    private myteachingService: MyteachingService,
    private courseinfservice: CourseInfService,
    private courseVideoService: ClientCourseVideoService,
    private paperMarkingService: PaperMarkingService,
    private classManagementService: ClientClassManagementService,
    private userManagementService: UserManagementService,
    private courseBaseInfoEditService: CourseBaseInfoEditService,
    private privateChatService: PrivateChatService,
    private questionCreateService: QuestionCreateService,
    private paperResultDetailService: PaperResultDetailService
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let url: string = state.url;
    let canActivate: boolean = true;

    // 页面：创建小组，仅限管理员访问
    if (url == "/client/groupcreate") {
      canActivate = this.checkIdentity("SUPER_ADMIN");
    }

    // 页面：后台管理，仅限管理员访问
    if (url == "/admin") {
      canActivate = this.checkIdentity("SUPER_ADMIN");
    }

    // 页面：我的学习系列，需登录
    if (url.indexOf("/mine") != -1) {
      if (!this.authService.userLoginChecker()) {
        this.msg.error("尚未登录");
        canActivate = false;
      }
    }

    // 页面：我的教学系列，限管理员、教师访问
    if (
      url == "/client/mine/teachingcourse" ||
      url == "/client/mine/createcourse" ||
      url == "/client/mine/teachingclass" ||
      url == "/client/mine/studentQA" ||
      url == "/client/mine/studenttopic" ||
      url == "/client/mine/papermarking" ||
      url == "/client/mine/homeworkmarking" ||
      url == "/client/mine/teachingdatabase"
    ) {
      canActivate = this.checkIdentity("ROLE_TEACHER");
    }

    // 页面：我的笔记详情，判断是否存在
    if (url.indexOf("/client/mine/mynoteDetail") != -1) {
      let targetId = url.split("/")[4];
      let res: any = await this.myteachingService
        .getMyNoteDetilList(
          1,
          10,
          parseInt(window.localStorage.getItem("id")),
          parseInt(targetId)
        )
        .toPromise();
      if (res.data.length < 1) {
        this.msg.error("笔记不存在");
        canActivate = false;
      }
    }

    // 页面：课程详情系列，判断关闭状态；任务、教学计划是否存在
    if (url.indexOf("/courseinf") != -1) {
      let targetId = url.split("/");
      let res: any = await this.authService.courseClosedChecker(targetId[3]);
      if (res) {
        this.msg.error("课程未开放");
        canActivate = false;
      } else if (targetId[4] == "teachplan") {
        let res: any = await this.courseinfservice
          .get_teaching_plan_introduce(targetId[5])
          .toPromise();
        if (res.data == null) {
          this.msg.error("教学计划不存在");
          canActivate = false;
        } else if (targetId[6] == "task") {
          let res: any = await this.courseVideoService
            .getCurrentTask(
              targetId[5],
              targetId[7],
              window.localStorage.getItem("id")
            )
            .toPromise();
          if (res.data == null) {
            this.msg.error("任务不存在");
            canActivate = false;
          }
        }
      }
    }

    // 页面：考试，判断关闭状态，需登录
    if (url.indexOf("/course_test") != -1 || url.indexOf("/courseId") != -1) {
      console.log(url);

      if (!this.authService.userLoginChecker()) {
        this.msg.error("尚未登录");
        canActivate = false;
      } else {
        let targetId = url.split("/");
        let res: any = await this.paperMarkingService
          .getTestPaperContent(
            targetId[3],
            targetId[5],
            window.localStorage.getItem("id")
          )
          .toPromise();
        if (res.data == null) {
          this.msg.error("考试不存在");
          canActivate = false;
        }
      }
    }

    // 页面：公开课详情，判断关闭状态，需登录
    if (url.indexOf("/openresourcedetail") != -1) {
      if (!this.authService.userLoginChecker()) {
        this.msg.error("尚未登录");
        canActivate = false;
      } else {
        let targetId = url.split("/")[3];
        let res: any = await this.authService.openCourseClosedChecker(targetId);
        if (res) {
          this.msg.error("公开课未开放");
          canActivate = false;
        }
      }
    }

    // 页面：班级详情，判断关闭状态
    if (url.indexOf("/classinf") != -1) {
      let targetId = url.split("/")[3];
      let res: any = await this.authService.classClosedChecker(targetId);
      if (res) {
        this.msg.error("班级未开放");
        canActivate = false;
      }
    }

    // 页面：班级管理
    if (url.indexOf("/classroom") != -1) {
      let targetId = url.split("/");
      let res: any = await this.classManagementService
        .getClassroomDetail(targetId[3])
        .toPromise();
      if (res.data == null) {
        this.msg.error("班级不存在");
        canActivate = false;
      } else {
        if (this.authService.userIdentityChecker("SUPER_ADMIN")) {
          canActivate = true;
        } else if (this.checkIdentity("ROLE_TEACHER")) {
          let targetUrl = targetId[4];
          if (
            targetUrl == "manage" ||
            targetUrl == "basicinfo" ||
            targetUrl == "headteacher" ||
            targetUrl == "teachersetting" ||
            targetUrl == "tutorsetting" ||
            targetUrl == "coversetting"
          ) {
            this.msg.error("权限不足");
            canActivate = false;
          } else if (
            targetUrl == "coursesetting" ||
            targetUrl == "studentsetting" ||
            targetUrl == "testpaper" ||
            targetUrl == "homeworkmarking"
          ) {
            let res: any = await this.classManagementService
              .getClassTeachers(targetId[3])
              .toPromise();
            let teacherList = [];
            for (const item of res.data.teacherList) {
              teacherList.push(item.id + "");
            }
            canActivate =
              teacherList.indexOf(window.localStorage.getItem("id")) != -1;
          }
        } else {
          canActivate = false;
        }
      }
    }

    // 页面：新闻资讯详情，判断关闭状态
    if (url.indexOf("/newsdetails") != -1) {
      let targetId = url.split("/")[3];
      let res: any = await this.authService.newsClosedChecker(targetId);
      if (res) {
        this.msg.error("资讯未开放");
        canActivate = false;
      }
    }

    // 页面：新闻标签，判断是否存在
    if (url.indexOf("/newstag") != -1) {
      let targetId = url.split("/")[3];
      try {
        let res: any = await this.newsService.getTagname(targetId).toPromise();
        canActivate = typeof res.data == "string";
      } catch (error) {
        this.msg.error("新闻标签不存在");
        canActivate = false;
      }
    }

    // 页面：查看考试详情，判断是否存在，需登录
    if (url.indexOf("/testpaper") != -1 && url.indexOf("/result") != -1) {
      if (!this.authService.userLoginChecker()) {
        this.msg.error("尚未登录");
        canActivate = false;
      } else {
        let targetId = url.split("/");
        let res: any = await this.paperResultDetailService
          .getTestPaperDetail(targetId[3], targetId[5])
          .toPromise();
        if (res.data.SingleList.length < 1) {
          this.msg.error("考试详情不存在");
          canActivate = false;
        }
      }
    }

    // 页面：私信、通知，需登录；对话判断是否存在
    if (url.indexOf("/tidings") != -1) {
      if (!this.authService.userLoginChecker()) {
        this.msg.error("尚未登录");
        canActivate = false;
      } else {
        try {
          let targetId = url.split("/");
          if (targetId[3] == "privatechat") {
            let res: any = await this.privateChatService
              .getConversationId(
                localStorage.getItem("id"),
                localStorage.getItem("contactId")
              )
              .toPromise();
            if (res.data == null) {
              this.msg.error("对话不存在");
              canActivate = false;
            }
          }
        } catch (e) {
          this.msg.error("对话不存在");
          canActivate = false;
        }
      }
    }

    // 页面：用户界面，判断是否存在
    if (url.indexOf("/userpage") != -1) {
      let targetId = url.split("/")[3];
      try {
        let res: any = await this.userManagementService
          .getPersonalDetailById(targetId)
          .toPromise();
        canActivate = typeof res.data.id == "number";
      } catch (error) {
        this.msg.error("用户不存在");
        canActivate = false;
      }
    }

    // 页面：小组系列，判断关闭状态
    if (url.indexOf("/groupmainlist") != -1) {
      let targetUrl = url.split("/");
      if (parseInt(targetUrl[3]) > 0) {
        let res: any = await this.authService.groupClosedChecker(targetUrl[3]);
        if (res) {
          this.msg.error("小组未开放");
          canActivate = false;
        }
      }
    }

    // 页面：个人设置，需登录
    if (url.indexOf("/settings") != -1) {
      if (!this.authService.userLoginChecker()) {
        this.msg.error("尚未登录");
        canActivate = false;
      }
    }

    // 页面：小组话题系列，判断关闭状态
    if (canActivate && url.split("/")[4] == "groupthread") {
      let targetUrl = url.split("/");
      // 页面：创建、编辑小组话题，仅限小组成员访问
      if (
        url.indexOf("/grouptopic") != -1 ||
        url.indexOf("/groupthreadedit") != -1
      ) {
        let res: any = await this.authService.userInGroupChecker(targetUrl[3]);
        if (!res) {
          this.msg.error("您不在此小组内");
          canActivate = false;
        }
      } else if (parseInt(targetUrl[5]) > 0) {
        let res: any = await this.authService.groupThreadClosedChecker(
          targetUrl[5]
        );
        if (res) {
          this.msg.error("小组话题未开放");
          canActivate = false;
        }
      }
    }

    // 页面：课程管理
    if (url.indexOf("/course/") != -1) {
      let targetId = url.split("/");
      try {
        let res: any = await this.courseBaseInfoEditService
          .getCourseInfo(targetId[3])
          .toPromise();
        if (this.authService.userIdentityChecker("SUPER_ADMIN")) {
          canActivate = true;
        } else if (this.checkIdentity("ROLE_TEACHER")) {
          let res: any = await this.classManagementService
            .getClassTeachers(targetId[3])
            .toPromise();
          let teacherList = [];
          for (const item of res.data.teacherList) {
            teacherList.push(item.id + "");
          }
          canActivate =
            teacherList.indexOf(window.localStorage.getItem("id")) != -1;
        } else {
          canActivate = false;
        }
      } catch (e) {
        this.msg.error("课程不存在");
        canActivate = false;
      }
    }

    // 页面：编辑试卷，判断是否存在
    if (canActivate && url.indexOf("/testpaperedit") != -1) {
      let targetId = url.split("/")[5];
      try {
        let res: any = await this.questionCreateService
          .showPaperInfoEdit(targetId)
          .toPromise();
        if (res.data.length < 1) {
          this.msg.error("试卷不存在");
          canActivate = false;
        }
      } catch (e) {
        this.msg.error("试卷不存在");
        canActivate = false;
      }
    }

    // 页面：编辑题目，判断是否存在
    if (canActivate && url.indexOf("/question_create") != -1) {
      let targetId = url.split("/");
      console.log(targetId);
      if (
        (targetId[5] == "single_choice" ||
          targetId[5] == "mutiple_choice" ||
          targetId[5] == "choice" ||
          targetId[5] == "determine") &&
        parseInt(targetId[6]) > 0
      ) {
        try {
          let res: any = await this.questionCreateService
            .getQuestionInfo(parseInt(targetId[6]))
            .toPromise();
          if (res.data == null) {
            this.msg.error("题目不存在");
            canActivate = false;
          }
        } catch (e) {
          this.msg.error("题目不存在");
          canActivate = false;
        }
      }

      // try {
      //   let res: any = await this._questionCreateService.getQuestionInfo(this.questionId).toPromise();
      //   if (res.data.length < 1) {
      //     this.msg.error("试卷不存在");
      //     canActivate = false;
      //   }
      // } catch (e) {
      //   this.msg.error("试卷不存在");
      //   canActivate = false;
      // }
    }

    if (!canActivate && this.router.url == "/") {
      this.router.navigate(["404"], { skipLocationChange: true });
    }

    return canActivate;
  }

  checkIdentity(identity): boolean {
    if (!this.authService.userLoginChecker()) {
      this.msg.error("尚未登录");
      return false;
    }
    if (!this.authService.userIdentityChecker(identity)) {
      this.msg.error("权限不足");
      return false;
    }
    return true;
  }
}
