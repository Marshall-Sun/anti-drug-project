import {Component, OnInit, TemplateRef} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd';
import {LoginLogService} from '../../../../service/login-log/login-log.service';

@Component({
  selector: 'app-login-log-table',
  templateUrl: './login-log-table.component.html',
  styleUrls: ['./login-log-table.component.less']
})
export class LoginLogTableComponent implements OnInit {

  selectedKeywordType: string = 'nickname';
  inputValue: string = '';
  dateRange = [];

  dataList = [];
  displayData = [];
  loading: boolean = false;
  total: number;
  totalPage: number;
  pageIndex: number = 1;


  filterOptions = {
    keyword: '',
    endTime: 0,
    startTime: 0,
  };

  constructor(
    private _notification: NzNotificationService,
    private loginLogService$: LoginLogService,
  ) { }

  ngOnInit() {
    this.searchData()
  }

  search() {
    let startTime = 0;
    let endTime = new Date().getTime() / 1000;
    this.pageIndex = 1;
    if (this.dateRange.length == 2) {
      startTime = Math.floor(new Date(this.dateRange[0]).getTime() / 1000);
      endTime = Math.floor(new Date(this.dateRange[1]).getTime() / 1000)
    }
    this.displayData = [];
    this.loading = true;
    this.filterOptions = {
      startTime: startTime,
      endTime: endTime,
      keyword: this.inputValue
    };
    this.loginLogService$.getLoginLogList(1, 10, this.filterOptions).subscribe(result => {
      this.loading = false;
      this.total = result.total;
      this.totalPage = Math.ceil( this.total / 10);
      this.dataList = result.data;
      this.displayData = this.dataList;
      console.log(result)
    }, error1 => {
      this.loading = false;
      this._notification.create(
        'error',
        '发生错误！',
        `${error1.error}`)
    })

  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  searchData(pageIndex: number = this.pageIndex) {
    this.displayData = [];
    this.loading = true;
    this.loginLogService$.getLoginLogList(pageIndex, 10, this.filterOptions).subscribe( result => {
      this.loading = false;
      this.total = result.total;
      this.totalPage = Math.ceil( this.total / 10);
      this.dataList = result.data;
      this.displayData = this.dataList;
    }, error1 => {
      this.loading = false;
      this._notification.create(
        'error',
        '发生错误！',
        `${error1.error}`)
    })
  }

  checkLoginLog(id: string, template: TemplateRef<{}>) {
    // this.logList = [];
    // this.loginLogService$.getUserDetailById(id).subscribe( result => {
    //   this.logList = result;
    //   this._modal.create({
    //     nzTitle: '查看登录日志',
    //     nzContent: template,
    //     nzFooter: null
    //   })
    // })
  }

}
