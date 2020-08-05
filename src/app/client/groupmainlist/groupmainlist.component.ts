import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {NzMessageService, NzModalService,NzNotificationService} from "ng-zorro-antd";
import {GroupmainlistService} from "../../service/groupmainlist/groupmainlist.service";
import {GrouplistService} from '../../service/grouplist/grouplist.service';

@Component({
  selector: 'app-groupmainlist',
  templateUrl: './groupmainlist.component.html',
  styleUrls: ['./groupmainlist.component.less']
})
export class GroupmainlistComponent implements OnInit {
  data: any[] = [];
  list: Array<{ loading: boolean; name: any }> = [];
  search:string;
  newGroupList:[];
  joinGroupList = [];
  memberMessageList:[];
  groupnumber:string;

  filterOptions: {};
  checkOption = [];
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};

  total: number = 0;
  totalPage: number;
  pageIndex: number = 1;
  loading: boolean = false;
  detail:any
  Header:[]

  team=1;
  message=2;
  study=1;
  fans=2;
  focuson=3;

  userId:string;



  constructor(public router:Router,
              private http: HttpClient,
              private  _message: NzMessageService,
              private groupmainlistService$:GroupmainlistService,
              private _notification: NzNotificationService,
              private grouplistService$:GrouplistService,
              private routeInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = window.localStorage.getItem('id');
    this.getNewGroup();
    this.getJoinGroup();
    this.getMyGroup();
  }


  tclick(){
    this.router.navigateByUrl("client/mine/mygroup")
  }
  oclick(){
    this.router.navigateByUrl("client/groupcreate")
  }
  // 搜索

  filterTopicTable() {
    this.router.navigateByUrl(`client/groupmainlist/groupmainsearch?search=${this.search}`)

  }


  //获取新晋小组
  getNewGroup(){
    this.groupmainlistService$.getNewGroup(5).subscribe(result => {
      this.newGroupList = result.data;
    }, error1 => {
      this._notification.create(
        'error',
        '新晋小组获取失败',
        `${error1.error}`)
    })
  }
  navigateByUrl(url: string) {
    this.router.navigateByUrl(url)
  }
  //获取我加入的小组
  getJoinGroup(){
    this.groupmainlistService$.getJoinGroup(this.userId).subscribe(result => {
      this.joinGroupList = result.data;
    }, error1 => {
      this._notification.create(
        'error',
        '我的小组获取失败',
        `${error1.error}`)
    })
  }



//获取气泡框成员信息

  getUserDetail(id:string) {
    this.grouplistService$.getUser(id).subscribe(result=>{
      this.detail=result.data;
    },error1 => {
      this._notification.create(
        'error',
        '成员信息获取失败',
        `${error1.error}`)
    })
  }
//获取我的小组
  getMyGroup() {
    this.grouplistService$.getUser(this.userId).subscribe(result=>{
      this.Header=result.data
    },error1 => {
      this._notification.create(
        'error',
        '我的小组获取失败',
        `${error1.error}`)
    })
  }
}
