import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MyteachingService} from '../../../../service/myteaching/myteaching.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.less']
})
export class CreateCourseComponent implements OnInit {

  location: Location;

  userId = parseInt(window.localStorage.getItem('id'));
  classroomId: string;
  title:string;
  type:string = '';
  classroom: any;

  validateForm: FormGroup;

  constructor(
    private routeInfo: ActivatedRoute,
    private router: Router,
     private MyteachingService$:MyteachingService,
    private _notification: NzNotificationService,
    private fb: FormBuilder

  ) { }

  ngOnInit() {
    this.location = location;
    this.classroomId = this.routeInfo.snapshot.params['id'];
    this.validateForm = this.fb.group({
      title: ['', Validators.required],
    })
  }



//取消创建
  Cancel() {
    this.router.navigateByUrl(`/client/mine/teachingcourse`)
  }

  changeType(type: string) {
    this.type = type;
  }
  create() {
    this.validateForm.controls.title.markAsDirty();
    this.validateForm.controls.title.updateValueAndValidity();
    if (!this.validateForm.controls.title.errors && this.type !== '') {
      this.MyteachingService$.postCreateCourse(this.validateForm.controls.title.value, this.type, this.userId).subscribe(result => {
        this._notification.success(
          '创建成功！',
          ''
        )
      }, error1 => {
        this._notification.error(
          '创建失败！',
          `${error1.error}`
        )
      })
    }

  }
}
