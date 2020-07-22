import { Component, OnInit, OnDestroy } from '@angular/core';
import { addDays, differenceInMilliseconds } from 'date-fns';
import {ActivatedRoute, Router} from '@angular/router';
import {OpenresourceService} from '../../service/openresource/openresource.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {OpenresourcedetailService} from '../../service/openresourcedetail/openresourcedetail.service';
import {FollowManagementService} from '../../service/follow-management/follow-management.service';
import {TeacherManagementService} from '../../service/teacher-management/teacher-management.service';
@Component({
  selector: 'app-openresourcedetail',
  templateUrl: './openresourcedetail.component.html',
  styleUrls: ['./openresourcedetail.component.less'],
})
export class OpenresourcedetailComponent implements OnInit {
  userId
  displayData: any;
  movieTitle:any;
  hitNum:any;
  postNum:any;
  courseId: number;
  likeNum:number;
  subtitle:string;
  teacherNickName:string;
  teacherTitle:string;
  videoCover:string;
  teacherId:string;
  fellowNum:number;
  attentionNum:number;
  isCollected:number;
  teacherAvatar:string;
  isFollowed: boolean
  likeBtnState:number;
  collectBtnState:number;
  courseList = [];
  courseListLoading:boolean = true;
  videoUrl:string;
  constructor(private router: Router,
              private opendetailService$: OpenresourcedetailService,
              private openService$: OpenresourceService,
              private followMngService$: FollowManagementService,
              private routerInfo: ActivatedRoute,
              private notification: NzNotificationService,) { }

  ngOnInit() {
    this.userId = localStorage.getItem('id');
    this.courseId = parseInt(this.routerInfo.snapshot.params['id']);
    this.videoUrl = this.routerInfo.snapshot.params['url'];
    this.GetData()
  }
  GetData() {
    this.opendetailService$.getOpenCourseDetailInfor(this.courseId, this.userId).subscribe(result => {
      this.displayData = result
      this.movieTitle=this.displayData.title
      this.hitNum=this.displayData.hitNum
      this.postNum=this.displayData.postNum
      this.likeNum=this.displayData.likeNum
      this.subtitle=this.displayData.subtitle
      this.teacherNickName=this.displayData.teacher_nickname
      this.teacherTitle=this.displayData.teacher_title
      this.videoCover=this.displayData.smallPicture
      this.teacherId=this.displayData.teacher_id
      this.teacherAvatar=this.displayData.teacher_largeAvatar
      this.isCollected=this.displayData.isFavourite
      this.getCourseList();
      this.getTeacherInfo();
      this.getIsFollowed();
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`
      )
    })
  }
  getCourseList(){
    this.openService$.getOpenCourseList().subscribe(res=>{
      for (let i = 0; i < res.length; i++)
        this.courseList.push({  courseId : res[i].id,
                                courseTitle : res[i].title});
      this.courseListLoading = false;
    })
  }
  getTeacherInfo(){
    this.opendetailService$.getTeacherInfo(this.teacherId).subscribe(res=>{
      this.fellowNum = res.data.fansNum;
      this.attentionNum = res.data.followedNum;
    })
  }

  clickLike(){
    // 点击点赞
    this.likeNum += 1;
    this.opendetailService$.setLikeNum(this.courseId).subscribe();
  }
  clickCollect(){
    // 点击收藏
    if (this.isCollected==1){
      this.opendetailService$.disCollectCourse(this.userId, this.courseId).subscribe();
      this.isCollected = 0;
    }
    else{
      this.opendetailService$.collectCourse(this.userId, this.courseId).subscribe();
      this.isCollected = 1;
    }
  }
  navigateByUrl(url) {
    this.router.navigateByUrl(url);
  }
  getIsFollowed(){
    this.followMngService$.isFollowed(this.userId, this.teacherId).subscribe(res => {
      this.isFollowed = res.data
    },error => {
      this.notification.create(
        'error',
        '获取是否关注失败',
        `${error.error}`
      )
    })
  }
  follow_submit(item_id: any) {
    if (item_id != this.userId) {
      this.isFollowed = !this.isFollowed;
      this.followMngService$.followUser(this.userId, item_id).subscribe(() => {
        this.notification.create(
          'success',
          '提交成功！',
          `提交成功`);
      }, error => {
        this.notification.create(
          'error',
          '发生错误！',
          `${error.error}`)
      });
    } else {
      this.notification.create(
        'error',
        '发生错误！',
        `不能自己关注自己`)
    }
  }
  del_follow_submit(item_id: any) {
    this.isFollowed = !this.isFollowed;
    this.followMngService$.defollow(this.userId, item_id).subscribe(() => {
      this.notification.create(
        'success',
        '提交成功！',
        `提交成功`)
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });
  }

}
