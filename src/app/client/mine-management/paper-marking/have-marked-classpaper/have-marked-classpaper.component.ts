import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaperMarkingService } from "src/app/service/paperMarking/paper-marking.service";
import { ResultTableComponent } from 'src/app/class-management/testpaper-listing/result-table/result-table.component';
import { ActivatedRoute } from '@angular/router';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-have-marked-classpaper',
  templateUrl: './have-marked-classpaper.component.html',
  styleUrls: ['./have-marked-classpaper.component.less']
})
export class HaveMarkedClasspaperComponent implements OnInit {


    //获取课程试卷需要的参数
    type:string="testpaper";
    userid:string='1';

    coursePaperList=[];
    ispaperMarkListHaveData:boolean=false;

  //试卷批阅：试卷的id，名字，课程，计划，时间;
  //各试卷学生答题情况：试卷id、学生姓名、交卷时间、用时、得分（是否有学生id来检索学生的答题网址)

  classroomTestPaper=[];

  //classid
  classroomId: string='9';
  //classid应该通过userid获得，由于登录没写好现在默认userid是1
  //这种什么location的方式是课程模块那种的，就是url里有classid就可以通过这个获取
  //testclassid:string;
  //试卷批阅列表
  paperMarkList=[];
  //单个试卷批阅详情列表
  paperSt=[];
  pageNum:number=1;
  pageSize:number=10;
  //userID:string=this.actrouter.snapshot.paramMap.get('id');
  //满足搜索条件的试卷
  paperListAfterSearch=[];
  //是否有数据
  isHaveData:boolean=false;
  //搜索试卷的名字
  searchPName: string='';
  //试卷的名字
  paperNa:string='';

  //试卷详情
  //paperInformation=[];
  //用来控制试卷详情是否显示
  //记录显示按钮点击次数
  clickCount:number=0;
  //记录点击按钮的试卷id
  clickPaperID:number=-1;
  //是否是第一次点击
  //isFirstClick:boolean=true;

  //记录上一次点击的试卷id
  //LastClickPaperID:number=-1;

  //所有试卷的显示记录
  //LastTimeIsShow=[];
  //上一次点击的值最后取的true还是false
  LastClickValue:boolean=false;



  constructor( private router: Router,
    private paperMarkingService:PaperMarkingService,
    private actrouter:ActivatedRoute) {

   }

  ngOnInit() {
    this.userid=window.localStorage.getItem("id");
    
    //获取班级所有试卷
    this.paperMarkingService.getClassroomTestPaperAndHomework(this.type,this.userid).subscribe(result=>{
      this.coursePaperList=result.data;
      console.log('--------------所有班级试卷-------------------',this.coursePaperList);
      if(this.isEmpty(this.coursePaperList)){
        this.ispaperMarkListHaveData=true;
      }
      //等待试卷批阅列表加载完成，将其拷贝至paperListAfterSearch中
      this.paperListAfterSearch = this.coursePaperList;
    })

  }

  navigatTo(url: string) {
    this.router.navigateByUrl(url)
  }

  

  //按搜索框里的输入查找试卷
  selectByPaperName(){
    this.paperListAfterSearch=[];
    console.log('搜索名字：'+this.searchPName);

    for(let paper of this.coursePaperList){
      //如果某一个试卷满足试卷名字包含搜索字符串
      this.paperNa=paper.testpaperName;
      if((this.paperNa.indexOf(this.searchPName))>-1){
        this.paperListAfterSearch.push(paper);
      }
      //也可以在后面加如果课程名字包含搜索字符串等
    }
    console.log('搜索后',this.paperListAfterSearch);
  }

  clickShowButton(pid:number){
    this.clickCount++;
    this.clickPaperID=pid;
  }

  showStudentOrNot(pid:number):boolean{
    
    if(this.clickPaperID!=pid){
      this.LastClickValue=false;
    }else{
      if(this.clickCount%2==0){
        this.LastClickValue=false;
      }else{
        this.LastClickValue=true;
      }
    }
    return this.LastClickValue;
  }



  isEmpty(v):boolean {
    return (
      (Array.isArray(v) && v.length == 0) || (Object.prototype.isPrototypeOf(v) && Object.keys(v).length == 0)
    );
  }

}
