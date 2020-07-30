import { Component, OnInit,ElementRef,ViewChild,AfterViewInit,Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { PaperMarkingService } from "src/app/service/paperMarking/paper-marking.service";
import {NzMessageService, NzModalService, NzNotificationService, UploadFile} from 'ng-zorro-antd';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-homework-exam',
  templateUrl: './homework-exam.component.html',
  styleUrls: ['./homework-exam.component.less']
})
export class HomeworkExamComponent implements OnInit {


  //114
  courseId:string='114';
  //398
  taskId:string='398';
  userId:string='1';
  testId:string='1';  //留给交接的
  testPaperContent={
    question:[],
    limitedTime:0,
  };
  testQuestion=[];
  //题目内容
  singleChoices=[];  //单选
  multChoices=[];  //多选
  uncertainChoices=[];  //不定项
  determineChoices=[];  //判断
  //每种题型的总分
  singleTotalScore:number=0;
  multTotalScore:number=0;
  uncertaionTotalScore:number=0;
  determineTotalScore:number=0;


  //答案
  singleAnswer:any[]=[];
  determineAnswer:any[]=[];
  multAnswer:any[]=[];
  uncertainAnswer:any[]=[];
  testMUltAnswer:any[]=[{answers:[],questionId: 0}];
  testUncerAnswer:any[]=[{answers:[],questionId: 0}];

  //是否已交卷
  isAlreadySubmit:boolean=false;
  

  totalAnswer:any[]=[];

  /*
  totalAnswers:any[]=[
    {
      answers:[
        0
      ],
      questionId:0
    }
  ];*/


  totalSeconds: number = 0;
  hour: any = '00';
  minute: any = '00';
  second: any = '00';
  /*
  singleChoices: any[] = [
    {
      stem: '大麻是毒品吗?',
      score: '5.0',
      metas: { choices: ["正确", "错误"] }
    }]*/
  constructor(private router: Router,private paperMarkingService:PaperMarkingService,
    private _notification: NzNotificationService,private elementRef:ElementRef,private renderer:Renderer) { }

  ngOnInit() {

    this.courseId=location.pathname.split('/')[3];
    this.taskId=location.pathname.split('/')[5];
    this.testId=location.pathname.split('/')[7];
    this.userId=window.localStorage.getItem("id");
    
    //获取考试的试卷内容
    this.paperMarkingService.getTestPaperContent(this.courseId,this.taskId,this.userId).subscribe(result=>{
      this.testPaperContent=result.data;
      console.log('在教课程：', this.testPaperContent);
      //this.testQuestion=this.testPaperContent.question;
      for(let question of this.testPaperContent.question){
        if(question.type=="single_choice"){
          this.singleChoices=this.singleChoices.concat(question);
          this.singleTotalScore=this.singleTotalScore+question.score;
        }else if(question.type=="choice"){
          this.multChoices=this.multChoices.concat(question);
          this.multTotalScore=this.multTotalScore+question.score;
        }else if(question.type=="uncertain_choice"){
          this.uncertainChoices=this.uncertainChoices.concat(question);
          this.uncertaionTotalScore=this.uncertaionTotalScore+question.score;
        }else if(question.type=="determine"){
          this.determineChoices=this.determineChoices.concat(question);
          this.determineTotalScore=this.determineTotalScore+question.score;
        }else{
          console.log("未知题型");
        }
      }
      this.singleChoices.forEach(item => {
        this.singleAnswer.push({answers: [], questionId: item.id});
        this.totalAnswer.push({answers: [], questionId: item.id});
      });

      this.multChoices.forEach((item,index)=>{
        this.multAnswer.push({answers: [], questionId: item.id});
        this.totalAnswer.push({answers: [], questionId: item.id});
        this.testMUltAnswer.push({answers:[],questionId: item.id});
        item.choices.forEach(chois=>{
          this.testMUltAnswer[index+1].answers.push(false);
        })
      });
      this.uncertainChoices.forEach((item,index)=>{
        this.uncertainAnswer.push({answers: [], questionId: item.id});
        this.totalAnswer.push({answers: [], questionId: item.id});
        this.testUncerAnswer.push({answers: [], questionId: item.id});
        item.choices.forEach(chois=>{
          this.testUncerAnswer[index+1].answers.push(false);
        })
      })
      this.determineChoices.forEach(item=>{
        this.determineAnswer.push({answers: [], questionId: item.id});
        this.totalAnswer.push({answers: [], questionId: item.id});
      });
      this.testMUltAnswer.reverse();
      this.testMUltAnswer.pop();
      this.testMUltAnswer.reverse();
      this.testUncerAnswer.reverse();
      this.testUncerAnswer.pop();
      this.testUncerAnswer.reverse();
      console.log("答案",this.testMUltAnswer);
      console.log("单选：",this.singleChoices);
      console.log("多选：",this.multChoices);
      console.log("不定项：",this.uncertainChoices);
      console.log("判断：",this.determineChoices);
      //console.log('题目：', this.testQuestion);
      this.totalSeconds=this.testPaperContent.limitedTime;
      if(this.totalSeconds!=0){
        this.countDown(this.totalSeconds*60);
      }
      
    });
  }

