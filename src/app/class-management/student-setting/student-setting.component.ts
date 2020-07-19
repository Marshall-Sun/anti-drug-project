import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {ClientClassManagementService} from '../../service/client-class-management/client-class-management.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-student-setting',
  templateUrl: './student-setting.component.html',
  styleUrls: ['./student-setting.component.less']
})
export class StudentSettingComponent implements OnInit {

  classroomId: string;

  addingForm: FormGroup;

  studentList = [];
  studentId = '';

  constructor(
    private routerInfo: ActivatedRoute,
    private fb: FormBuilder,
    private _modal: NzModalService,
    private classroomManage$: ClientClassManagementService,
    private _notification: NzNotificationService
  ) {
    this.classroomId = location.pathname.split('/')[3];
  }

  ngOnInit() {
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
          this.classroomManage$.addStudent(this.classroomId, this.studentId, this.addingForm.controls.comment.value).subscribe(result => {
            let i;
            this.classroomManage$.addingStatus.subscribe(value => i = value);
            this.classroomManage$.addingStatus.next(i+1);
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
      this.searchStudent(this.classroomId, '');
      this.studentId = '';
    })
  }

  searchStudent(id: string, name: '') {
    this.classroomManage$.searchStudentWhenAdding(id, name).subscribe(result => {
      this.studentList = result.data
    })
  }

  onInput(value: any) {
    this.searchStudent(this.classroomId, value)

  }

  getStudentId(data: any) {
    this.studentId = data.nzValue
    console.log(this.studentId)
  }

}
