import { Component, OnInit, EventEmitter } from '@angular/core';
import { ClassInfService } from 'src/app/service/classinf-frontend/classinf-frontend.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
@Component({
  selector: 'app-classinf-headmaster',
  templateUrl: './classinf-headmaster.component.html',
  styleUrls: ['./classinf-headmaster.component.less'],
  inputs: ["classid","userId"],
})
export class ClassinfHeadmasterComponent implements OnInit {
  classid = "0";
  userId= null;
  //班主任
  headmasterdata = [
    { id: "", name: "李丽", positionaltitles: "讲师", autograph: "没有签名", currentlearn: 10, follow: 10, fans: 1, smallavatar: "", isfollowing: false },
  ];
  //私信
  PrivatelettertVisible = false;
  PrivatelettertTitle: string = "";
  PrivateletterContent: string = "";

  //关注，私信
  privateletter_toid = "1";
  follow: EventEmitter<string>;
  privateletter: EventEmitter<string>;

  constructor(private classinfservice: ClassInfService, private notification: NzNotificationService, private route: Router) { }

  ngOnInit() {
    this.classinfservice.getclassHeadmaster(this.classid).subscribe((res: any) => {
      this.setclassHeadmaster(res);
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });
  }

  setclassHeadmaster(res: any) {
    this.headmasterdata = res.data;

    for (let i = 0; i < this.headmasterdata.length; i++) {
      if (this.headmasterdata[i].smallavatar == "") {
        this.headmasterdata[i].smallavatar = "../../../../assets/img/timg2.jpg";
      } else if (this.headmasterdata[i].smallavatar.substr(0, 6) == "public") {
        this.headmasterdata[i].smallavatar = "../../../../assets/img/timg2.jpg";
      } else if (this.headmasterdata[i].smallavatar.substr(7, 7) == "edusoho") {
        this.headmasterdata[i].smallavatar = "../../../../assets/img/timg2.jpg";
      }

      if(this.userId!=null){
        this.classinfservice.isfollowing(this.userId, this.headmasterdata[i].id).subscribe((res: any) => {
          this.setteacherfollowing(res.data, i);
        }, error => {
          this.notification.create(
            'error',
            '发生错误！',
            `${error.error}`)
        })
      }else{
        this.setteacherfollowing(false, i);
      }

    }
  }

  setteacherfollowing(res: boolean, index: number) {
    this.headmasterdata[index].isfollowing = res;
  }

  //私信
  showPrivateletterfirm(toid:string): void {
    if(this.userId==null){
      this.notification.create(
        'error',
        '发生错误！',
        `请登录`);
        return;
    }
    this.privateletter_toid=toid;
    if(this.privateletter_toid!=this.userId){
      this.privateletter_toid=toid;
      this.PrivatelettertVisible = true;
    }else {
      this.notification.create(
        'error',
        '发生错误！',
        `不能自己给自己发私信`)
    }
  }

  handleCancel_Privateletter(): void {
    this.PrivatelettertVisible = false;
    this.PrivatelettertTitle = "";
    this.PrivateletterContent = "";
  }

  handleOk_Privateletter(): void {
    if (this.PrivatelettertTitle != "" && this.PrivateletterContent != "") {
      this.classinfservice.privateletter_submit(this.userId, this.privateletter_toid,this.PrivatelettertTitle,this.PrivateletterContent).subscribe((res: any) => {
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

      this.PrivatelettertVisible = false;
      //There are something
      this.PrivatelettertTitle = "";
      this.PrivateletterContent = "";
    } else {
      this.notification.create(
        'error',
        '发生错误！',
        `请填写表单全部内容`);
    }
  }


  //关注
  follow_submit(toid: string) {
    if(this.userId==null){
      this.notification.create(
        'error',
        '发生错误！',
        `请登录`);
        return;
    }
    if (toid != this.userId) {
      this.classinfservice.follow_submit(this.userId, toid).subscribe((res: any) => {
        this.notification.create(
          'success',
          '提交成功！',
          `提交成功`)

        this.classinfservice.getclassHeadmaster(this.classid).subscribe((res: any) => {
          this.setclassHeadmaster(res);
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
    } else {
      this.notification.create(
        'error',
        '发生错误！',
        `不能自己关注自己`)
    }
  }

  //取消关注
  del_follow_submit(toid: string) {
    this.classinfservice.delfollow_submit(this.userId, toid).subscribe((res: any) => {
      this.notification.create(
        'success',
        '提交成功！',
        `提交成功`)

      this.classinfservice.getclassHeadmaster(this.classid).subscribe((res: any) => {
        this.setclassHeadmaster(res);
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

  navigateByUrl(url: string) {
    this.route.navigateByUrl(url)
  }
}
