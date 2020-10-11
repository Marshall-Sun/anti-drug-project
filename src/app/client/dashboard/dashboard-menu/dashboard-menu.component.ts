import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { TransferItem } from "ng-zorro-antd/transfer";
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
    private dashboardHotspotService: DashboardHotspotService
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
  isVisible = false;
  isOkLoading = false;
  transferList: TransferItem[] = [];

  async ngOnInit() {
    for (let item of this.buttonList) {
      this.transferList.push({
        title: item.name,
        direction: 'left',
      });
    }
    try {
      let res: any = await this.dashboardHotspotService.getHotspot().toPromise();
      for (let [key, value] of Object.entries(res.data)) {
        if (key.slice(-4) === "_pos" && value.toString().length === 4) {
          let buttonIndex = this.buttonList.findIndex(item => item.name === value);
          this.userButtonList.push(this.buttonList[buttonIndex]);
        }
      }
    } catch (error) {
      console.log(error);
      this.userButtonList = this.buttonList;
    }
  }

  showModal(): void {
    setTimeout(() => this.transferList[0].direction = 'right', 50);
    // for (let item of this.transferList) {
    //   let buttonIndex = this.userButtonList.findIndex(userButton => userButton.name === item.title);
    //   if (buttonIndex === -1) item.direction = 'left';
    // }
    console.log(this.transferList)
    this.isVisible = true;
  }

  async handleOk() {
    this.isOkLoading = true;
    let nameList = [];
    for (let item of this.transferList) {
      if (item.direction === "right") nameList.push(item.title);
    }
    if (nameList.length <= 0) {
      this.message.info("请选择显示的标签");
      this.isOkLoading = false;
    } else {
      try {
        await this.dashboardHotspotService.updateHotspot(nameList).toPromise();
        this.message.success("标签应用成功，刷新页面...");
      } catch (error) {
        this.message.error("标签应用失败，刷新页面...");
      }
      this.isOkLoading = false;
      this.isVisible = false;
      location.reload();
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}
