import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from "@angular/router";
import { ManagementDashboardComponent } from 'src/app/class-management/management-dashboard/management-dashboard.component';
import { TeacherManagementService } from "src/app/service/teacher-management/teacher-management.service";
import { FollowManagementService } from "src/app/service/follow-management/follow-management.service";
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.less']
})
export class TeacherComponent implements OnInit {
  fromID:string = window.localStorage.getItem("id");
  displayData: any[] = [];
  loading: boolean;
  total: number;
  pageIndex: number = 1;
  pageSize: number = 8;


  constructor(
    private router: Router,
    private teacherManagementService: TeacherManagementService,
    private followmanagementService: FollowManagementService,
    private message: NzMessageService,
    private notification: NzNotificationService,
  ) {
  }


  ngOnInit() {
    this.searchData();

  }

  show1(i) {
    if(i.id == this.fromID){
      return;
    }
    i.isshow = false;
  }

  show2(i) {
    i.isshow = true;
  }

  searchData() {
    this.displayData = [];
    this.loading = true;
    this.teacherManagementService.getTeacherList(this.pageIndex, this.pageSize).subscribe(result => {
      this.loading = false;
      this.total = result.data.total;
      this.displayData = result.data.teachers;
      this.displayData.forEach(item => {
        item.isshow = true;
        //验证是否已关注
        this.followmanagementService.isFollowed(this.fromID, item.id).subscribe(res => {
          item.isfollowed=res.data;
        });
      })
    }, error1 => {
      this.loading = false;
      this.message.create('error', `${error1.error}`);
    })

  }

  changePageIndex(pageindex) {
    this.pageIndex = pageindex;
    this.searchData();
  }


  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  //关注
  follow_submit(item_id: any) {
    console.log(this.fromID,item_id);
    if(this.fromID == item_id){
      this.message.create('error',"不能关注自己！");
      return;
    }
    this.followmanagementService.followUser(this.fromID,item_id).subscribe(res=>{
      this.message.create('success',"关注成功！");

      this.followmanagementService.isFollowed(this.fromID, item_id).subscribe(res => {
        this.displayData.forEach(item => {
          if(item.id == item_id){
            item.isfollowed = res.data;
          }
        });
      }, error => {
        this.notification.create(
          'error',
          '发生错误！',
          `${error.error}`)
      });
    }
    ,error1=>{
      this.message.create('error',"关注失败！");
    });
    // if (item_id != "1") {
    //   this.followmanagementService.followUser("1", item_id).subscribe((res: any) => {
    //     this.notification.create(
    //       'success',
    //       '提交成功！',
    //       `提交成功`)
    //       this.followmanagementService.isFollowed('1', item_id).subscribe(res => {
    //         this.displayData.forEach(item => {
    //           if(item.id == item_id){
    //             item.isfollowed = res.data;
    //           }
    //         });
    //       }, error => {
    //       this.notification.create(
    //         'error',
    //         '发生错误！',
    //         `${error.error}`)
    //     });
    //   }, error => {
    //     this.notification.create(
    //       'error',
    //       '发生错误！',
    //       `${error.error}`)
    //   });
    // } else {
    //   this.notification.create(
    //     'error',
    //     '发生错误！',
    //     `不能自己关注自己`)
    // }
  }

  //取消关注
  del_follow_submit(item_id: any) {
    this.followmanagementService.defollow(this.fromID, item_id).subscribe((res: any) => {
      this.notification.create(
        'success',
        '提交成功！',
        `提交成功`)

        this.followmanagementService.isFollowed(this.fromID, item_id).subscribe(res => {
          this.displayData.forEach(item => {
            if(item.id == item_id){
              item.isfollowed = res.data;
            }
          });
        }, error => {
        this.notification.create(
          'error',
          '发生错误！',
          `${error.error}`)
      });
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });
  }

  isFollowed(id: string) {
    this.followmanagementService.isFollowed(this.fromID, id).subscribe(res => {
      console.log(res.data);
      return res.data
    });
  }
}
