import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AdminReviewService } from "src/app/service/admin-review/admin-review.service";
import { CourseReplyService } from "src/app/service/course-reply/course-reply.service";
import { AdminCourseService } from "src/app/service/admin-course/admin-course.service";
import { UserManagementService } from "src/app/service/user-management/user-management.service";
import { UserMessageManagementService } from "src/app/service/userMessageManagement/user-message-management.service";
import { ClassManagementService } from "src/app/service/class-management/class-management.service";
import { TagManagementService } from "src/app/service/tag-management/tag-management.service";
import { NewsManagementService } from "src/app/service/news-management/news-management.service";
import { GroupTopicManagementTableService } from "src/app/service/group-topic-management-table/group-topic-management-table.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {
  user = [];
  message = [];
  course = [];
  class = [
    { title: "1", classroomCategory: "测试班级" },
    { title: "1", classroomCategory: "测试班级" },
    { title: "1", classroomCategory: "测试班级" },
    { title: "1", classroomCategory: "测试班级" },
    { title: "1", classroomCategory: "测试班级" },
  ];
  question = [];
  comment = [];
  tag = [];
  news = [];
  topic = [];

  constructor(
    private router: Router,
    private adminReviewService: AdminReviewService,
    private courseReplyService: CourseReplyService,
    private userManagementService: UserManagementService,
    private adminCourseService: AdminCourseService,
    private userMessageManagementService: UserMessageManagementService,
    private classManagementService: ClassManagementService,
    private tagManagementService: TagManagementService,
    private newsManagementService: NewsManagementService,
    private groupTopicManagementTableService: GroupTopicManagementTableService
  ) {}

  ngOnInit(): void {
    this.initUser();
    this.initMessage();
    this.initCourse();
    this.initClass();
    this.initQuestion();
    this.initComment();
    this.initTag();
    this.initNews();
    this.initTopic();
  }


  initUser() {
    this.userManagementService
      .getUserList(1, 5, {
        searchTimeType: "",
        starTime: "",
        role: 0,
        searchType: "",
        searchParameter: "",
      })
      .subscribe((data) => {
        this.user = this.user.concat(data.data);
      });
  }

  initMessage() {
    this.userMessageManagementService
      .getMessageList(1, 5, {
        starTime: 0,
        endTime: 0,
        sendName: "",
        KEY: "",
      })
      .subscribe((data) => {
        this.message = this.message.concat(data.data);
        for (var item of this.message) {
          item.content = item.content.replace(/\<[^\>]*\>/g, "");
        }
      });
  }

  initCourse() {
    this.adminCourseService
      .getCourseList(1, 5, {
        courseClassification: "",
        courseStatus: "",
        courseType: "normal",
        title: "",
        creator: "",
      })
      .subscribe((data) => {
        this.course = this.course.concat(data.data.data);
      });
  }

  initClass() {
    this.classManagementService
      .getClassroomList(1, 5, { className: "" })
      .subscribe((data) => {
        if (this.class != []) {
          this.class = [];
        }
        this.class = this.class.concat(data.data);
      });
  }

  initQuestion() {
    this.courseReplyService
      .getReplyList(1, 5, {
        searchParameter: "",
        keyword: "",
      })
      .subscribe((data) => {
        this.question = this.question.concat(data.data.data);
        for (var item of this.question) {
          item.content = item.content.replace(/\<[^\>]*\>/g, "");
        }
      });
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
        this.comment = this.comment.concat(
          data.data.backGroundClassroomReviewList
        );
        for (var item of this.comment) {
          item.content = item.content.replace(/\<[^\>]*\>/g, "");
        }
      });
  }

  initTag() {
    this.tagManagementService.getTagList().subscribe((data) => {
      this.tag = this.tag.concat(data.data).splice(0, 5);
    });
  }

  initNews() {
    this.newsManagementService
      .getNewsList(1, 5, {
        searchPrograma: 0,
        searchParameter: "",
        searchAttribute: 0,
        searchState: "",
      })
      .subscribe((data) => {
        this.news = this.news.concat(data.data.articleVoList);
      });
  }

  initTopic() {
    this.groupTopicManagementTableService
      .getTopicTableList(1, 5, {
        state: "",
        groupName: "",
        leader: "",
      })
      .subscribe((data) => {
        this.topic = this.topic.concat(data.data.data);
      });
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }
}
