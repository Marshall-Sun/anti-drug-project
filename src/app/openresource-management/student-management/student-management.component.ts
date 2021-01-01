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
