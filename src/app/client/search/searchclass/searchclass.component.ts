import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SearchService } from "../../../service/search/search.service";

@Component({
  selector: "app-searchclass",
  templateUrl: "./searchclass.component.html",
  styleUrls: ["./searchclass.component.less"],
})
export class SearchclassComponent implements OnInit {
  keyword: string;
  total: number;
  totalPage: number;
  loading: boolean;
  // dataList = [];
  // displayData = [];

  CourseSetList = [];
  ArticleList = [];
  ClassroomList = [];
  GroupList = [];
  OpenCourseList = [];

  displayCourseSetData = [];
  displayArticleData = [];
  displayClassroomData = [];
  displayGroupData = [];
  displayOpenCourseData = [];

  constructor(
    private router: Router,
    private searchService$: SearchService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.keyword = this.activatedRoute.snapshot.queryParams["keyword"];
    if (typeof this.keyword == "string" && this.keyword != "undefined") {
      this.search();
    } else {
      this.router.navigateByUrl("/client");
    }
  }

  navigateByUrl(url: string) {
    console.log(url);
    this.router.navigateByUrl(url);
  }

  search() {
    this.displayCourseSetData = [];
    this.displayArticleData = [];
    this.displayClassroomData = [];
    this.displayGroupData = [];
    this.displayOpenCourseData = [];

    this.loading = true;
    this.searchService$.getSearchResults(this.keyword).subscribe((result) => {
      this.loading = false;

      this.CourseSetList = result.data.courseSetList;
      this.ArticleList = result.data.articleList;
      this.ClassroomList = result.data.classroomList;
      this.GroupList = result.data.groupList;
      this.OpenCourseList = result.data.openCourseList;

      this.displayCourseSetData = this.CourseSetList;
      this.displayArticleData = this.ArticleList;
      this.displayClassroomData = this.ClassroomList;
      this.displayGroupData = this.GroupList;
      this.displayOpenCourseData = this.OpenCourseList;

      console.log(this.displayClassroomData);
    });
  }
}
