import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef, NzNotificationService} from 'ng-zorro-antd';
import {WebsitesAnnouncementService} from '../../../service/websites-announcement/websites-announcement.service';

@Component({
  selector: 'app-announcement-edit-modal',
  templateUrl: './announcement-edit-modal.component.html',
  styleUrls: ['./announcement-edit-modal.component.less']
})
export class AnnouncementEditModalComponent implements OnInit {

  @Input()
  data: any;
  @Input()
  mode: string;
  @Input()
  userId: string;


  announcementEditForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _modal: NzModalRef,
    private websiteAnnoucementService$: WebsitesAnnouncementService,
    private _notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.announcementEditForm = this.fb.group({
      content: ['', Validators.required],
      releaseTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
    if (this.mode == 'edit' && this.data) {
      this.announcementEditForm.controls.content.setValue(this.data.content);
      this.announcementEditForm.controls.releaseTime.setValue(new Date(this.data.startTime * 1000));
      this.announcementEditForm.controls.endTime.setValue(new Date(this.data.endTime * 1000));
    }
  }

  submit() {
    let shouldBeClosed = false;
    this.announcementEditForm.markAllAsTouched();
    this.announcementEditForm.controls.content.updateValueAndValidity();
    this.announcementEditForm.controls.releaseTime.updateValueAndValidity();
    this.announcementEditForm.controls.endTime.updateValueAndValidity();
    if (this.announcementEditForm.status == 'VALID') {
      if (this.mode == 'create') {
        this.websiteAnnoucementService$.createAnnouncement(this.announcementEditForm.controls.content.value, Math.round(this.announcementEditForm.controls.endTime.value.getTime() / 1000), Math.round(this.announcementEditForm.controls.releaseTime.value.getTime() / 1000), this.userId).subscribe(result => {
          this._notification.success('成功创建新公告！', '');
          this._modal.destroy('success')
        }, error1 => this._notification.error('发生错误！', `${error1.error}`))
      } else {
        this.websiteAnnoucementService$.editAnnoucement(this.announcementEditForm.controls.content.value, Math.round(this.announcementEditForm.controls.endTime.value.getTime() / 1000), this.data.id, Math.round(this.announcementEditForm.controls.releaseTime.value.getTime() / 1000)).subscribe(result => {
          this._notification.success('成功修改公告！', '');
          this._modal.destroy('success')
        }, error1 => this._notification.error('发生错误！', `${error1.error}`))
      }
    }

    return shouldBeClosed;
  }

  destroy() {
    this._modal.destroy()
  }

}
