import { Component, Input } from "@angular/core";
import {
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
export class HotspotModalComponent {
  constructor(
    private message: NzMessageService,
    private dashboardHotspotService: DashboardHotspotService,
    private modal: NzModalRef
  ) {}

  isOkLoading = false;
  @Input() transferList?: TransferItem[] = [];

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
      location.reload();
    }
  }

  handleCancel() {
    this.modal.destroy();
  }
}
