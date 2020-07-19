import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import {PrivateChatService} from '../../../service/private-chat/private-chat.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-private-chat',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.less']
})
export class PrivateChatComponent implements OnInit {
  toNickName:string;
  toId:number;
  userId:number;
  userNickName:string;
  data = [];
  total:number;
  submitting = false;
  inputValue = '';
  pageIndex: number = 1;
  pageSize: number = 6;
  msgConversationId;
  loading:boolean = true;

  constructor(private router: Router,
              private routerinfor: ActivatedRoute,
              private privateChatService: PrivateChatService,
              private error: NzNotificationService) { }
  ngOnInit() {
    this.userId = parseInt(localStorage.getItem('id'));
    this.privateChatService.getNickName(this.userId).subscribe(res=>{
      this.userNickName = res.data;
    })
    this.toId = parseInt(localStorage.getItem('contactId'));
    this.toNickName = this.routerinfor.snapshot.params[ 'name' ];
    this.getConversationId(this.userId, this.toId);
  }
  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.send(content);
    }, 800);
  }
  send(content){
    this.loading = true;
    this.privateChatService.sendMessage(this.data[0],content,"0").subscribe(()=>{
      //用来测试的需要删掉
      this.search();
    })
    let temp;
    this.privateChatService.changeStatus.subscribe(value => temp = value);
    this.privateChatService.changeStatus.next(temp+1);
  }

  getConversationId(fromId, toId){
    this.privateChatService.getConversationId(fromId, toId).subscribe(res=>{
      this.msgConversationId = res.data.messageConversationId
      this.search()
    })
  }
  search(){
    this.privateChatService.getConversation(this.msgConversationId, this.pageIndex, this.pageSize).subscribe(result=>{
      this.data = result.data;
      this.total = result.data.totalNum;
      for (let i = 0, j = this.data.length-1; i < j; i++, j--){
        let temp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = temp;
      }
      this.data.forEach(item=>{
        item.needDel = false;
      })
      this.loading = false;
    },error1 => {
      this.error.create(
        'error',
        '发生错误',
        `${error1.error}`
      )
    })
  }
  loadIndex(pi:number): void{
    this.pageIndex = pi;
    this.loading = true;
    this.search();
    window.scrollTo(0, 130);
  }
  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }
  delMsg(msgId, conversationId){
    this.privateChatService.delMessage(msgId, conversationId).subscribe(()=>{
      this.loading = true;
      this.search();
    })
  }
}
