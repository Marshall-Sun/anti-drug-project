import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-teaching-plan-adding-modal',
  templateUrl: './teaching-plan-adding-modal.component.html',
  styleUrls: ['./teaching-plan-adding-modal.component.less']
})
export class TeachingPlanAddingModalComponent implements OnInit {

  @Input()
  courseId: string;

  
  @Input()
  courseSetTitle: string;

  userId: string = '1';
  editForm: FormGroup;

  timeType: string = 'date';
  expireDate: string = '';
  dates: number = 1;
  dateRange = [];

  constructor(
    private _modal: NzModalRef,
    private fb: FormBuilder,
    private _message: NzMessageService
  ) { }

  ngOnInit() {
    this.userId = window.localStorage.getItem("id");
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      mode: ['freeMode'],
      expireTime: ['forever']
    })
  }

  submit() {
    for (const i in this.editForm.controls) {
      this.editForm.controls[i].markAsDirty();
      this.editForm.controls[i].updateValueAndValidity();
    }
    console.log(this.editForm.controls.expireTime.value);
    console.log(this.timeType);
    console.log(this.expireDate);
    console.log(this.dateRange);
    if (this.editForm.controls.expireTime.value == 'days' && this.timeType == 'date' && this.expireDate == '') {
      this._message.error('截止日期不能为空！');
    }
    if (this.editForm.controls.expireTime.value == 'date' && this.dateRange.length == 0) {
      this._message.error('时间范围不能为空！');
    }
    if (!this.editForm.errors && (this.editForm.controls.expireTime.value == 'forever' || this.expireDate !== '' || this.dateRange.length > 0 || this.timeType == 'days')) {
      let expireTime: any = 0;
      let expiryStartDate = 0;
      let expiryEndDate = 0;
      if (this.editForm.controls.expireTime.value == 'days' && this.timeType == 'date') {
        expireTime = Math.floor(new Date(this.expireDate).getTime() / 1000)
      }
      if (this.editForm.controls.expireTime.value == 'days' && this.timeType == 'days') {
        expireTime = this.dates
      }
      if (this.editForm.controls.expireTime.value == 'date') {
        expiryStartDate = this.dateRange[0].getTime();
        expiryEndDate = this.dateRange[1].getTime()
      }
      let planBody = {
        courseSetId: this.courseId,
        creator: this.userId,
        learnMode: this.editForm.controls.mode.value,
        title:this.editForm.controls.name.value,
        courseSetTitle: this.courseSetTitle,
        expiryMode: this.editForm.controls.expireTime.value,
        expiryDays: expireTime,
        expiryEndDate: Math.floor(expiryEndDate / 1000),
        expiryStartDate: Math.floor(expiryStartDate / 1000)
      };
      this._modal.destroy(planBody)
    }
    return false;
  }


  destroy() {
    this._modal.destroy()
  }

  disabledStartDate = (startValue: Date): boolean => {
    return startValue.getTime() < new Date().getTime()
  };
}
