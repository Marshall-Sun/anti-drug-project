import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ElementRef,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import videojs from "video.js";
import { NzModalService } from "ng-zorro-antd/modal";
@Component({
  selector: "app-openResource-video-player",
  templateUrl: "./openResource-video-player.component.html",
  styleUrls: ["./openResource-video-player.component.less"],
})
export class OpenRsourceVideoPlayerComponent implements OnInit, OnDestroy {
  userID: string = localStorage.getItem("id");

  //在线视频源
  @Input()
  url: string = "";

  result: any;
  event: any; // 学习任务状态
  lastPosition: number = 0; //上次时间
  lengthOfVideo: number = 0; // 视频长度
  maxTime: number = 0; //目前最新观看位置，快进大于这个值则后退
  isMousedown: boolean = false;
  allogId: any; //学习任务ID

  options = {
    bigPlayButton: true,
    textTrackDisplay: true,
    posterImage: true,
    errorDisplay: false,
    playbackRates: [0.5, 1, 1.5, 2],
    controlBar: {
      customControlSpacer: true,
    },
    fluid: true, // 添加自适应
  };

  @ViewChild("target", { static: true }) target: ElementRef;

  player: videojs.Player;

  constructor(
    public http: HttpClient,
    private modalService: NzModalService,
    private el: ElementRef,
    private renderer2: Renderer2
  ) {}

  ngOnInit() {
    // 页面刷新监听
    window.onbeforeunload = () => {
      this.endPlay();
    };
  }

  ngOnChanges() {
    if (this.url) {
      this.onload();
      this.player.src(this.url);
    }
  }

  ngOnDestroy() {
    this.endPlay();
    this.player.dispose();
  }
  success(): void {
    this.modalService.success({
      nzTitle: "视频学习完成",
    });
  }
  onload() {
    let that = this;
    this.player = videojs(
      this.target.nativeElement,
      this.options,
      function onPlayerReady() {
        this.on("ended", function () {
          that.changeLearnStatus(
            that.allogId,
            "finish",
            parseInt(that.player.duration())
          ); // 如果学习完了，学习位置设置为0还总长度
          that.success();
        });

        that.renderer2.listen(
          that.el.nativeElement.querySelector(".vjs-progress-control"),
          "mouseup",
          () => {
            if (parseInt(that.player.currentTime()) > that.maxTime) {
              that.onJump(that.maxTime);
            }
          }
        );
        this.on("timeupdate", function () {
          let currentTime: number = parseInt(that.player.currentTime());
          if (currentTime - that.maxTime <= 1) {
            that.maxTime = currentTime;
          }
        });
      }
    );
  }

  // 改变该学习记录的状态和位置
  changeLearnStatus(allogId: any, event: any, learnedtime: any) {
    let params = new HttpParams()
      .set("allogId", allogId)
      .set("event", event)
      .set("learnedtime", learnedtime);
    this.http
      .get("/course/video/changeLearnStatus", { params: params })
      .subscribe(() => {});
  }

  // 跳转到指定位置
  onJump = function (position: number): void {
    this.player.currentTime(position);
  };

  startPlay = function (): void {
    // 如果状态(event)为 finish，则设置当前位置为 0
    if ("finish" == this.event) {
      this.onJump(0); // 只要学完了，下次进来就不再会进行跳转
    } // 如果状态(event)为 doing，则设置当前位置为  learnedTime的值,即默认
    this.onJump(this.lastPosition);
  };

  endPlay = function (): void {
    // 判断状态，如果为 finish 则return (表示已学习完成，重复播放,不需要请求后端)
    // 如果状态为 doing, 判断当前时间是否和总时长一致，调用changeLearnStatus，若一致，则改变 event，若不一致则改变 learnedtime
    this.lengthOfVideo = parseInt(this.player.duration()); //可以放在初始化时就设置视频总时间
    let currentPosition = parseInt(this.player.currentTime());
    if ("doing" == this.event) {
      // 说明事件
      if (
        this.lengthOfVideo != currentPosition &&
        currentPosition >= this.maxTime
      ) {
        this.changeLearnStatus(this.allogId, "doing", currentPosition);
      }
    }
  };
}
