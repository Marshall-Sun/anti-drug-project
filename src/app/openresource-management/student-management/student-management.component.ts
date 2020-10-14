import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {CourseManagementBackHalfService} from '../../service/course-management-back-half/course-management-back-half.service';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.less']
})
export class OpenresourceStudentManagementComponent implements OnInit {
  courseId: string;
  addingForm: FormGroup;

  studentId: string;
  studentList = [];

  teachplanId: any;
  planList = [];

  constructor(
    private routerInfo: ActivatedRoute,
    private fb: FormBuilder,
    private _modal: NzModalService,
    private courseManagement$: CourseManagementBackHalfService,
    private _notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.courseId = location.pathname.split('/')[3];
    this.teachplanId = location.pathname.split('/')[5];
    this.teachplanId = 1;
    this.searchStudent(this.teachplanId, '')
  }

  openAddingStudentModal(template: TemplateRef<{}>) {
    this.addingForm = this.fb.group({
      username: ['', Validators.required],
      comment: ['']
    });
    const modal = this._modal.create({
      nzTitle: '添加学员',
      nzContent: template,
      nzOkText: '添加',
      nzOnOk: () => {
        this.addingForm.controls.comment.markAsDirty();
        this.addingForm.controls.username.markAsDirty();
        this.addingForm.controls.comment.updateValueAndValidity();
        this.addingForm.controls.username.updateValueAndValidity();
        if (!this.addingForm.controls.comment.errors && !this.addingForm.controls.username.errors) {
          this.courseManagement$.addStudent(this.teachplanId, this.courseId, this.studentId).subscribe(result => {
            let i;
            this.courseManagement$.addingStatus.subscribe(value => i = value);
            this.courseManagement$.addingStatus.next(i+1);
            this._notification.success(
              '添加成功！',
              ''
            )
          }, error1 => {
            this._notification.error(
              '添加失败！',
              `${error1.error}`
            )
          })
        } else {
          return false;
        }
      }
    });
    modal.afterClose.subscribe(() => {
      this.searchStudent(this.teachplanId, '');
      this.studentId = '';
    })
  }


  searchStudent(id: string, name: '') {
    this.courseManagement$.searchAddableStudent(id, name).subscribe(result => {
      this.studentList = result.data
    })
  }

  onInput(value: any) {
    this.searchStudent(this.teachplanId, value)

  }

  getStudentId(data: any) {
    this.studentId = data.nzValue
  }


  onChange(data: any) {
    this.teachplanId = data;
    this.searchStudent(this.teachplanId, '');
  }
}
