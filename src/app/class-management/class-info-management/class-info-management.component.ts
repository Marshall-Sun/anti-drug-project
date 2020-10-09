import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClassManagementService} from '../../service/class-management/class-management.service';
import {ClientClassManagementService} from '../../service/client-class-management/client-class-management.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {TagManagementService} from '../../service/tag-management/tag-management.service';
import {CategoryService} from '../../service/category/category.service';
import {AdminCategoryService} from '../../service/admin-category/admin-category.service';

@Component({
  selector: 'app-class-info-management',
  templateUrl: './class-info-management.component.html',
  styleUrls: ['./class-info-management.component.less']
})
export class ClassInfoManagementComponent implements OnInit {

  classroomId: string;

  classInfoEditForm: FormGroup;
  classroom: any;

  tagOptions = [];
  classificationOptions = [];

  usefulLife: number;
  expirationDate: Date;
  
  userId;

  constructor(
    private routerInfo: ActivatedRoute,
    private fb: FormBuilder,
    private classroomService$: ClientClassManagementService,
    private _notification: NzNotificationService,
    private tagManagementService$: TagManagementService,
    private categoryService$: AdminCategoryService
  ) { }

  ngOnInit() {
    this.classroomId = location.pathname.split('/')[3];
    this.userId = window.localStorage.getItem('id');
    this.classInfoEditForm = this.fb.group({
      name: ['', Validators.required],
      intro: [''],
      tags: [[]],
      isShow: [],
      expireType: [''],
      classification: [''],
      usefulLife: [''],
      dateRange: ['']
    });
    this.getClassrooomDetail();
    this.getIntroduction();
    this.getTagList();
    this.getCategoryList();
  }

  getClassrooomDetail() {
    this.classroomService$.getClassroomDetail(this.classroomId).subscribe(result => {
      this.classroom = result.data;
      this.classInfoEditForm.controls.name.setValue(this.classroom.title);
      this.classInfoEditForm.controls.expireType.setValue(this.classroom.expiryMode);
      this.classInfoEditForm.controls.classification.setValue(this.classroom.categoryId);
      this.classInfoEditForm.controls.tags.setValue(this.classroom.tagIdList);
      this.classInfoEditForm.controls.isShow.setValue(this.classroom.isClose);
      if (this.classroom.expiryMode == 'days') {
        this.classInfoEditForm.controls.usefulLife.setValue(this.classroom.expiryString.split('天')[0].trim())
      }
      if (this.classroom.expiryMode == 'date') {
        this.classInfoEditForm.controls.dateRange.setValue(this.classroom.expiryString.split('天')[0].trim() * 1000)
      }
    }, error1 => {
      this._notification.error(
        '发生错误！',
        `${error1.error}`
      )
    })
  }

  getIntroduction() {
    this.classroomService$.getIntroduction(this.classroomId).subscribe(result => {
      this.classInfoEditForm.controls.intro.setValue(result.data)
    })
  }

  getTagList() {
    this.tagManagementService$.getTagList().subscribe(result => {
      this.tagOptions = result.data
    }, error1 => {
      this._notification.error(
        '发生错误！',
        `${error1.error}`
      )
    })
  }

  getCategoryList() {
    this.categoryService$.getClassCategory().subscribe(result => {
      this.classificationOptions = result.data
    }, error1 => {
      this._notification.error(
        '发生错误！',
        `${error1.error}`
      )
    })
  }

  submitForm() {
    for (const i in this.classInfoEditForm.controls) {
      this.classInfoEditForm.controls[i].markAsDirty();
      this.classInfoEditForm.controls[i].updateValueAndValidity();
    }
    let expiryvalue = 0;
    if (this.classInfoEditForm.controls.expireType.value == 'days') {
      expiryvalue = this.classInfoEditForm.controls.usefulLife.value
    } else if (this.classInfoEditForm.controls.expireType.value == 'date') {
      expiryvalue = this.classInfoEditForm.controls.dateRange.value.getTime()
    }
    if (this.classInfoEditForm.status == 'VALID') {
      this.classroomService$.setClassInfo(
        this.classroomId,
        this.classInfoEditForm.controls.name.value,
        this.classInfoEditForm.controls.intro.value,
        this.classInfoEditForm.controls.tags.value,
        this.classInfoEditForm.controls.isShow.value,
        this.classInfoEditForm.controls.expireType.value,
        this.classInfoEditForm.controls.classification.value,
        this.classInfoEditForm.controls.usefulLife.value,
        this.userId
        ).subscribe(result => {
        this.getClassrooomDetail();
        this.getIntroduction();
        this.getTagList();
        this.getCategoryList();
          this._notification.success(
            '修改成功！',
            ''
          )
      }, error1 => {
          this._notification.error(
            '发生错误！',
            `${error1.error}`
          )
      })
    }
  }

}
