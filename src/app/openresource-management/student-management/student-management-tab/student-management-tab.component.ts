import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-student-management-tab',
  templateUrl: './student-management-tab.component.html',
  styleUrls: ['./student-management-tab.component.less']
})
export class StudentManagementTabComponent implements OnInit {

  @Input()
  planId: string;

  constructor() { }

  ngOnInit() {
  }

}
