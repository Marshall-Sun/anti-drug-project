import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { AuthService } from 'src/app/front-desk/auth/auth.service';
@Component({
  selector: 'app-mine-management',
  templateUrl: './mine-management.component.html',
  styleUrls: ['./mine-management.component.less']
})
export class MineManagementComponent implements OnInit {

  location: Location;
  constructor(
    private routeInfo: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.location = location;
  }

  navigatTo(url: string) {
    this.router.navigateByUrl(url)
  }

  checkIdentity(identity: string): boolean {
    return this.authService.userIdentityChecker(identity);
  }
}
