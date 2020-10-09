import {Component, OnInit, TemplateRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {GroupfirstService} from "../../../../service/groupfirst/groupfirst.service";
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupEditService} from '../../../../service/groupedit-edit/group-edit.service';
import {GroupmainlistService} from '../../../../service/groupmainlist/groupmainlist.service';
import {GrouphotService} from '../../../../service/grouphot/grouphot.service';
import {GrouplistService} from '../../../../service/grouplist/grouplist.service';
import {isBoolean} from 'util';

@Component({
  selector: 'app-groupfirst',
  templateUrl: './groupfirst.component.html',
  styleUrls: ['./groupfirst.component.less']
})
export class GroupfirstComponent implements OnInit {
  inputValue: string;
  selectValue :string = '最新发帖';
  nzValueQB=1
  nzValueJ=0
  nzValueQBJ:boolean = false;
  detail: any;
  toId:string
  isfocus:boolean;
  groupId:string;

  conversationId: string;



  loading: boolean = false;
  total: number = 0;
  totalPage: number;
  pageIndex: number = 1;
  data: any[] = [];
  list: Array<{
    id: any;
    loading: boolean; name: any }> = [];

  filterOptions: {};
  ThreadList:[];
  threadCreatingForm: FormGroup;
  title:string;
  userId:string="1"
  content:string;

  img='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
  userID:string

  constructor(
    private http: HttpClient,
    private groupfirstService$: GroupfirstService,
    private  _message: NzMessageService,
    private _notification: NzNotificationService,
    private routeInfo: ActivatedRoute,
    private fb: FormBuilder,
    private groupeditEditService$:GroupEditService,
    private groupmainlistService$:GroupmainlistService,
    private grouphotService$:GrouphotService,
    private _modal: NzModalService,
    private grouplistService$:GrouplistService,
    private route: Router,

  ) { }

  ngOnInit():void {
    // this.userID = this.routeInfo.snapshot.params['id'];
    let pathList = location.pathname.split('/');
    this.groupId = pathList[3];
    this.checkAll();
    this.threadCreatingForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    })
    this.checkAll()

  }

  navigateByUrl(url: string) {
    this.route.navigateByUrl(url)
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

    // 修改全部和精华
  checkAll() {

    if (this.nzValueQB == 0) {
      this.nzValueQB = 1;
      this.nzValueJ = 0;
      this.nzValueQBJ = false
    }
    this.groupfirstService$.showReply(this.nzValueQBJ,this.selectValue,this.groupId).subscribe(result=>{
        this.ThreadList=result;
      },error1 => {
        this._notification.create(
          'error',
          '回复话题获取失败',
          `${error1.error}`)
      }
    )
  }

  checkElite() {

    if (this.nzValueJ == 0) {
      this.nzValueJ = 1;
      this.nzValueQB = 0;
      this.nzValueQBJ = true
    }
    this.groupfirstService$.showReply(this.nzValueQBJ,this.selectValue,this.groupId).subscribe(result=>{
        this.ThreadList=result;
      },error1 => {
        this._notification.create(
          'error',
          '回复话题获取失败',
          `${error1.error}`)
      }
    )
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
    this.isfocus = true

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

    this.isfocus = false

  }

  changeSelectValue(value: string) {
    this.groupfirstService$.showReply(this.nzValueQBJ,value,this.groupId).subscribe(result=>{
        this.ThreadList=result;
      },error1 => {
        this._notification.create(
          'error',
          '回复话题获取失败',
          `${error1.error}`)
      }
    )
  }


  //获取话题回复列表
  // getReplyThread(){
  //   this.groupfirstService$.showReply(this.nzValueQBJ,this.selectValue,this.groupId).subscribe(result=>{
  //       this.ThreadList=result;
  //     },error1 => {
  //       this._notification.create(
  //         'error',
  //         '回复话题获取失败',
  //         `${error1.error}`)
  //     }
  //   )
  // }
  getUserDetail(id:string) {
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
}
