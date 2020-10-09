import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalRef, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {MyteachingService} from '../../../../service/myteaching/myteaching.service';
import {Router} from '@angular/router';

const count = 5;
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
@Component({
  selector: 'app-question-record',
  templateUrl: './question-record.component.html',
  styleUrls: ['./question-record.component.less']
})
export class QuestionRecordComponent implements OnInit {

  data: any[] = [];
  FavoriteList :[];
  dataList:[];
  loading:boolean;
  userId:number= parseInt(window.localStorage.getItem('id'));
  detail:any;
  type: string;

  answerList = [];
  questionList = [];
  metas: string;

  tplModal: NzModalRef;
  tplModalButtonLoading = false;
  htmlModalVisible = false;
  disabled = false;


  constructor(private http: HttpClient,
              private msg: NzMessageService,
              private _notification: NzNotificationService,
              private MyteachingService$: MyteachingService,
              private router: Router,
               private message: NzMessageService,

              private modalService: NzModalService
  ) {}

  ngOnInit(){
    this.searchData()
  }
  characterList = ['A' , 'B' , 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  searchData() {
    this.loading = true;
    this.FavoriteList = [];
    this.MyteachingService$.getMyFavoriteList(1, 10,this.userId).subscribe(result => {
        this.loading = false;
        this.dataList = result.data;
        this.FavoriteList = this.dataList;

      },
      error1 => {
        this.loading = false;
        this._notification.create(
          'error',
          '发生错误',
          `${error1.error}`
        )

      })
  }
  getDetail(questionId) {
    this.detail = [];
    this.MyteachingService$.getQuestionDetail(questionId).subscribe(result => {
        this.dataList = result.data;
        this.detail = this.dataList;

      },
      error1 => {
        this._notification.create(
          'error',
          '发生错误',
          `${error1.error}`
        )

      })
  }

  createMessage(type:string ,questionId: number, targetId: number): void {
    this.MyteachingService$.deleteMyFavorite(questionId, targetId, this.userId).subscribe( data => {
        console.log("DELETE Request is successful ", data);
        this.message.create(type, `取消收藏成功`);
        this.ngOnInit()
      },
      error => {
        console.log("Error", error);
      }
    );

  }
  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}> ,questionId:number): void {
    this.detail = [];
    this.MyteachingService$.getQuestionDetail(questionId).subscribe(result => {
        this.dataList = result.data;
        this.detail = this.dataList;
        this.answerList = this.getJson(this.detail.answer);
        this.questionList = this.getJson(this.detail.metas);
        this.questionList.forEach((item, index) => {
          let option = 'A' + index;
          let strList = item.split('<p>');
          strList[1] = strList[1] + option;
          strList[0] = '<p>';
          item = strList.join('');
          console.log(item)
        })
      },
      error1 => {
        this._notification.create(
          'error',
          '发生错误',
          `${error1.error}`
        )
      })

      this.tplModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });

  }

  destroyTplModal(): void {
      this.tplModal.destroy();
  }

  getAnswer(answer){
      if(answer[0] =="0")
        return "A";
      if(answer[0]=="1")
        return "B";
      if(answer[0]=="2")
        return "C";
      else return "D";
  }


getJson(jsonStr1){

  return JSON.parse( jsonStr1 );

}

}





export class NzModalCustomComponent {
  @Input() title: string;
  @Input() subtitle: string;

  constructor(private modal: NzModalRef) {
  }

  destroyModal(): void {
    this.modal.destroy({data: 'this the result data'});
  }



}
