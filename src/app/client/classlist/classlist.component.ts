import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { ClassService } from 'src/app/service/classlist-frontend/classlist-frontend.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {TagService} from 'src/app/service/taglist-frontend/taglist-frontend.service'

@Component({
  selector: 'app-classlist',
  templateUrl: './classlist.component.html',
  styleUrls: ['./classlist.component.less']
})
export class ClasslistComponent implements OnInit {
  classList = [];
  blocktype:string = "class"
  //Search params
  currentPage: number =1;
  order: string = "createdTime DESC";
  treetag: string[]=["全部"];
  treetag_s: string = "全部";
  commontag: string = "All";
  //Component params
  totalPage: number = 1;
  pageSize: number = 16;

  constructor(private classservice: ClassService, private router: Router, private route: ActivatedRoute,
    private _notification: NzNotificationService,private tagservice:TagService) {
    // route.queryParams.subscribe(queryParams => {
    //   this.currentPage = queryParams.page || "1";
    //   this.order = queryParams.orderBy || "New";
    //   this.treetag = [queryParams.treetag] || ["全部"];
    //   this.commontag = queryParams.commontag || "全部";
    // })

   // this.totalPage = classservice.getClassesNum();
  }



  ngOnInit() {
    //服务器请求
    this.classservice.getClasses(this.currentPage, this.order, this.commontag).subscribe((res: any) => {
      this.renderResulsts(res);
    },error=>{
      this._notification.create(
        'error',
        '错误！',
        `${error}`,
        {nzDuration:100}
      )
    });
  }

  onPageChange(event?: any) {
    this.refreshPage()
    window.scrollTo(0, 0);
  }

  refreshPage(): void {
    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParams: {
    //     page: this.currentPage,
    //     orderBy: this.order,
    //     treetag: this.treetag_s,
    //     commontag: this.commontag
    //   }
    // });

    //服务器请求---待替换
    this.classservice.getClasses(this.currentPage, this.order, this.commontag).subscribe((res: any) => {
      this.renderResulsts(res);
    },error=>{
      this._notification.create(
        'error',
        '错误！',
        `${error}`,
        {nzDuration:100}
      )
    });
  }

  renderResulsts(res: any): void {
    this.classList = null;
    if (res) {
      this.classList = res.data;
      this.totalPage=  res.total;
    }
    //附加项，要删除
    // for(let i=0;i<this.classList.length;i++){
    //   if(this.classList[i].smallPicture==undefined){
    //     this.classList[i].smallPicture = "../../../../assets/img/timg.jpg";
    //   }else if(this.classList[i].smallPicture==""){
    //     this.classList[i].smallPicture = "../../../../assets/img/timg.jpg";
    //   }else if(this.classList[i].smallPicture.substr(0,6)=="public"){
    //     this.classList[i].smallPicture = "../../../../assets/img/timg.jpg";
    //   }else if(this.classList[i].smallPicture.substr(7,7)=="edusoho"){
    //     this.classList[i].smallPicture = "../../../../assets/img/timg.jpg";
    //   }
    // }

  }

  changeOrder(order: string): void {
    this.currentPage = 1;
    this.order = order;
    this.refreshPage();
  }


  setcommonTag(val: string): void {
    this.currentPage = 1;
    this.commontag = val;
    this.refreshPage();
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

}
