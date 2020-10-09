import { Component, OnInit } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { MaterialService } from 'src/app/service/material/material.service';
@Component({
  selector: 'app-public-information',
  templateUrl: './public-information.component.html',
  styleUrls: ['./public-information.component.less']
})
export class PublicInformationComponent implements OnInit {
  userId = window.localStorage.getItem('id');
  None: any;
  dataList = [
    { id: "001", name: "Test1", date: "2020.2.4", type: "None" },
    { id: "002", name: "Test2", date: "2020.2.4", type: "None" },
    { id: "003", name: "Test3", date: "2020.2.4", type: "None" },
    { id: "004", name: "Test4", date: "2020.2.4", type: "None" },
    { id: "005", name: "Test5", date: "2020.2.4", type: "None" },
    { id: "006", name: "Test6", date: "2020.2.4", type: "None" },
    { id: "007", name: "Test7", date: "2020.2.4", type: "None" },
    { id: "008", name: "Test8", date: "2020.2.4", type: "None" },
    { id: "009", name: "Test9", date: "2020.2.4", type: "None" }
  ];

  tags = ["毒品危害", "互联网+", "毒品预防教育", "教育云", "题库", "课程", "班级", "默认标签"];
  users: any;
  //对话框开关
  //上传
  uploadVisible = false;
  //添加标签
  addtagVisible = false;
  //分享资料
  userShareVisible = false;
  //我的分享
  myShareVisible = false;
  shareUsers: any;
  //分享历史——用户
  myshareuser: any;
  myshareusertotalpage = 1;
  myshareusercurrentpage = 1;
  //分享历史--操作
  sharehistory: any;
  historycurrnetpage = 1;
  historytotalpage = 1
  //批量处理功能
  isbatcheditable = false;
  buttonval = "批量管理";
  currentbatch = [];
  totaltags: any;
  batchtags: any;

  //获取资料相关
  searchKeyword: string = "";
  conditions = {
    materialType: "",
    tagID: "",
    startTime: "",
    endTime: "",
    convertStatus: "",
    isUsed: ""
  }
  totalpage: number = 50;
  currentpage: number = 1;


  constructor(private modalService: NzModalService,
    private message: NzMessageService,
    private http: HttpClient,
    private materialservice: MaterialService, private _notification: NzNotificationService
  ) { }


  ngOnInit() {
    this.getMaterials();
  }

  getMaterials() {
    this.materialservice.getOpenTeachingMaterials(
      this.userId.toString(),
      "1",
      this.conditions.materialType,
      this.conditions.tagID,
      this.conditions.startTime,
      this.conditions.endTime,
      this.searchKeyword,
      this.conditions.convertStatus,
      this.conditions.isUsed
    ).subscribe((res: any) => {
      this.dataList = res.data.data;
      this.totalpage = res.data.total;
      console.log(this.dataList);
      console.log(this.totalpage);
    }, error => {
      this._notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });
  }

  setCondition(conditions: any) {
    this.conditions = conditions;
    console.log(this.conditions);
    this.getMaterials();
  }

  //上传
  showuploadfirm(): void {
    this.uploadVisible = true;
  }
  handleOk_upload(): void {
    this.getMaterials();
    this.uploadVisible = false;
  }
  handleCancel_upload(): void {
    console.log('Button cancel clicked!');
    this.uploadVisible = false;
  }

