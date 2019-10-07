import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.less']
})
export class DetailInfoComponent implements OnInit {

  targetList: any[] = [{ id: 1, target: "均分90" }, { id: 2, target: "达到及格线" }]


  constructor() { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.targetList, event.previousIndex, event.currentIndex);
  }

}