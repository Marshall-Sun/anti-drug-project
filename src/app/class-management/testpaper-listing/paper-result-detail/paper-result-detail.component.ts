import { Component, OnInit } from '@angular/core';
import { fromEvent,Observable,of} from 'rxjs';
import {fakeAsync} from "@angular/core/testing";
import {PaperResultDetailService} from "../../../service/paper-result-detail/paper-result-detail.service";
import {NzNotificationService} from "ng-zorro-antd";

@Component({
  selector: 'app-paper-result-detail',
  templateUrl: './paper-result-detail.component.html',
  styleUrls: ['./paper-result-detail.component.less']
})
export class PaperResultDetailComponent implements OnInit {
  username: string;
  subtime: any;
  usetime: string;
  paperName: string;
  singleScore: number;
  totalScore: number;
  switchValue=false;

  target: any;

  testPaperId: string;
  userId: string;
  dataSet = [
    {
      type: '答对',
      single: 0,
      multiple: 0,
      check: 0,
      unit: '道'
    }, {
      type: '答错',
      single: 0,
      multiple: 0,
      check: 0,
      unit: '道'
    }, {
      type: '未答',
      single: 0,
      multiple: 0,
      check: 0,
      unit: '道'
    }, {
      type: '得分',
      single: 0.0,
      multiple: 0.0,
      check: 0.0,
      unit: '分'
    }
  ];
  characterList = ['A' , 'B' , 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  singlequestions = [];
  multiplequestions = [];
  judgequestions = [];
  constructor(private paperResultDetailService :PaperResultDetailService,
              private _notification: NzNotificationService) {
    this.testPaperId = location.pathname.split('/')[3];
    this.userId = location.pathname.split('/')[5]
  }

  search() {
    this.singlequestions = [];
    this.multiplequestions = [];
    this.judgequestions = [];
    this.paperResultDetailService.getTestPaperDetail(this.testPaperId ,this.userId).subscribe( result => {
      for (let item of result.data.SingleList){
        item.metas=eval(item.metas);
        item.selfAnswer=eval(item.selfAnswer);
        item.rightAnswer=eval(item.rightAnswer);
        this.singlequestions.push(item);
        if (item.selfAnswer.length==0){this.dataSet[2].single += 1;}else if (item.selfAnswer.toString()==item.rightAnswer.toString()){this.dataSet[0].single += 1;this.dataSet[3].single += item.selfScore;}else {this.dataSet[1].single += 1;}
      }
      for (let item of result.data.ChoicelList){
        item.metas=eval(item.metas);
        item.selfAnswer=eval(item.selfAnswer);
        item.rightAnswer=eval(item.rightAnswer);
        this.multiplequestions.push(item);
        if (item.selfAnswer.length==0){
          this.dataSet[2].multiple += 1;
        } else if (item.selfAnswer.toString()==item.rightAnswer.toString()){
          this.dataSet[0].multiple += 1;this.dataSet[3].multiple += item.selfScore;
        }else {this.dataSet[1].multiple += 1;console.log(item.rightAnswer)}
      }
      for (let item of result.data.determineList){
        item.metas=eval(item.metas);
        item.selfAnswer=eval(item.selfAnswer);
        item.rightAnswer=eval(item.rightAnswer);
        this.judgequestions.push(item);
        if (item.selfAnswer.length==0){this.dataSet[2].check += 1;break;}else if (item.selfAnswer.toString()==item.rightAnswer.toString()){this.dataSet[0].check += 1;this.dataSet[3].check += item.selfScore;}else {this.dataSet[1].check += 1;}
      }
      this.username = result.data.SingleList[0].nickName;
      this.subtime = result.data.SingleList[0].endTime;
      this.usetime = result.data.SingleList[0].usedTime;
      this.paperName = result.data.SingleList[0].paperName;
      this.totalScore = result.data.SingleList[0].totalScore;
      this.singleScore  = result.data.SingleList[0].singleScore;
    }, error1 => {
      this._notification.create(
        'error',
        '发生错误！',
        `${error1.error}`
      )
    })
  }

  ngOnInit() {
    this.search();
  }
  decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    str = unescape(str);
    var reg = new RegExp("%","g");
    str = str.replace(reg,"");
    return str;
  }

  collectQuestion(item: any) {
    let question = {
      questionid: item.questionId,
      targetid: this.testPaperId,
      userid: this.userId,
      targettype: 'testpaper'
    };
    this.paperResultDetailService.collectQuestion(question).subscribe(result => {
      this._notification.success('收藏成功！', '');
      this.search()
    }, error1 => {
      this._notification.error('收藏失败！', error1.error)
    })
  }
  cancelCollectQuestion(questionId: string) {
    this.paperResultDetailService.cancelCollection(questionId).subscribe(result => {
      this._notification.success('取消成功！', '');
      this.search()
    }, error1 => {
      this._notification.error('取消失败！', error1.error)
    })
  }
}


