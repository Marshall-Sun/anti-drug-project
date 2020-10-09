import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.less']
})
export class DashboardMenuComponent {
  // gridStyle = {
  //   width: '25%',
  //   textAlign: 'center',
  //   nzHoverable: false
  // };

  constructor(private router: Router,){

  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}
