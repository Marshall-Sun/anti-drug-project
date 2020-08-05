import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-plan-tasks-down-load',
  templateUrl: './plan-tasks-down-load.component.html',
  styleUrls: ['./plan-tasks-down-load.component.less']
})
export class PlanTasksDownLoadComponent implements OnInit {
  @Input() current;
  @Input() index;
  @Input() downLoadForm : FormGroup;


  constructor() { }

  ngOnInit() {
  }


}