  countDown(totalSeconds) {
    if (totalSeconds > 0) {
      //相差的总秒数
      this.hour = Math.floor(totalSeconds / (60 * 60)) >= 10 ?
        Math.floor(totalSeconds / (60 * 60)) :
        '0' + Math.floor(totalSeconds / (60 * 60));
      let tmp = totalSeconds % (60 * 60);
      //分钟
      this.minute = Math.floor(tmp / 60) >= 10 ?
        Math.floor(tmp / 60) :
        '0' + Math.floor(tmp / 60);
      //秒
      this.second = tmp % 60 >= 10 ?
        tmp % 60 : '0' + tmp % 60;

      totalSeconds--;
      //延迟一秒执行自己
      setTimeout(() => {
        this.countDown(totalSeconds);
      }, 1000)
    }else{
      console.log("倒计时结束，系统自动交卷");
      this.submitHomework();
      //this.navigateByUrl('client/testpaper/'+ paper.testId +'/result/'+st.userId)
      //***********************************************************这里需要url，交卷跳转 */
    }
  }
  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  submitHomework(){
    if(this.isAlreadySubmit==false){
      this.isAlreadySubmit=true;
      console.log("提交");
      //转换多选题和不定项的答案
      this.testMUltAnswer.forEach((ans,index)=>{
        ans.answers.forEach((chios,j)=>{
          if(chios==true){
            this.multAnswer[index].answers.push(j);
          }
        })
      });
      this.testUncerAnswer.forEach((ans,index)=>{
        ans.answers.forEach((chios,j)=>{
          if(chios==true){
            this.uncertainAnswer[index].answers.push(j);
          }
        })
      });
      //将各题型答案合在一起（不知道我为什么写这么麻烦）
      this.singleAnswer.forEach((item,index)=>{
        if(!this.isEmpty(item.answers)){
          this.totalAnswer[index].answers.push(item.answers);
        }
      });
      this.multAnswer.forEach((item,index)=>{
        if(!this.isEmpty(item.answers)){
          item.answers.forEach(ans=>{
            this.totalAnswer[index+this.singleChoices.length].answers.push(ans);
          })
          
        }
      });
      this.uncertainAnswer.forEach((item,index)=>{
        if(!this.isEmpty(item.answers)){
          item.answers.forEach(ans=>{
            this.totalAnswer[index+this.singleChoices.length+this.multChoices.length].answers.push(ans);
          })
          
        }
      });
      this.determineAnswer.forEach((item,index)=>{
        if(!this.isEmpty(item.answers)){
          this.totalAnswer[index+this.singleChoices.length+this.multChoices.length+this.uncertainChoices.length].answers.push(item.answers);
        }
      });
  
  
      
      console.log("单选题答案：",this.singleAnswer);
      console.log("多选题答案：",this.multAnswer);
      console.log("不定项答案：",this.uncertainAnswer);
      console.log("判断题答案：",this.determineAnswer);
      console.log("总的答案",this.totalAnswer);
  
      //调用提交的接口
      this.paperMarkingService.submitHomework(this.totalAnswer,this.courseId,this.taskId,this.userId)
      .subscribe(result=>{
        this._notification.create('success', '交卷成功！', '', {nzDuration: 1000})
      }, error1 => this._notification.create('error', '交卷失败！', `${error1.error}`, {nzDuration: 1000}
      ))

      //交卷成功返回
      //this.navigateByUrl('client/mine');
    }else{
      console.log("已提交，不需要再次重复提交");
    }

  }

  isEmpty(v):boolean {
    return (
      (Array.isArray(v) && v.length == 0) || (Object.prototype.isPrototypeOf(v) && Object.keys(v).length == 0)
    );
  }

  changeNumberToLetter(num:number):string{
    if(num==0){
      return "A";
    }else if(num==1){
      return "B";
    }else if(num==2){
      return "C";
    }else{
      return "D";
    }
  }

  ChangeStyle(i){
    console.log('按下',i);
    console.log('单选长度',this.multChoices.length);
    document.getElementById(i).style.color="white";
    document.getElementById(i).style.backgroundColor="green";
  }

}
