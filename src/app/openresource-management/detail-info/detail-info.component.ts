import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';
import { CourseDetailInfoEditService } from 'src/app/service/course-detail-info-edit/course-detail-info-edit.service';
import { CourseManagementUtilService } from 'src/app/service/course-management-util/course-management-util.service';
import { CourseBaseInfoEditService } from 'src/app/service/course-base-info-edit/course-base-info-edit.service';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.less']
})
export class OpenresourceDetailInfoComponent implements OnInit {
  validateForm: FormGroup;
  goals: any[] = [];
  audiences: any[] = [];
  promptVisable: boolean = false;
  isLoading: boolean = false;
  location: Location;
  courseId: any;

  //临时变量
  goal: string = '';
  audience: string = '';
  constructor(
    private fb: FormBuilder,
    private _nzNotificationService: NzNotificationService,
    private _courseBaseInfoEditService: CourseBaseInfoEditService,
    private _courseDetailInfoEditService: CourseDetailInfoEditService,
    private _courseManagementUtilService: CourseManagementUtilService
  ) { }

  ngOnInit() {
    this.location = location;
    this.courseId = this._courseManagementUtilService.setCourseIdFrom(this.location);
    this.validateForm = this.fb.group({
      courseId: [null, [Validators.nullValidator]],
      summary: [null, [Validators.nullValidator]],
      goals: [null, [Validators.nullValidator]],
      audiences: [null, [Validators.nullValidator]]
    });
    this.getCourseInfo();
  }

  getCourseInfo() {
    this._courseBaseInfoEditService.getCourseInfo(this.courseId).subscribe(res => {
      this.goals = (res.data.baseData.goals != '') ? res.data.baseData.goals.substr(1, res.data.baseData.goals.length - 2).split('|') : [];
      this.audiences = (res.data.baseData.audiences != '') ? res.data.baseData.audiences.substr(1, res.data.baseData.audiences.length - 2).split('|') : [];
      this.validateForm.patchValue({
        summary: res.data.baseData.summary,
        goals: this.goals,
        audiences: this.audiences
      })
    })
  }

  submitForm(): void {
    this.isLoading = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    let detailInfo: any = {
      courseId: this.courseId,
      summary: this.validateForm.controls.summary.value,
      goals: "|" + this.goals.join('|') + "|",
      audiences: "|" + this.audiences.join('|') + "|"
    }
    console.log(detailInfo);

    this._courseDetailInfoEditService.setDetailInfo(detailInfo).subscribe(result => {
      this.promptVisable = true;
      this.isLoading = false;
    }, err => {
      this._nzNotificationService.create('error', '保存失败!', `${err}`);
      this.isLoading = false;
    })
  }

  drop(event: CdkDragDrop<any[]>, key: string) {
    if (key == 'goal')
      moveItemInArray(this.goals, event.previousIndex, event.currentIndex);
    else
      moveItemInArray(this.audiences, event.previousIndex, event.currentIndex);
  }



  addItem(key: string) {
    if (key == 'goal') {
      if (this.goal == '') return;
      this.goals.push(this.goal);
      this.goal = '';
    }
    else {
      if (this.audience == '') return;
      this.audiences.push(this.audience);
      this.audience = '';
    }
  }
  removeItem(value: string, key: string) {
    if (key == 'goal')
      this.goals.some((item, i) => {
        if (item == value) {
          this.goals.splice(i, 1);
          return true;
        }
      });
    else
      this.audiences.some((item, i) => {
        if (item == value) {
          this.audiences.splice(i, 1);
          return true;
        }
      });
  }

}
