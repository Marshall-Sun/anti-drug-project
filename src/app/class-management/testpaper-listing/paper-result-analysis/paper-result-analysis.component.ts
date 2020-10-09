import { Component, OnInit } from '@angular/core';
import {PaperResultAnalysisService} from '../../../service/paper-result-analysis/paper-result-analysis.service';
import {NzNotificationService} from "ng-zorro-antd";

@Component({
  selector: 'app-paper-result-analysis',
  templateUrl: './paper-result-analysis.component.html',
  styleUrls: ['./paper-result-analysis.component.less']
})
export class PaperResultAnalysisComponent implements OnInit {
  taskTitle: string;
  score:number;
  totalmemberNum:number;
  classstudentnumber: number;
  participants: number;
  completions: number;
  totalscore: number;
  averagescore: number;
  target: any;

  courseId: string;
  courseTaskId: string;

  characterList = ['A' , 'B' , 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  singlequestions = [];
  multiplequestions = [];
  judgequestions = [];
  constructor(
    private paperResultAnalysisService: PaperResultAnalysisService,
    private error: NzNotificationService) {
    this.classstudentnumber = 25;
    this.participants = 25;
    this.completions = 25;
    this.totalscore = 100.0;
    this.averagescore = 86.8;
    this.courseId = location.pathname.split('/')[3];
    this.courseTaskId = location.pathname.split('/')[5];
  }
  search(){
    this.paperResultAnalysisService.getCourseTask(79,336).subscribe( result => {
        for(let item of result.data){
          if (item.questionType=="choice"){
            item.metas=eval(item.metas);
            this.multiplequestions.push(item);
          }else if (item.questionType=="single_choice"){
            item.metas=eval(item.metas);
            this.singlequestions.push(item);
          }
        }
        this.taskTitle = result.data[0].taskTitle;
        this.score = result.data[0].score;
        this.totalmemberNum = 26;
    }, error1 => {
      this.error.create(
        'error',
        '发生错误！',
        `${error1.error}`
      )
    })
  }
  ngOnInit() {
    this.search();
  }
}
