import { Component, Input, OnInit } from "@angular/core";
import {
  NzModalService,
  NzMessageService,
  NzModalRef,
  TransferItem,
} from "ng-zorro-antd";
import { DashboardHotspotService } from "src/app/service/dashboard-hotspot/dashboard-hotspot.service";

@Component({
  selector: "app-hotspot-modal",
  templateUrl: "./hotspot-modal.component.html",
  styleUrls: ["./hotspot-modal.component.less"],
})
export class HotspotModalComponent implements OnInit {
  constructor(
    private modalService: NzModalService,
    private message: NzMessageService,
    private dashboardHotspotService: DashboardHotspotService,
    private modal: NzModalRef
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

  isOkLoading = false;
  // transferList: TransferItem[] = [];
  @Input() transferList?: TransferItem[] = [];

  ngOnInit() {
    // setTimeout(
    //   () =>
    //     this.transferList.push({
    //       title: "热门标签",
    //       direction: "left",
    //     }),
    //   50
    // );
    console.log(this.transferList);
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
      location.reload();
    }
  }
}
