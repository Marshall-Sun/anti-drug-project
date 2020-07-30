import { Component, OnInit, Input, OnDestroy, ElementRef, Renderer2,Output,EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'; // 引入DomSanitizer服务
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
// import videojs from 'video.js'
import { NzModalService } from 'ng-zorro-antd/modal';
import { ClientCourseVideoService } from 'src/app/service/client-course-video/client-course-video.service';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.less']
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @Input()
  userID: string = window.localStorage.getItem("id");
  @Input()
  url:string;
  result: any;
  event: any; // 学习任务状态
  lastPosition: number = 0;  //上次时间
  lengthOfVideo: number = 0; // 视频长度
  maxTime: number = 0; //目前最新观看位置，快进大于这个值则后退
  @Input()
  courseTaskId: string;
  @Input()
  teachingPlanId: string;
  allogId: any; //学习任务ID
  @Output() private outer = new EventEmitter<string>();
  options = {
    bigPlayButton: true,
    textTrackDisplay: true,
    posterImage: true,
    errorDisplay: false,
    playbackRates: [0.5, 1, 1.5, 2],
    controlBar: {
      customControlSpacer: true,
    },
    fluid: true,   // 添加自适应
  };


  player: any = {
    currentTime() { }
  };


  //,public videoService:VideoService
  constructor(private sanitizer: DomSanitizer, public http: HttpClient, private modalService: NzModalService, private el: ElementRef,
    private renderer2: Renderer2 , private courseVideoService: ClientCourseVideoService) {
  }

  ngOnInit() {
    this.url = this.url.replace(/_/g,'/');
    // 页面刷新监听
    // window.onbeforeunload = () => {
    //   this.endPlay();
    // };
    // this.getVideoLearnLog(this.userID, this.courseTaskId);  //初始化
  }

  ngAfterViewInit() {
    this.onload();
  }

  ngOnDestroy() {
    // this.endPlay();
    this.player.dispose();
  }
  success(): void {
    this.modalService.success({
      nzTitle: '视频学习完成',
    });
  }
  onload() {
    var that = this;
    that.player = videojs('my-video', this.options, function onPlayerReady() {  // 播放器内部监控

      this.on('ended', function () {
        that.success();
        // that.changeLearnStatus(that.allogId, 'finish', parseInt(that.player.duration())); // 如果学习完了，学习位置设置为0还总长度
        that.courseVideoService.finishTask(that.teachingPlanId, that.courseTaskId, that.userID).subscribe();
      });

      // that.renderer2.listen(that.el.nativeElement.querySelector('.vjs-progress-control'), 'mouseup',
      //   () => {
      //     if (parseInt(that.player.currentTime()) > that.maxTime) {
      //       that.onJump(that.maxTime)
      //     }
      //   });
      // this.on('timeupdate', function () {
      //     let currentTime:number=parseInt(that.player.currentTime())
      //     if ((currentTime - that.maxTime) <= 1) {
      //       that.maxTime = currentTime;
      //     }
      // });
    });
  }


  // 获得该学习记录的状态和上次的位置
  getVideoLearnLog(userId: any, coursetaskid: any) {
    this.http.get(`/course/video/getVideoLearnLog?coursetaskid=${coursetaskid}&userId=${userId}`).subscribe((response) => {
      this.result = response;
      this.event = this.result.data.event; // 直接使用response会报错
      this.outer.emit(this.event)//向父组件传递学习状态
      this.maxTime = this.lastPosition = this.result.data.learnedtime;
      this.allogId = this.result.data.id;
      this.startPlay();
    });
  }

  // 改变该学习记录的状态和位置
  changeLearnStatus(allogId: any, event: any, learnedtime: any) {
    let params = new HttpParams().set('allogId', allogId).set('event', event).set('learnedtime', learnedtime);
    this.http.get('/course/video/changeLearnStatus', { params: params }).subscribe(
      () => {}
    )
  }

  // 跳转到指定位置
  onJump = function (position: number): void {
    this.player.currentTime(position);
  };


  startPlay = function (): void {
    // 如果状态(event)为 finish，则设置当前位置为 0
    if ('finish' == this.event) {
      this.onJump(0);  // 只要学完了，下次进来就不再会进行跳转
    }// 如果状态(event)为 doing，则设置当前位置为  learnedTime的值,即默认
    this.onJump(this.lastPosition);
  };


  endPlay = function (): void {
    // 判断状态，如果为 finish 则return (表示已学习完成，重复播放,不需要请求后端)
    // 如果状态为 doing, 判断当前时间是否和总时长一致，调用changeLearnStatus，若一致，则改变 event，若不一致则改变 learnedtime
    this.lengthOfVideo = parseInt(this.player.duration());//可以放在初始化时就设置视频总时间
    let currentPosition = parseInt(this.player.currentTime());
    if ('doing' == this.event) {  // 说明事件
      if (this.lengthOfVideo != currentPosition&& currentPosition>=this.maxTime) {
        this.changeLearnStatus(this.allogId, 'doing', currentPosition);
      }
    }
  };

}