import { Component, OnInit, EventEmitter } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { MaterialService } from 'src/app/service/material/material.service';
@Component({
  selector: 'app-td-card',
  templateUrl: './td-card.component.html',
  styleUrls: ['./td-card.component.less'],
  inputs: ["data", "isbatcheditable"],
  outputs: ["batchselected","updatedata"]
})
export class TdCardComponent implements OnInit {
  //批量处理相关
  isbatcheditable = false;
  isselected = false;
  batchselected: EventEmitter<any[]>;
  updatedata: EventEmitter<any[]>;

  data: any;
  userId = 1;

  //对话框开关
  //预览
  previewVisible = false;
  //编辑
  editVisible = false;
  edit_title: string;
  total_tags: any;
  edit_tags: any;
  edit_brief: string;
  edit_share: any;
  isshare: string;

  constructor(private modalService: NzModalService, private message: NzMessageService, private router: Router,
    private materialservice: MaterialService, private _notification: NzNotificationService) {
    this.batchselected = new EventEmitter();
    this.updatedata = new EventEmitter();
  }

  ngOnInit() {
  }

  //对话框操作
  //预览
  showpreviewfirm(): void {
    this.previewVisible = true;
  }
  handleOk_preview(): void {
    console.log('Button ok clicked!');
    this.previewVisible = false;
  }
  handleCancel_preview(): void {
    console.log('Button cancel clicked!');
    this.previewVisible = false;
  }
  //更新资料信息
  GetMaterialInf() {
    this.materialservice.GetMaterial(
      this.data.fileID,
    ).subscribe((res: any) => {
      this.edit_title = res.data.filename;
      this.edit_tags = [];
      this.edit_brief = res.data.description;
      this.edit_share = parseInt(res.data.isPublic);
      for (var i = 0; i < res.data.tagList.length; i++) {
        this.edit_tags.push(res.data.tagList[i].id);
      }
      if (this.edit_share == 1) {
        this.isshare = "Share";
      } else {
        this.isshare = "NotShare";
      }
      console.log(this.edit_share)
    }, error => {
      this._notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });
  }


  //收藏
  collectMaterial(): void {
    this.materialservice.collectMaterial(
      this.data.fileID,
      "1",
    ).subscribe((res: any) => {
      this.data.isCollected = 1;
      this._notification.create(
        'success',
        '提示',
        `收藏成功`)
    }, error => {
      this._notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });
  }
  //取消收藏
  UncollectMaterial(): void {
    this.materialservice.UncollectMaterial(
      this.data.fileID,
      "1",
    ).subscribe((res: any) => {
      this.data.isCollected = 0;
      this._notification.create(
        'success',
        '提示',
        `取消收藏成功`)
    }, error => {
      this._notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });
  }
  //设置单个资料是否共享
  setSharing(ispublic: any): void {
    this.materialservice.setTeachingMaterialPublicity(
      this.data.fileID,
      ispublic,
    ).subscribe((res: any) => {
      this.data.isPublic = ispublic;
      this._notification.create(
        'success',
        '提示',
        `设置成功`)
    }, error => {
      this._notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });
  }
  //编辑
  showeditfirm(): void {
    this.getAllTag();
    this.GetMaterialInf();
    this.editVisible = true;
  }
  handleOk_edit(): void {
    if (this.isshare == "Share") {
      this.edit_share = 1;
    } else {
      this.edit_share = 0;
    }
    if(this.edit_title!=""){
      this.materialservice.EditMaterial(
        this.edit_brief,
        this.data.fileID,
        this.edit_title,
        this.edit_share,
        this.edit_tags,
      ).subscribe((res: any) => {
        this.updatedata.emit();
        this._notification.create(
          'success',
          '提示',
          `编辑成功`)
      }, error => {
        this._notification.create(
          'error',
          '发生错误！',
          `${error.error}`)
      });
    }else{
      this._notification.create(
        '提示',
        '发生错误！',
        `文件名不能为空`)
    }
    this.editVisible = false;
  }
  handleCancel_edit(): void {
    console.log('Button cancel clicked!');
    this.editVisible = false;
  }
  //下载
  downloadMessage(): void {
    window.open('http://172.16.10.94:9013'+this.data.fileURL);
    this.message.info('开始下载', { nzDuration: 1000 });
  }
  //共享
  showShareConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<i>要共享吗？</i>',
      nzContent: '<b>其他老师可以查看、预览、引用该资料</b>',
      nzOnOk: () => console.log('OK')
    });
  }
  //删除
  DeleteMaterial(): void {
    this.modalService.confirm({
      nzTitle: '<i>是否确认删除资源？</i>',
      nzContent: '<b>文件若被引用，删除会引起引用课时无法正常使用</b>',
      nzOnOk: () => {
        this.materialservice.DeleteTeachingMaterial(
          this.data.fileID,
        ).subscribe((res: any) => {
          this.updatedata.emit();
          this._notification.create(
            'success',
            '提示',
            `删除成功`)
        }, error => {
          this._notification.create(
            'error',
            '发生错误！',
            `${error.error}`)
        });
      }
    });
  }

  //批量选择
  Batchselecte() {
    if (this.isselected) {
      this.batchselected.emit([true, this.data]);
    } else {
      this.batchselected.emit([false, this.data]);
    }
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }


  getAllTag() {
    this.materialservice.getAllTag().subscribe((res: any) => {
      this.total_tags = res.data;
    }, error => {
      this._notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });
  }
}
