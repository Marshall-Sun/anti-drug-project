import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-not-marked-classpaper',
  templateUrl: './not-marked-classpaper.component.html',
  styleUrls: ['./not-marked-classpaper.component.less']
})
export class NotMarkedClasspaperComponent implements OnInit {

  constructor( private router: Router) {

   }

  ngOnInit() {
  }

  navigatTo(url: string) {
    this.router.navigateByUrl(url)
  }

}
