import { Component, OnInit } from '@angular/core';
import {GrouptopicService} from '../../../../service/grouptopic/grouptopic.service';
import {NzMessageService, NzModalService,NzNotificationService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-grouptopic',
  templateUrl: './grouptopic.component.html',
  styleUrls: ['./grouptopic.component.less']
})
export class GrouptopicComponent implements OnInit {

  title: string = '';
  content: string = '';
  threadCreatingForm: FormGroup;
  groupId:string;
  userId:string= window.localStorage.getItem('id');

  constructor(
    private grouptopicService$:GrouptopicService,
    private _notification: NzNotificationService,
    private fb: FormBuilder,
    private route: Router
  ) { }

  ngOnInit() {
    let pathList = location.pathname.split('/');
    this.groupId = pathList[3];
    this.threadCreatingForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    })
  }
  //发布;
  createGroupThread(){
    for (let i in this.threadCreatingForm.controls) {
      this.threadCreatingForm.controls[i].markAsDirty();
      this.threadCreatingForm.controls[i].updateValueAndValidity()
    }
    if (!this.threadCreatingForm.controls.title.errors && !this.threadCreatingForm.controls.content.errors) {
      this.grouptopicService$.createGroupThread(this.threadCreatingForm.controls.content.value,this.threadCreatingForm.controls.title.value,this.groupId,this.userId).subscribe(result => {
        this._notification.create(
          'success',
          '发布成功',
          ''
        );
        this.route.navigateByUrl(`/client/groupmainlist/${this.groupId}`)
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
