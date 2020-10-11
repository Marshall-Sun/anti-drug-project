import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { TransferItem } from "ng-zorro-antd/transfer";
import { HotspotModalComponent } from "src/app/core/modal/hotspot-modal/hotspot-modal.component";
import { DashboardHotspotService } from "src/app/service/dashboard-hotspot/dashboard-hotspot.service";

@Component({
  selector: "app-dashboard-menu",
  templateUrl: "./dashboard-menu.component.html",
  styleUrls: ["./dashboard-menu.component.less"],
})
export class DashboardMenuComponent implements OnInit {
  constructor(
    private router: Router,
    private message: NzMessageService,
    private dashboardHotspotService: DashboardHotspotService,
    private modalService: NzModalService
  ) {}

  buttonList = [
    {
      url: "/client/newsall",
      name: "资讯频道",
    },
    {
      url: "/client/courselist?orderBy=recommend",
      name: "推荐课程",
    },
    {
      url: "/client/courselist?type_tag=20",
      name: "专题讲座",
    },
    {
      url: "/client/courselist?type_tag=26",
      name: "教师培训",
    },
    {
      url: "/client/courselist?orderBy=hot",
      name: "热门课程",
    },
    {
      url: "/client/classlist",
      name: "禁毒班级",
    },
    {
      url: "/client/openresource",
      name: "开放资源",
    },
  ];

  userButtonList = [];
  transferList: TransferItem[] = [];

  async ngOnInit() {
    for (let item of this.buttonList) {
      this.transferList.push({
        title: item.name,
        direction: 'left',
      });
    }
    this.userButtonList = this.buttonList;
    // try {
    //   let res: any = await this.dashboardHotspotService
    //     .getHotspot()
    //     .toPromise();
    //   for (let [key, value] of Object.entries(res.data)) {
    //     if (key.slice(-4) === "_pos" && value.toString().length === 4) {
    //       let buttonIndex = this.buttonList.findIndex(
    //         (item) => item.name === value
    //       );
    //       this.userButtonList.push(this.buttonList[buttonIndex]);
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    //   this.userButtonList = this.buttonList;
    // }
  }

  showModal(): void {
    // for (let item of this.transferList) {
    //   let buttonIndex = this.userButtonList.findIndex(userButton => userButton.name === item.title);
    //   if (buttonIndex === -1) item.direction = 'left';
    // }
    // console.log(this.transferList)
    // this.isVisible = true;

    const modal = this.modalService.create({
      nzTitle: "标签自定义new",
      nzContent: HotspotModalComponent,
      nzComponentParams: {
        transferList: this.transferList
      },
      nzFooter: null
    });
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}
