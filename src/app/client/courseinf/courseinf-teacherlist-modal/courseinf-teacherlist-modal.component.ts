import { Component, OnInit } from '@angular/core';
import { CourseInfService } from 'src/app/service/courseinf-frontend/courseinf-frontend.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {Router} from '@angular/router';
@Component({
  selector: 'app-courseinf-teacherlist-modal',
  templateUrl: './courseinf-teacherlist-modal.component.html',
  styleUrls: ['./courseinf-teacherlist-modal.component.less'],
  inputs: ["teachers","courseid","teachplanId","userId"],
})
export class CourseinfTeacherlistModalComponent implements OnInit {
  userId = null;
  courseid = "0";
  teachers = [];
  teachplanId = "0";
  //私信
  privateletter_toid = "1";
  PrivatelettertVisible = false;
  PrivatelettertTitle: string="";
  PrivateletterContent: string="";

  constructor(private courseinfservice: CourseInfService,private notification: NzNotificationService,private route: Router) { }

  ngOnInit() {

  }

  setCourseTeachers(res: any) {
    this.teachers = res.data.courseTeachers;

    for(let i=0;i<this.teachers.length;i++){
      if (this.teachers[i].smallAvatar == "") {
        this.teachers[i].smallAvatar = "../../../../assets/img/timg2.jpg";
      } else if (this.teachers[i].smallAvatar.substr(0, 6) == "public") {
        this.teachers[i].smallAvatar = "../../../../assets/img/timg2.jpg";
      } else if (this.teachers[i].smallAvatar.substr(7, 7) == "edusoho") {
        this.teachers[i].smallAvatar = "../../../../assets/img/timg2.jpg";
      }
      if(this.userId!=null){
        this.courseinfservice.isfollowing(this.userId,this.teachers[i].id).subscribe((res: any) => {
          this.setstudentfollowing(res.data,i);
        }, error => {
          this.notification.create(
            'error',
            '发生错误！',
            `${error.error}`)
        })
      }else{
        this.setstudentfollowing(false,i);
      }

    }
  }

  setstudentfollowing(res:boolean,index:number){
    this.teachers[index].isfollowing = res;
  }

  showPrivateletterfirm(toid:string): void {
    if(this.userId==null){
      this.notification.create(
        'error',
        '发生错误！',
        `请登录`)
        return
    }
    this.privateletter_toid = toid;
    console.log(toid);
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

  handleOk_Privateletter(): void {
    if (this.PrivatelettertTitle != "" && this.PrivateletterContent != "") {
      this.courseinfservice.privateletter_submit(this.userId,this.privateletter_toid,this.PrivatelettertTitle,this.PrivateletterContent).subscribe((res: any) => {
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

  handleCancel_Privateletter(): void {
    console.log('Button cancel clicked!');
    this.PrivatelettertVisible = false;
    this.PrivatelettertTitle = "";
    this.PrivateletterContent = "";
  }

//关注
follow_submit(toid:string) {
  if(this.userId==null){
    this.notification.create(
      'error',
      '发生错误！',
      `请登录`)
      return
  }
  if(toid!=this.userId){
    this.courseinfservice.follow_submit(this.userId,toid).subscribe((res: any) => {
      this.notification.create(
        'success',
        '提交成功！',
        `提交成功`)
  
        this.courseinfservice.get_teaching_plan_teachers(this.teachplanId).subscribe((res: any) => {
          this.setCourseTeachers(res);
        }, error => {
          this.notification.create(
            'error',
            '错误！',
            `${error}`,
            { nzDuration: 100 }
          )
        });
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    });
  }else{
    this.notification.create(
      'error',
      '发生错误！',
      `不能自己关注自己`)
  }
}

//取消关注
del_follow_submit(toid:string) {
  this.courseinfservice.delfollow_submit(this.userId,toid).subscribe((res: any) => {
    this.notification.create(
      'success',
      '提交成功！',
      `提交成功`)

      this.courseinfservice.get_teaching_plan_teachers(this.teachplanId).subscribe((res: any) => {
        this.setCourseTeachers(res);
      }, error => {
        this.notification.create(
          'error',
          '错误！',
          `${error}`,
          { nzDuration: 100 }
        )
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
