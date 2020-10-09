import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/service/courselist-frontend/courselist-frontend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-dashboard-list-course',
  templateUrl: './dashboard-list-course.component.html',
  styleUrls: ['./dashboard-list-course.component.less']
})
export class DashboardListCourseComponent implements OnInit {

  courselist = [];

  constructor(private courseservice: CourseService, private router: Router,
    private route: ActivatedRoute, private _notification: NzNotificationService) { }

  ngOnInit() {
    //服务器请求---待替换
    this.courseservice.getCourses(1, "latest", "0")
      .subscribe((res: any) => {
        this.renderResulsts(res);
      }, error => {
        this._notification.create(
          'error',
          '发生错误！',
          `${error.error}`)
      });
  }

  renderResulsts(res: any): void {
    this.courselist = null;
    if (res) {
      this.courselist = res.data.data;
      this.courselist.splice(8, 8);
    }
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}
