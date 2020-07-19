import { Component, OnInit} from '@angular/core';
import {  FollowManagementService  } from "src/app/service/follow-management/follow-management.service";
import { ActivatedRoute } from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {createBrowserLoggingCallback} from '@angular-devkit/build-angular/src/browser';

@Component({
  selector: 'app-focus-detail',
  templateUrl: './focus-detail.component.html',
  styleUrls: ['./focus-detail.component.less']
})
export class FocusDetailComponent implements OnInit {
  userID:string;
  fromID:string = window.localStorage.getItem("id");
  pageIndex: number=1;
  pageSize:number=8;
  data:any[]=[];
  loading: boolean;
  total: number;

  constructor(
    private actrouter:ActivatedRoute,
    private message: NzMessageService,
    private followmanagementService:FollowManagementService

    ) { }

  ngOnInit() {
    this.userID = location.pathname.split('/')[3];
    this.searchData();
    // if(this.userID != this.fromID){
    //   this.buttondisabled = "true";
    // }
  }
  show1(i) {
    i.isshow = false;
  }

  show2(i) {
    i.isshow = true;
  }
  searchData() {
    this.data = [];
    this.loading = true;
    this.followmanagementService.getMyFocus(this.pageIndex, this.pageSize,this.userID).subscribe(result => {
      this.loading = false;
      this.total = result.data.total;
      this.data = result.data.userShowList;
      this.data.forEach(item => {
        item.isshow = true;
        item.cardshow = true;
      })
    }, error1 => {
      this.loading = false;
      this.message.create('error',`${error1.error}`);
    })

  }

  changePageIndex(pageindex ) {
    this.pageIndex = pageindex;
    this.searchData();
  }

  defollow(id:string){
    console.log(this.fromID,this.userID,id);
    if(this.fromID != this.userID){
      this.message.create('error',"无权操作其他账户");
      return;
    }
    this.followmanagementService.defollow(this.userID,id).subscribe(res=>{
        this.message.create('success',"已取消关注！");
        // console.log(this.data);
        this.data.forEach(item => {
          if(item.userId == id){
            item.cardshow = false;
          }
        })
        // console.log(this.data);
      }
      ,error1=>{
        this.message.create('error',error1.error);
      });
  }
}
