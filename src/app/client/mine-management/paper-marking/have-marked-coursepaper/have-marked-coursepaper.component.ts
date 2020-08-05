import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaperMarkingService } from "src/app/service/paperMarking/paper-marking.service";
import { ResultTableComponent } from 'src/app/class-management/testpaper-listing/result-table/result-table.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-have-marked-coursepaper',
  templateUrl: './have-marked-coursepaper.component.html',
  styleUrls: ['./have-marked-coursepaper.component.less']
})
export class HaveMarkedCoursepaperComponent implements OnInit {


  //试卷批阅：试卷的id，名字，课程，计划，时间;
  //各试卷学生答题情况：试卷id、学生姓名、交卷时间、用时、得分（是否有学生id来检索学生的答题网址)

  //courseID：教学计划id  58、76
  courseType:string='classCourse';
  courseid:string='58';
  //在教课程列表
  teachingCourse=[];
  //courseId: string;
  //试卷批阅列表
  paperMarkList=[];
  //paperMarkList是否有数据
  ispaperMarkListHaveData:boolean=false;
  //单个试卷批阅详情列表
  paperSt=[];
  pageNum:number=1;
  pageSize:number=10;
  userid:string='1';
  //userID:string=this.actrouter.snapshot.paramMap.get('id');
  //满足搜索条件的试卷
  paperListAfterSearch=[];
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


  constructor( private router: Router,private paperMarkingService:PaperMarkingService,private actrouter:ActivatedRoute) {

   }

  ngOnInit() {
    //this.courseId = location.pathname.split('/')[3];
    this.userid=window.localStorage.getItem("id");
    //获取在教课程
    this.paperMarkingService.getTeachingCourse(this.courseType, this.pageNum, this.pageSize, this.userid).subscribe(result => {
      this.teachingCourse = result.data;
      console.log('在教课程：', this.teachingCourse);
      if (this.isEmpty(this.teachingCourse)) {
        this.ispaperMarkListHaveData = true;
        console.log('暂无数据:', this.ispaperMarkListHaveData);
      } else {
        //对于每一个课程而言，获取课程相应的试卷批阅列表
        for (let course of this.teachingCourse) {
          //获取试卷批阅列表
          this.paperMarkingService.getTestCheckList(course.coursesetid).subscribe(result => {
            this.paperMarkList = this.paperMarkList.concat(result.data);
            console.log('里：', this.paperMarkList);
            //等待试卷批阅列表加载完成，将其拷贝至paperListAfterSearch中
            this.paperListAfterSearch = this.paperMarkList;
            console.log('拷贝：', this.paperListAfterSearch);
            if (this.isEmpty(this.paperMarkList)) {
              this.ispaperMarkListHaveData = true;
              console.log('暂无数据:', this.ispaperMarkListHaveData);
            }
          });
        }
      }

    });

  }

  navigatTo(url: string) {
    this.router.navigateByUrl(url)
  }

  

  //按搜索框里的输入查找试卷
  selectByPaperName(){
    this.paperListAfterSearch=[];
    console.log('搜索名字：'+this.searchPName);

    for(let paper of this.paperMarkList){
      //如果某一个试卷满足试卷名字包含搜索字符串
      this.paperNa=paper.number+paper.title;
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
    this.selectStudentById(pid);
  }
  
  selectStudentById(pid: number) {
    //根据试卷的testID获得相应的学生答题情况
    //单个试卷详细信息
    this.paperMarkingService.getTestPaperResult(this.pageNum,this.pageSize,pid)
    .subscribe(result=>this.paperSt=result.data); 
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
