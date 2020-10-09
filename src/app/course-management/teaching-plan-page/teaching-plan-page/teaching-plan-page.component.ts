import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseBaseInfoEditService} from '../../../service/course-base-info-edit/course-base-info-edit.service';
import { CourseManagementBackHalfService } from 'src/app/service/course-management-back-half/course-management-back-half.service';
@Component({
  selector: 'app-teaching-plan-page',
  templateUrl: './teaching-plan-page.component.html',
  styleUrls: ['./teaching-plan-page.component.less']
})
export class TeachingPlanPageComponent implements OnInit {

  courseId: string;
  teachplanId:string;
  location: Location;
  title: string;
  status: string;
  teachersName = [];
  imgUrl: string = '';
  teachplanInf:any;

  api: string = 'http://localhost:9013';

  constructor(
    private router: Router,
    private routerInfo: ActivatedRoute,
    private _courseBaseInfoEditService: CourseBaseInfoEditService,
    private courseManagement$: CourseManagementBackHalfService
    ) {
    this.location = location;
    this.routerInfo.params.subscribe(res => {
      this.courseId = res.id;
      this.teachplanId = res.pid;
    },);
    this._courseBaseInfoEditService.imgChange.subscribe(result => {
      this.getCourseInfo();
    });
    this.courseManagement$.addingStatus.subscribe(value => {
      this.getTeachplanInf();
    })
  }

  ngOnInit() {

  }
  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  getCourseInfo() {
    this._courseBaseInfoEditService.getCourseInfo(this.courseId).subscribe(res => {
      this.title = res.data.baseData.title;
      this.status = res.data.baseData.status;
      this.imgUrl = res.data.baseData.cover? res.data.baseData.cover: '../../../assets/img/timg.jpg';

    })
    this.getTeachplanInf();
  }

  getTeachplanInf(){
    this.courseManagement$.getPlanBasicInfo(this.teachplanId).subscribe(res => {
      this.teachplanInf = res.data;
      this.teachersName = res.data.teachers;
    })
  }
}
