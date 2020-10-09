import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-paper-list',
  templateUrl: './paper-list.component.html',
  styleUrls: ['./paper-list.component.less']
})

export class PaperListComponent implements OnInit {
  //测试数据：试卷的id，名字，课程，计划，时间;
  paperList:any[][]=[[1,'试卷1','初中第1课 毒品-人类的公敌','默认教学计划','2019-07-30 16:08:21'],[2,'试卷2','初中第2课 毒品-人类的公敌','默认教学计划','2019-07-30 16:08:21'], [3,'试卷3','初中第3课 毒品-人类的公敌','默认教学计划','2019-07-30 16:08:21']];
  //满足搜索条件的试卷
  paperListAfterSearch:any[]=new Array();
  //搜索试卷的名字
  searchPName: string='';
  //用来控制试卷详情是否显示
  //记录显示按钮点击次数
  clickCount:number=0;
  //记录点击按钮的试卷id
  clickPaperID:number=-1;
  //各试卷学生答题情况：学生姓名、交卷时间、用时、得分（是否有学生id来检索学生的答题网址)
  //试卷1
  PStudents:any[][]=[[1,'张三','2019-07-30 16:09:14',50,90],[1,'李四','2019-07-30 16:09:14',10,15],
  [2,'王五','2019-07-30 16:09:14',55,98],[2,'张三','2019-07-30 16:09:14',90,59],[3,'刘六','2019-07-30 16:09:14',30,86]];
  //试卷2
  //PTwoStudents:any[][]=[['王五','2019-07-30 16:09:14',55,98],['张三','2019-07-30 16:09:14',90,59]];
  //试卷3
  //PThreeStudents:any[][]=[['刘六','2019-07-30 16:09:14',30,86]];
  //显示的学生答题情况
  showPStudents:any[]= [];

  constructor( private router: Router) {
    this.paperListAfterSearch=this.paperList;
   }

  ngOnInit() {
  }

  navigatTo(url: string) {
    this.router.navigateByUrl(url)
  }

  //按搜索框里的输入查找试卷
  selectByPaperName(){
    this.paperListAfterSearch=[];
    console.log('搜索名字：'+this.searchPName);
    
    for(let paper of this.paperList){
      //如果某一个试卷满足试卷名字包含搜索字符串
      if((paper[1].indexOf(this.searchPName))>-1){
        this.paperListAfterSearch.push(paper);
      }
      //也可以在后面加如果课程名字包含搜索字符串等
    }
    console.log(this.paperListAfterSearch);
  }

  clickShowButton(pid:number){
    this.clickCount++;
    this.clickPaperID=pid;
  }
  showStudentOrNot(pid:number):boolean{
    if(this.clickPaperID!=pid){
      return false;
    }else{
      if(this.clickCount%2==0){
        return false;
      }else{
        this.selectStudentById(pid);
        return true;
      }
    }
  }

  selectStudentById(pid: number) {
    //将需要显示的试卷的学生答题情况筛选出来
    this.showPStudents = [];
    for (let st of this.PStudents) {
      if (st[0] == pid) {
        this.showPStudents.push(st);
      }
    }
  }
}
