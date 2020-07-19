import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd';
import {OpenresourceService} from '../../service/openresource/openresource.service';

@Component({
  selector: 'app-openresource',
  templateUrl: './openresource.component.html',
  styleUrls: ['./openresource.component.less']
})
export class OpenresourceComponent implements OnInit {

  loading:boolean = true;
  displayData = [];
  dataInPage = [];
  pageIndex:number = 1;
  pageSize:number = 12;
  total:number;

  constructor(private router: Router,
              private openService$: OpenresourceService,
              private _notification: NzNotificationService) {}
  ngOnInit() {
    this.searchData()
  }
  navigateByUrl(url) {
    this.router.navigateByUrl(url);
  }
  searchData() {
    this.openService$.getOpenCourseList().subscribe(result => {
      this.displayData = result;
      this.total = result.length;
      let length = (this.total>this.pageSize)?this.pageSize:this.total;
      for (let i = 0; i < length; i++){
        this.dataInPage[i] = this.displayData[i];
      }
      this.loading = false;
    }, error1 => {
      this._notification.create(
        'error',
        '发生错误！',
        `${error1.error}`
      )
    })
  }
  loadIndex(pi:number): void{
    this.pageIndex = pi;
    if (pi*this.pageSize > this.displayData.length){
      this.dataInPage = [];
      for (let i = (pi-1)*this.pageSize, j = 0; i < this.displayData.length; i++, j++){
        this.dataInPage[j] = this.displayData[i];
      }
    }else {
      for (let i = (pi-1)*this.pageSize, j = 0; j < this.pageSize; i++, j++){
        this.dataInPage[j] = this.displayData[i];
      }
    }
    window.scrollTo(0, 160);
  }
}
