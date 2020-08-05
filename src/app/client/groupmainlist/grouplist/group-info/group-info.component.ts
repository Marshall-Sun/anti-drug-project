import {Component, OnInit, TemplateRef} from '@angular/core';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {ImagesUploadingService} from "../../../../service/images-uploading/images-uploading.service";
import {GrouplistService} from "../../../../service/grouplist/grouplist.service";
import {GroupmemberService} from "../../../../service/groupmember/groupmember.service";
import {GroupfirstService} from "../../../../service/groupfirst/groupfirst.service";
import {ActivatedRoute, Router} from '@angular/router';
import {GroupnowService} from '../../../../service/groupnow/groupnow.service';
import {GroupEditService} from '../../../../service/groupedit-edit/group-edit.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.less']
})
export class GroupInfoComponent implements OnInit {
  groupId: string;
  topic:string;
  date='2019-8-6';
  number=2;
  content: string = '';
  NewMemberList = [];
  memberMessageList:any;
  detail:any;
  groupIntroduction: any;
  Header: any;
  //userId:string="1";

  hotGroupList = [];
  leader: string;

  filterOptions: {};
  loading: boolean = false;
  data: any[] = [];
  list: Array<{
    loading: boolean; name: any }> = [];
  total: number = 0;
  totalPage: number;
  pageIndex: number = 1;
  img:string;
  fans=2;
  study=3;
  focuson=4;
  edit:string;
  name:string;
  nzValue=0;
  threadCreatingForm: FormGroup;
  title:string;
  userId:string;
  toId:string
  isfocus:boolean;
  myGroup:[];
  conversationId: any;



  constructor(private imagesUploadingService$:ImagesUploadingService,
              public router:Router,
              private grouplistService$:GrouplistService,
              private groupmemberService$:GroupmemberService,
              private groupfirstService$:GroupfirstService,
              private groupnowService$:GroupnowService,
              private  _message: NzMessageService,
                private _notification: NzNotificationService,
              private routeInfo: ActivatedRoute,
              private groupeditEditService$:GroupEditService,
              private _modal: NzModalService,
              private fb: FormBuilder,
              private route: Router
 ) {
    this.groupId = this.routeInfo.snapshot.params['id'];

    this.groupeditEditService$.changeStatus.subscribe(value => {
      this.getGroupIntroduction()
    })
  }

  ngOnInit() {

    this.userId = window.localStorage.getItem('id');

    this.getNewMember();
    // this.getMemberMessage();
    // this.getList();
    this.threadCreatingForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    })
    // this.getMyGroup()
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url)
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

//发布话题
  onclick() {
    if (this.userId) {
      this.router.navigateByUrl("client/groupmainlist/"+this.groupId+"/groupthread/grouptopic")
    } else {
      this._notification.error('请先登录！', '')
    }


  }
  //我的小组
  toclick(url:string){
    this.router.navigateByUrl(url)
  }

  // 搜索
  filterTopicTable(){
    this.grouplistService$.getSearch(this.leader, this.groupId).subscribe(result=>{
      this.router.navigateByUrl(`client/groupmainlist/${this.groupId}/groupsearch?content=${this.leader}`)
    }, error1 => {
      this._notification.error(
        '搜索失败',
        `${error1.error}`
      )
    });


  }

  //获取小组介绍
  getGroupIntroduction(){
    this.grouplistService$.showGroupIntroduction(this.groupId).subscribe(result=>{
      this.groupIntroduction=result.data;
    },error1 => {
      this._notification.create(
        'error',
        '小组介绍获取失败',
        `${error1.error}`)
    })
  }

//获取热门小组
//   getList() {
//     this.groupnowService$.getHotList().subscribe(result => {
//       this.hotGroupList = result.data;
//     }, error1 => {
//       this._notification.create(
//         'error',
//         '热门小组获取失败',
//         `${error1.error}`)
//     })
//   }
  //获取新进小组成员
  getNewMember(){
    this.grouplistService$.getNewMember(this.groupId,3).subscribe(result=>{
        this.NewMemberList=result.data;
      },error1 => {
        this._notification.create(
          'error',
          '新进小组成员获取失败',
          `${error1.error}`)
      }
    )
  }

  //获取气泡框成员信息
  getMemberMessage(){
    this.grouplistService$.showMemberMessage(this.groupId).subscribe(result=>{
      this.memberMessageList=result.data[0];
    },error1 => {
      this._notification.create(
        'error',
        '成员信息获取失败',
        `${error1.error}`)
    })
  }

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
  //获取我的小组组长
// getHeader(){
//     this.grouplistService$.getGroupMembers(this.groupId).subscribe(result=>{
//       this.Header=result.data;
//     },error1 => {
//       this._notification.create(
//         'error',
//         '小组组长获取失败',
//         `${error1.error}`)
//     })
// }
//获取我的小组卡片
//   getMyGroup(){
//       this.grouplistService$.getMyGroup(this.userId,this.groupId).subscribe(result=>{
//         this.Header = result;
//
//       },error1 => {
//         this._notification.create(
//           'error',
//           '我的卡片获取失败',
//           `${error1.error}`)
//       })
//   }
}
