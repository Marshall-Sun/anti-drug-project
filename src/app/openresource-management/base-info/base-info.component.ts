import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseBaseInfoEditService } from 'src/app/service/course-base-info-edit/course-base-info-edit.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseManagementUtilService } from 'src/app/service/course-management-util/course-management-util.service';

@Component({
  selector: 'app-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.less']
})
export class OpenresourceBaseInfoComponent implements OnInit {
  promptVisable: boolean = false;
  isLoading: boolean = false;
  listOfTag: Object = [{ id: 1, name: "互联网" }, { id: 2, name: "禁毒" }];
  listOfCategories: any[] = [];
  validateForm: FormGroup;

  baseInfo: any = {
    title: "",
    subtitle: "",
    serializeMode: "",
    tags: [],
    categoryId: ""
  }

  location: Location;

  courseId: any;

  submitForm(): void {
    this.isLoading = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (!(this.validateForm.controls.title.errors)) {
      const baseInfo = this.validateForm.value;
      let tags = '';
      console.log(this.validateForm.controls.tags.value)
      if (this.validateForm.controls.tags.value !== [""]) {
        tags = '|';
        tags = tags + this.validateForm.controls.tags.value.join('|');
        baseInfo.tags = tags + "|";
        baseInfo.courseId = this.courseId;
      }
      this._courseBaseInfoEditService.setBaseInfo(baseInfo).subscribe(result => {
        this.isLoading = false;
        this.promptVisable = true;
        this._nzNotificationService.create('success', '保存成功', '基本信息已保存');
        this.route.navigateByUrl('client/course/'+ this.courseId)
      }, error => {
        this.isLoading = false;
        this.promptVisable = false;
        this._nzNotificationService.create('error', '保存失败', '');
      })
    }

    this.isLoading = false;
  }

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder,
    private _courseBaseInfoEditService: CourseBaseInfoEditService,
    private _nzNotificationService: NzNotificationService,
    private _courseManagementUtilService: CourseManagementUtilService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.nullValidator]],
      serializeMode: ['', [Validators.nullValidator]],
      tags: [[""], [Validators.nullValidator]],
      categoryId: ['', [Validators.nullValidator]]
    });
    this.location = location;
    this.courseId = this._courseManagementUtilService.setCourseIdFrom(this.location);
    this.getAllTags();
    this.getAllCategories();

  }


  getAllCategories() {
    this._courseBaseInfoEditService.getAllCategories().subscribe(result => {
      this.listOfCategories = result.data;
    })
  }

  getAllTags() {
    this._courseBaseInfoEditService.getAllTags().subscribe(result => {
      this.listOfTag = result;
      this.getCourseInfo();
    })
  }

  getCourseInfo() {
    this._courseBaseInfoEditService.getCourseInfo(this.courseId).subscribe(res => {
      this.validateForm.patchValue({
        title: res.data.baseData.title,
        subtitle: res.data.baseData.subtitle,
        serializeMode: res.data.baseData.serializemode,
        tags: [].concat(res.data.baseData.tags.substr(1, res.data.baseData.tags.length - 2).split('|')),
        categoryId: res.data.baseData.categoryid
      })
    })


  }




}
