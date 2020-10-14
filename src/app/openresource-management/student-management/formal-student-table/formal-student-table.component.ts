import {Component, Input, OnChanges, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {UserInfoViewModalComponent} from '../../../core/modal/user-info-view-modal/user-info-view-modal.component';
import {CourseManagementBackHalfService} from '../../../service/course-management-back-half/course-management-back-half.service';
import {ClassManagementService} from '../../../service/class-management/class-management.service';
import {ClientClassManagementService} from '../../../service/client-class-management/client-class-management.service';

@Component({
  selector: 'app-formal-student-table',
  templateUrl: './formal-student-table.component.html',
  styleUrls: ['./formal-student-table.component.less']
})
export class FormalStudentTableComponent implements OnInit, OnChanges {

  @Input()
  planId: string;

  courseId: string;

  userId: string = '1';

  name: string = '';
  studentList = [];
  total: number;
  loading: boolean = false;
  pageIndex: number = 1;

  messageContent: string = '';
  commentContent: string = '';
  expireTime: Date;


  constructor(
    private routerInfo: ActivatedRoute,
    private _modal: NzModalService,
    private _message: NzMessageService,
    private courseManagement$: CourseManagementBackHalfService,
    private classManagement$: ClientClassManagementService,
    private _notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.courseId = location.pathname.split('/')[3];
    // this.studentList.push({
    //     imgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //     name: '董卓然',
    //     comment: '买一送一',
    //     involveTime: new Date().getTime(),
    //     progress: '10%'
    //   },
    //   {
    //     imgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //     name: '董卓然',
    //     comment: '买一送一',
    //     involveTime: new Date().getTime(),
    //     progress: '10%'
    //   },
    //   {
    //     imgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //     name: '董卓然',
    //     comment: '买一送一',
    //     involveTime: new Date().getTime(),
    //     progress: '10%'
    //   },
    //   {
    //     imgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //     name: '董卓然',
    //     comment: '买一送一',
    //     involveTime: new Date().getTime(),
    //     progress: '10%'
    //   },
    //   {
    //     imgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //     name: '董卓然',
    //     comment: '买一送一',
    //     involveTime: new Date().getTime(),
    //     progress: '10%'
    //   });
  }

  ngOnChanges() {
    if (this.planId && this.planId !== '') {
      this.courseManagement$.addingStatus.subscribe(value => {
        this.searchData()
      })
    }
  }

  filterStudent() {

    this.loading = true;
    this.pageIndex = 1;
    this.courseManagement$.getTeachingPlanStudent(this.planId, 8, 1, this.name).subscribe(result => {
      this.loading = false;
      this.studentList = result.data.data;
      this.total = result.data.total;
    }, error1 => {
      this.loading = false;
      this._notification.error(
        '获取学生列表失败！',
        `${error1.error}`
      )
    })

  }

  searchData(pageIndex: number = this.pageIndex) {

    this.loading = true;
    this.courseManagement$.getTeachingPlanStudent(this.planId, 8, pageIndex, this.name).subscribe(result => {
      this.loading = false;
      this.studentList = result.data.data;
      this.total = result.data.total;
    }, error1 => {
      this.loading = false;
      this._notification.error(
        '获取学生列表失败！',
        `${error1.error}`
      )
    })

  }

  sendMessage(id: string, template: TemplateRef<{}>) {
    this._modal.create({
      nzTitle: '编辑私信内容',
      nzContent: template,
      nzOkText: '发送',
      nzCancelText: '取消',
      nzOnOk: () => {
        if (this.messageContent == '') {
          this._notification.error(
            '私信内容不能为空！',
            ''
          );
          return false;
        } else {
          this.classManagement$.sendMessage(this.userId, id, this.messageContent).subscribe(result => {
            this._notification.success(
              '私信发送成功！',
              ''
            )
          }, error1 => {
            this._notification.error(
              '私信发送失败！',
              `${error1.error}`
            )
          });
        }
      },
      nzOnCancel: () => console.log(this.messageContent)
    })
  }

  checkInfo(id: string) {
    this._modal.create({
      nzTitle: '个人详细信息',
      nzContent: UserInfoViewModalComponent,
      nzComponentParams: {
        userId: id
      },
      nzWidth: 600,
      nzFooter: null
    })
  }

  writeComment(data: any, template: TemplateRef<{}>) {
    this.commentContent = data.comment;
    this._modal.create({
      nzTitle: '学员备注',
      nzContent: template,
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => {
        this.courseManagement$.setStudentRemark(this.planId, this.commentContent, data.id).subscribe(result => {
          this.searchData();
          this._notification.success(
            '修改备注成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '修改备注失败！',
            `${error1.error}`
          )
        })
      },
      nzOnCancel: () => console.log(this.commentContent)
    })
  }

  deleteStudent(id: string) {
    this._modal.confirm({
      nzTitle: '是否要删除该学员？',
      nzOkText: '删除',
      nzCancelText: '取消',
      nzOnOk: () => {
        this.courseManagement$.deleteStudent(this.planId, id).subscribe(result => {
          this.searchData();
          this._notification.success(
            '删除成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '删除失败！',
            `${error1.error}`
          )
        })
      }
    })
  }

  disabledTime = (expireTime: Date): boolean => {
    return expireTime.getTime() <= new Date().getTime()
  };

  modifyExpireTime(id: string, template: TemplateRef<{}>) {
    this._modal.create({
      nzTitle: '设置有效期',
      nzContent: template,
      nzOkText: '确认',
      nzCancelText: '取消',
      nzOnOk: () => console.log(this.expireTime)
    })
  }

  checkData(data: any) {
    console.log(data)
  }

}
