import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/front-desk/auth/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-grouptab",
  templateUrl: "./grouptab.component.html",
  styleUrls: ["./grouptab.component.less"],
})
export class GrouptabComponent implements OnInit {
  curUserOwnThisGroup: boolean;

  constructor(
    private routeInfo: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService
      .userOwnGroupChecker(this.routeInfo.snapshot.params["id"])
      .then((res) => {
        this.curUserOwnThisGroup = res;
      });
  }
}
