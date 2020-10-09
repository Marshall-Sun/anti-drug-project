import { Component, OnInit } from '@angular/core';
import { OpenresourceService } from 'src/app/service/openresource/openresource.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-dashboard-list-openresource',
  templateUrl: './dashboard-list-openresource.component.html',
  styleUrls: ['./dashboard-list-openresource.component.less']
})
export class DashboardListOpenresourceComponent implements OnInit {

  displayData = [];

  constructor(private router: Router,
    private openService$: OpenresourceService,
    private _notification: NzNotificationService) { }

  ngOnInit() {
    this.openService$.getOpenCourseList().subscribe(result => {
      this.displayData = result;
      this.displayData.splice(0, 4);
    }, error1 => {
      this._notification.create(
        'error',
        '发生错误！',
        `${error1.error}`
      )
    })
  }

  navigateByUrl(url) {
    this.router.navigateByUrl(url);
  }

  videoUrl:string;
  getVideoUrl(courseId){
    this.openService$.getOpenCourseDetailUrl(courseId).subscribe(res=>{
      this.videoUrl = res.data.replace(/\//g,'_');
    })
  }
}
