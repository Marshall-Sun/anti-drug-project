import {Component, OnInit, TemplateRef} from '@angular/core';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {GroupmemberService} from "../../../../service/groupmember/groupmember.service";
import {ActivatedRoute} from '@angular/router';
import {GrouplistService} from '../../../../service/grouplist/grouplist.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupfirstService} from '../../../../service/groupfirst/groupfirst.service';
import { AuthService } from 'src/app/front-desk/auth/auth.service';

@Component({
  selector: 'app-groupmember',
  templateUrl: './groupmember.component.html',
  styleUrls: ['./groupmember.component.less']
})
export class GroupmemberComponent implements OnInit {
  displayData:[];
  imgs:[];
  head:string;
  groupId:string;
  detail:any
  Header = [];
  admin = [];
  member=[];
  userId: string = '1';
  toId:string
  isfocus:boolean;
  threadCreatingForm: FormGroup;
  conversationId: any;
  curUserOwnThisGroup:boolean;

  checkOption = [];
  memberMapOfCheckedId: { [key: string]: boolean } = {};
  adminMapOfCheckedId: { [key: string]: boolean} = {};
  numberOfChecked = 0;
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  isOperating: false;


  constructor( private groupmemberService$: GroupmemberService,
                private  _message: NzMessageService,
               private  _modalService: NzModalService,
               private routeInfo: ActivatedRoute,
               private grouplistService$:GrouplistService,
               private _notification: NzNotificationService,
               private _modal: NzModalService,
               private fb: FormBuilder,
               private groupfirstService$: GroupfirstService,
               private authService: AuthService
               ) {
    this.groupId = this.routeInfo.snapshot.params['id'];
    this.userId = window.localStorage.getItem('id')
  }

  ngOnInit() {
    this.threadCreatingForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
    this.getMember();
    this.authService.userOwnGroupChecker(this.groupId).then(res => {
      this.curUserOwnThisGroup = res;
    });
  }


  getUserDetail(id: string) {
    this.grouplistService$.getUser(id).subscribe(result=>{
      this.detail=result.data;
      this.toId=id;
      this.grouplistService$.isFocus(this.userId,this.toId).subscribe(result=>{
        this.isfocus=result.data
      })
    },error1 => {
      this._notification.create(
        'error',
        '成员信息获取失败',
        `${error1.error}`)
    })
  }


//获取组员
  getMember() {
    this.grouplistService$.getGroupMembers(this.groupId).subscribe(result => {
      this.member = result.data;
      this.Header = this.member.filter(item => item.role=='owner');
      this.admin = this.member.filter(item => item.role == 'viceOwner');
      this.admin.forEach(item => this.adminMapOfCheckedId[item.userId] = false);
      this.member = this.member.filter(item => item.role == 'member');
      this.member.forEach(item => this.memberMapOfCheckedId[item.userId] = false);
    }, error1 => {
      this._notification.create(
        'error',
        '小组组员获取失败',
        `${error1.error}`)
    });

  }

  changeAdminChecked(label: any, value: any) {
    this.adminMapOfCheckedId[label.nzValue] = value;
  }

  changeMemberChecked(label: any, value: any) {
    this.memberMapOfCheckedId[label.nzValue] = value;
  }


  //撤销副组长
  cancel(){
    let idList = [];
    for (let mapOfCheckedIdKey in this.adminMapOfCheckedId) {
      if (this.adminMapOfCheckedId[mapOfCheckedIdKey]) {
        idList.push(parseInt(mapOfCheckedIdKey))
      }
    }
    if (this.admin.length == 0) {
      this._notification.error('本小组暂无副组长！', '')
    } else if (idList.length == 0) {
      this._notification.error('请先选择成员！', '')
    } else {
      this.groupmemberService$.cancelViceOwner(idList, this.groupId).subscribe(result => {
        this._notification.success(
          '成功撤销副组长',
          ''
        );
        this.getMember()
      }, error1 => {
        this._notification.create(
          'error',
          '撤销副组长失败',
          `${error1.error}`)
      })
    }

  }
  //踢出成员
  delete_member(){
    let idList = [];
    for (let mapOfCheckedIdKey in this.memberMapOfCheckedId) {
      if (this.memberMapOfCheckedId[mapOfCheckedIdKey]) {
        idList.push(parseInt(mapOfCheckedIdKey))
      }
    }
    if (this.member.length == 0) {
      this._notification.error('本小组暂无成员！', '')
    } else if (idList.length == 0) {
      this._notification.error('请先选择成员！', '')
    } else {
      this.groupmemberService$.cancelMember(idList, this.groupId).subscribe(result => {
        this._notification.success(
          '成功踢出成员',
          ''
        );
        this.getMember()
      }, error1 => {
        this._notification.create(
          'error',
          '踢出成员失败',
          `${error1.error}`)
      })
    }

  }
  //设置副组长
  setting(){
    let idList = [];
    for (let mapOfCheckedIdKey in this.memberMapOfCheckedId) {
      if (this.memberMapOfCheckedId[mapOfCheckedIdKey]) {
        idList.push(parseInt(mapOfCheckedIdKey))
      }
    }
    if (this.member.length == 0) {
      this._notification.error('本小组暂无成员！', '')
    } else if (idList.length == 0) {
      this._notification.error('请先选择成员！', '')
    } else {
      this.groupmemberService$.setlViceOwner(idList, this.groupId).subscribe(result => {
        this._notification.success(
          '成功设置副组长',
          ''
        );
        this.getMember()
      }, error1 => {
        this._notification.create(
          'error',
          '设置副组长失败',
          `${error1.error}`)
      })
    }

  }

  message(data: any, template: TemplateRef<{}>) {
    this.threadCreatingForm.controls.title.setValue(data.nickName);
    this.groupfirstService$.getConversationId(data.id, this.userId).subscribe(result => {
      this.conversationId = result.data
    });
    const modal = this._modal.create({
      nzTitle: '发送私信',
      nzContent: template,
      nzOkText: '发送',
      nzOnOk: () => {
        for (let i in this.threadCreatingForm.controls) {
          this.threadCreatingForm.controls[i].markAsDirty();
          this.threadCreatingForm.controls[i].updateValueAndValidity()
        }
        if ( !this.threadCreatingForm.controls.content.errors) {
          this.grouplistService$.sendMessage(this.threadCreatingForm.controls.content.value,this.userId,data.id, this.conversationId).subscribe(result => {
            this._notification.create(
              'success',
              '发送成功',
              ''
            )
          },error1 => {
            this._notification.create(
              'error',
              '发送失败',
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
    })
    modal.afterClose.subscribe(result => {
      this.threadCreatingForm.controls.content.setValue('')
    })
  }


// 关注
  focus(){

    if(this.isfocus==false){
      this.grouplistService$.followedUser(this.userId,this.toId).subscribe(result=>{
        this._notification.create(
          'success',
          '关注成功',
          ''
        )
      },error1 => {
        this._notification.create(
          'error',
          '关注失败',
          `${error1.error}`
        )
      })
    }

  }
  //取消关注
  cancelfocus(){
    if(this.isfocus==true){
      this.grouplistService$.delFollowedUser(this.userId,this.toId).subscribe(result=>{
        this._notification.create(
          'success',
          '取消关注成功',
          ''
        )
      },error1 => {
        this._notification.create(
          'error',
          '取消关注失败',
          `${error1.error}`
        )
      })
    }

  }
}
