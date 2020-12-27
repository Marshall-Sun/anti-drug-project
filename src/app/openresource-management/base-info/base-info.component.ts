import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CourseBaseInfoEditService } from "src/app/service/course-base-info-edit/course-base-info-edit.service";
import { NzMessageService } from "ng-zorro-antd";
import { OpenresourceManagementService } from "src/app/service/openresource-management/openresource-management.service";

@Component({
  selector: "app-base-info",
  templateUrl: "./base-info.component.html",
  styleUrls: ["./base-info.component.less"],
})
export class OpenresourceBaseInfoComponent implements OnInit {
  isLoading: boolean = false;
  listOfTag: Object = [
    { id: 1, name: "互联网" },
    { id: 2, name: "禁毒" },
  ];
  listOfCategories: any[] = [];
  validateForm: FormGroup;
  courseId: string;

  baseInfo: any = {
    title: "",
    subtitle: "",
    tags: [],
    categoryId: "",
  };

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private _courseBaseInfoEditService: CourseBaseInfoEditService,
    private openresourceManagementService: OpenresourceManagementService
  ) {
    this.courseId = location.pathname.split("/")[3];
  }

  async ngOnInit() {
    this.validateForm = this.fb.group({
      title: ["", [Validators.required]],
      subtitle: ["", [Validators.nullValidator]],
      tags: [[""], [Validators.nullValidator]],
      categoryId: ["", [Validators.nullValidator]],
    });

    try {
      let [courseInfo, allTags, allCategories]: any[] = await Promise.all([
        this.openresourceManagementService.getOpenCourseById(this.courseId),
        this._courseBaseInfoEditService.getAllTags().toPromise(),
        this._courseBaseInfoEditService.getAllCategories().toPromise(),
      ]);
  
      this.validateForm.patchValue({
        title: courseInfo.data.title,
        subtitle: courseInfo.data.subtitle,
        categoryId: courseInfo.data.categoryId,
        tags: courseInfo.data.tagIdList.map((item: any) => String(item)),
      });
      this.listOfTag = allTags;
      this.listOfCategories = allCategories.data;
    } catch (e) {
      this.msg.error("信息初始化失败");
    }
  }

  async submitForm() {
    this.isLoading = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (!this.validateForm.controls.title.errors) {
      try {
        const baseInfo = this.validateForm.value;
        await this.openresourceManagementService.updateOpenCourse({
          id: Number(this.courseId),
          categoryId: baseInfo.categoryId,
          title: baseInfo.title,
          subtitle: baseInfo.subtitle,
          tagIdList: baseInfo.tags.map((item: any) => Number(item)),
          about: "",
        });
        this.msg.success("保存成功");
        location.reload();
      } catch (e) {
        this.msg.error("保存失败");
      }
    }
    this.isLoading = false;
  }
}
