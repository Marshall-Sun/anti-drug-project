import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less']
})
export class SigninComponent implements OnInit {
  //日期
  CurrentDate = new Date();
  constructor() { }

  ngOnInit() {
  }

}