  //批量处理
  //打开/关闭
  openBatchProcessing(): void {
    this.currentbatch = [];
    this.isbatcheditable = !this.isbatcheditable;
    if (this.isbatcheditable) {
      this.buttonval = "完成管理";
    } else {
      this.buttonval = "批量管理";
    }
  }
  //添加
  addbatchItem(val: any): void {
    if (val[0]) {
      this.currentbatch.push(val[1]);
    }
  }
  //共享
  showShareConfirm(): void {
    if (this.currentbatch.length > 0) {
      var text = "";
      var list = [];
      for (var i = 0; i < this.currentbatch.length; i++) {
        text = text + "  " + this.currentbatch[i].filename;
        list.push(this.currentbatch[i].fileID);
      }
      this.modalService.confirm({
        nzTitle: '<i>要共享以下资料吗？</i>',
        nzContent: '<p>' + text + '</p><b>其他老师可以查看、预览、引用该资料</b>',
        nzOnOk: () => {
          this.materialservice.ShareMaterialList(
            list
          ).subscribe((res: any) => {
            this.openBatchProcessing();
            this.onPageChange();
            this._notification.create(
              'success',
              '提示',
              `分享成功`)
          }, error => {
            this._notification.create(
              'error',
              '发生错误！',
              `${error.error}`)
          });
        }
      });
    } else {
      this.message.info('请选择至少一个资料卡', { nzDuration: 1000 });
    }

  }
  //删除
  showDeleteConfirm(): void {
    if (this.currentbatch.length > 0) {
      var text = "";
      var list = [];
      for (var i = 0; i < this.currentbatch.length; i++) {
        text = text + "  " + this.currentbatch[i].filename;
        list.push(this.currentbatch[i].fileID);
      }
      this.modalService.confirm({
        nzTitle: '<i>是否删除以下资源？</i>',
        nzContent: '<p>' + text + '</p><b>文件若被引用，删除会引起引用课时无法正常使用</b>',
        nzOnOk: () => {
          this.materialservice.DeleteTeachingMaterialList(
            list
          ).subscribe((res: any) => {
            this.onPageChange();
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
    } else {
      this.message.info('请选择至少一个资料卡', { nzDuration: 1000 });
    }

  }
  //添加标签
  showaddTagsfirm(): void {
    if (this.currentbatch.length > 0) {
      this.getAllTag();
      this.addtagVisible = true;
    } else {
      this.message.info('请选择至少一个资料卡', { nzDuration: 1000 });
    }

  }
  handleOk_addTags(): void {
    var text = "";
    var list = [];
    for (var i = 0; i < this.currentbatch.length; i++) {
      text = text + "  " + this.currentbatch[i].filename;
      list.push(this.currentbatch[i].fileID);
    }
    this.modalService.confirm({
      nzTitle: '<i>要为以下资料添加标签吗？</i>',
      nzContent: '<p>' + text + '</p><b>其他老师可以查看、预览、引用该资料</b>',
      nzOnOk: () => {
        this.materialservice.addTagToMaterialList(
          list,this.batchtags
        ).subscribe((res: any) => {
          this.openBatchProcessing();
          this.onPageChange();
          this._notification.create(
            'success',
            '提示',
            `添加成功`)
        }, error => {
          this._notification.create(
            'error',
            '发生错误！',
            `${error.error}`)
        });
      }
    });
    this.addtagVisible = false;
  }
  handleCancel_addTags(): void {
    console.log('Button cancel clicked!');
    this.addtagVisible = false;
  }

  getAllTag() {
    this.materialservice.getAllTag().subscribe((res: any) => {
      this.totaltags = res.data;
    }, error => {
      this._notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });
  }

  //换页
  onPageChange(): void {
    this.currentbatch = [];
    this.isbatcheditable = false;
    this.buttonval = "批量管理";

    this.materialservice.getOpenTeachingMaterials(
      this.userId.toString(),
      this.currentpage.toString(),
      this.conditions.materialType,
      this.conditions.tagID,
      this.conditions.startTime,
      this.conditions.endTime,
      this.searchKeyword,
      this.conditions.convertStatus,
      this.conditions.isUsed
    ).subscribe((res: any) => {
      this.dataList = res.data.data;
    }, error => {
      this._notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });
  }

   //分享资料
   showusersharefirm(): void {
    this.GetAllTeacher();
    this.userShareVisible = true;
  }
  handleOk_usershare(): void {
    this.materialservice.ShareMaterialWithUser(
      this.userId,
      this.shareUsers
    ).subscribe((res: any) => {
      this._notification.create(
        'success',
        '提示',
        `分享成功`)
    }, error => {
      this._notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });
    this.userShareVisible = false;
  }
  handleCancel_usershare(): void {
    console.log('Button cancel clicked!');
    this.userShareVisible = false;
  }

  //我的分享
  showmysharefirm(): void {
    this.GetMaterialSharingHistory();
    this.GetMyShareUser();
    this.myShareVisible = true;
  }
  handleOk_myshare(): void {
    console.log('Button ok clicked!');
    this.myShareVisible = false;
  }
  handleCancel_myshare(): void {
    console.log('Button cancel clicked!');
    this.myShareVisible = false;
  }
  //取消分享
  cancelShare(targetID:any): void {
    this.materialservice.cancelMyShareToUser(
      this.userId,
      targetID
    ).subscribe((res: any) => {
      this.GetMyShareUser();
      this._notification.create(
        'success',
        '提示',
        `取消分享成功`)
    }, error => {
      this._notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });
  }

  GetMaterialSharingHistory(page: number = 1) {
    if (page == 1) {
      this.historycurrnetpage = 1;
    }
    this.materialservice.GetMaterialSharingHistory(
      page,
      10,
      this.userId,
    ).subscribe((res: any) => {
      this.sharehistory = res.data.data;
      this.historytotalpage = res.data.total;
    }, error => {
      this._notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });


  }

  GetMyShareUser(page: number = 1) {
    if (page == 1) {
      this.myshareusercurrentpage = 1;
    }
    this.materialservice.GetMyShareUser(
      page,
      10,
      this.userId,
    ).subscribe((res: any) => {
      this.myshareuser = res.data.data;
      this.myshareusertotalpage = res.data.total;
    }, error => {
      this._notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });
  }

  GetAllTeacher() {
    this.materialservice.GetAllTeacher().subscribe((res: any) => {
      this.users = res.data;
      console.log(res);
    }, error => {
      this._notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });
  }

}
