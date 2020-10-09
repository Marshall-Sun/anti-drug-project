import {Component, OnInit} from '@angular/core';
import {GroupEditService} from '../../../service/groupedit-edit/group-edit.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import {GrouplistService} from '../../../service/grouplist/grouplist.service';
import {ImagesUploadingService} from '../../../service/images-uploading/images-uploading.service';
import {url} from 'inspector';


@Component({
  selector: 'app-grouplist',
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.less']
})
export class GrouplistComponent implements OnInit {
  topicname='心理咨询';
  topicnumber=2;
  number=3;
  date='2019-8-6';
  topicList: any;
  groupId:string;
  backgroundImage: string;
  userId = window.localStorage.getItem('id');
  isJoin: boolean = false;

  constructor( private groupeditEditService$:GroupEditService,
               private _notification: NzNotificationService,
               private routeInfo: ActivatedRoute,
               private grouplistService$:GrouplistService,
               private imageUploadService$: ImagesUploadingService
               ) {  this.groupId = this.routeInfo.snapshot.params['id'];
    this.groupeditEditService$.changeStatus.subscribe(value => {
      this.getTopic()
    });
    this.imageUploadService$.changeStatus.subscribe(value => {
      this.getTopic()
    })
  }

  ngOnInit() {
    this.isJoinInGroup()
  }
  //获取小组话题名称
  getTopic(){
    this.grouplistService$.showGroupIntroduction(this.groupId).subscribe(result=>{
      this.topicList=result.data;
      document.getElementById('top').style.backgroundImage = `url(${this.topicList.groupBackGroundLogo})`;
    },error1 => {
      this._notification.create(
        'error',
        '小组信息获取失败',
        `${error1.error}`)
    })
  }

  joinInGroup() {
    this.grouplistService$.joinInGroup(this.groupId, 'member', this.userId).subscribe(result => {
      this._notification.success('加入成功！', '');
      this.getTopic();
      this.isJoinInGroup();
    }, error1 => this._notification.error('加入失败！', `${error1.error}`))
  }

  isJoinInGroup() {
    this.grouplistService$.isJoinInGroup(this.groupId, this.userId).subscribe(result => {
      this.isJoin = result.data;
    })
  }
}
