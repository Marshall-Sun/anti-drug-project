import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {PrivateChatService} from "../../../service/private-chat/private-chat.service";
import {NzNotificationService} from "ng-zorro-antd";

@Component({
  selector: 'app-messages',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less']
})
export class MessagesComponent implements OnInit {
  pageIndex: number = 1;
  pageSize: number = 8;
  userId:number;
  userNickName:string;
  isVisible = false;
  isOkLoading = false;
  inputValue1 = '';
  inputValue2 = '';
  loading: boolean = true;
  data = [];
  userList: any = [];
  options: any = [];
  userIndex;
  total:number;

  constructor(private router: Router,
              private privateChatService: PrivateChatService,
              private error: NzNotificationService) {
  }
  ngOnInit() {
    this.userId = parseInt(localStorage.getItem('id'));
    console.log(this.userId);
    this.privateChatService.getNickName(this.userId).subscribe(res=>{
      this.userNickName = res.data;
      this.search();
    })
  }
  getMegInfo(){
    let toId = this.userList[this.userIndex].userId;
    let toNickName = this.userList[this.userIndex].nickName;
    let messageConversationId =  0;
    let messageId = 0;
    let messageRelationId = 0;
    this.privateChatService.getConversationId(this.userId, toId).subscribe(res=>{
      if (!res.data){
        messageConversationId = res.data.messageConversationId;
        messageId = res.data.messageId;
        messageRelationId = res.data.messageRelationId;
      }
    })
    return {
      fromId: this.userId,
      fromNickName: this.userNickName,
      fromSmallAvatar: '',
      messageConversationId:messageConversationId,
      messageId:messageId,
      messageRelationId:messageRelationId,
      toId:toId,
      toNickName: toNickName,
      totalNum: this.total,
      type: 'string'
    }
  }
  send(content){
    this.loading = true;
    let msg = this.getMegInfo();
    this.privateChatService.sendMessage(msg,content,"0").subscribe(()=>{
      //用来测试的需要删掉
      this.search();
    })
    let temp;
    this.privateChatService.changeStatus.subscribe(value => temp = value);
    this.privateChatService.changeStatus.next(temp+1);
  }
  search(){
    this.privateChatService.getMessages(1,this.pageIndex,this.pageSize,this.userId).subscribe(result =>{
      if (result.data.length == 0)
        this.total = 0;
      else {
        this.data = result.data;
        this.total = this.data[0].totalNum;
        this.data.forEach(item=>{
          item.needDel = false;
        })
      }
      this.loading =false;
    },error1 => {
      this.error.create(
        'error',
        '发生错误',
        `${error1.error}`
      )
    })
  }
  read(messageId:number, fromId:number, toId:number){
    this.loading = true;
    if (this.userId==fromId)
      localStorage.setItem('contactId', toId.toString())
    else
      localStorage.setItem('contactId', fromId.toString())
    this.privateChatService.readMessages(messageId).subscribe(() =>{
      this.search();
    })
    let i;
    this.privateChatService.changeStatus.subscribe(value => i = value);
    this.privateChatService.changeStatus.next(i+1);
  }
  loadIndex(pi:number): void{
    this.pageIndex=pi;
    this.loading = true;
    this.search()
    window.scrollTo(0, 100);
  }
  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }
  showModal():void{
    this.isVisible = true;
    this.userList = [];
    this.options = [];
    this.initialUserList();
  }
  handleOk(): void{
    this.isOkLoading = true;
    //收信人
    setTimeout(()=>{
      //收信人清空
      this.send(this.inputValue2);
      this.inputValue1 = '';
      this.inputValue2 = '';
      this.isVisible = false;
      this.isOkLoading = false;
    },1000)
  }
  handleCancel():void{
    this.inputValue1 = '';
    this.inputValue2 = '';
    this.isVisible = false;
  }
  initialUserList() {
    this.privateChatService.getUserList().subscribe((res) => {
      for (let i = 0; i < res.data.length; i++)
        this.userList.push({ userId:   res.data[i].userId,
                             nickName: res.data[i].nickName,});
    })
  }
  onInput(): void {
    this.options = [];
    if(!this.inputValue1){
      this.options = [];
    }else {
      let reg = new RegExp(this.inputValue1);
      for (let i = 0; i < this.userList.length; i++){
        let nickName: string = this.userList[i].nickName;
        if(nickName.match(reg)){
          this.options.push(nickName);
          this.userIndex = i;
        }
      }
    }
  }
  deleteConversation(conversationId){
    this.privateChatService.delConversation(conversationId).subscribe(()=>{
      this.loading = true;
      this.search();
    })
  }
}
