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
    try {
      let res: any = await this.dashboardHotspotService
        .getHotspot()
        .toPromise();

      for (let button of this.buttonList) {
        this.transferList.push({ title: button.name, direction: "left" });
        // if (res.data.indexOf(button.name) === -1) {
        //   this.transferList.push({ title: button.name, direction: "left" });
        // } else {
        //   this.transferList.push({ title: button.name, direction: "right" });
        //   this.userButtonList.push(button);
        // }
      }
    } catch (error) {
      console.log(error);
      this.userButtonList = this.buttonList;
    }
    this.userButtonList = this.buttonList;
  }

  showModal(): void {
    const modal = this.modalService.create({
      nzTitle: "标签自定义",
      nzContent: HotspotModalComponent,
      nzComponentParams: {
        transferList: this.transferList,
      },
      nzFooter: null,
    });
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}

// ["资讯频道","推荐课程","专题讲座","教师培训","热门课程","禁毒班级"]
