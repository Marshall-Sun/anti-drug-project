import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-operation-header',
  templateUrl: './operation-header.component.html',
  styleUrls: ['./operation-header.component.less']
})
export class OperationHeaderComponent implements OnInit {

  location: Location;

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
    this.location = location;
  }

  navigate(url: string) {
    this.route.navigateByUrl(url);
  }
}
