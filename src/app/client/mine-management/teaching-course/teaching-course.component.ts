import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-teaching-course',
  templateUrl: './teaching-course.component.html',
  styleUrls: ['./teaching-course.component.less']
})
export class TeachingCourseComponent implements OnInit {

  location: Location;
  constructor(
    private routeInfo: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.location = location;
  }

  navigatTo(url: string) {
    this.router.navigateByUrl(url)
  }

}
