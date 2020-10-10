import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { TransferItem } from "ng-zorro-antd/transfer";

@Component({
  selector: "app-dashboard-menu",
  templateUrl: "./dashboard-menu.component.html",
  styleUrls: ["./dashboard-menu.component.less"],
})
export class DashboardMenuComponent {
  constructor(private router: Router, private message: NzMessageService) {}

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

  ngOnInit(): void {
    this.userButtonList = this.buttonList;
    for (let item of this.userButtonList) {
      this.transferList.push({
        title: item.name,
        direction: "right",
      });
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    let nameList = [];
    for (let item of this.transferList) {
      if (item.direction === "right") nameList.push(item.title);
    }
    if (nameList.length <= 0) {
      this.message.error("显示列表没有标签");
      this.isOkLoading = false;
    } else {
      console.log(nameList);
      this.isOkLoading = false;
      this.isVisible = false;
    }
    // location.reload();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}
