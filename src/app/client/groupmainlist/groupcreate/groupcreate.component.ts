import { Component, OnInit } from '@angular/core';
import {GroupcreateService} from '../../../service/groupcreate/groupcreate.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-groupcreate',
  templateUrl: './groupcreate.component.html',
  styleUrls: ['./groupcreate.component.less']
})
export class GroupcreateComponent implements OnInit {

  title: string = '';
  content: string = '';

  threadCreatingForm: FormGroup;
  userId;
  constructor(private groupcreateService$:GroupcreateService,
              private _notification: NzNotificationService,
              private fb: FormBuilder,
              private route: Router) { }

  ngOnInit() {
    this.userId = window.localStorage.getItem('id');
    this.threadCreatingForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    })
  }
  //创建小组
  addNewGroup(){
    for (let i in this.threadCreatingForm.controls) {
      this.threadCreatingForm.controls[i].markAsDirty();
      this.threadCreatingForm.controls[i].updateValueAndValidity()
    }
    if (!this.threadCreatingForm.controls.title.errors && !this.threadCreatingForm.controls.content.errors) {
      this.groupcreateService$.addNewGroup(this.threadCreatingForm.controls.content.value,this.threadCreatingForm.controls.title.value,this.userId).subscribe(result => {
        this._notification.create(
          'success',
          '发布成功',
          ''
        );
        this.route.navigateByUrl('/client/groupmainlist')
      },error1 => {
        this._notification.create(
          'error',
          '发布失败',
          `${error1.error}`
        )
      })
    } else {
      this._notification.create(
        'error',
        '发生错误！',
        '请正确填写表单信息'
      )
    }

  }
}
