import {Component, Output, EventEmitter, DoCheck, OnInit} from '@angular/core';
import {PersonInfoEditService} from '../../service/person-info-edit/person-info-edit.service';

@Component({
  selector: "app-front-avatar",
  templateUrl: "./front-avatar.component.html",
  styleUrls: ["./front-avatar.component.less"],
})
export class FrontAvatarComponent implements DoCheck, OnInit {
  avatar: string;
  nickName: string;
  userId: string;

  constructor(private personInfoEditService$: PersonInfoEditService) {}

  ngOnInit(): void {
    this.personInfoEditService$.changeStatus.subscribe(() => {
      this.avatar = window.localStorage.getItem('mediumAvatar');
    })
  }

  ngDoCheck() {
    if (typeof this.nickName != "string") {
      this.nickName = window.localStorage.getItem("nickName");
    }
    if (typeof this.avatar != "string") {
      this.avatar = window.localStorage.getItem("mediumAvatar");
    }
    if (typeof this.userId != "string") {
      this.userId = window.localStorage.getItem("id");
    }
  }

  @Output() logoutEvent = new EventEmitter();
  logout() {
    this.logoutEvent.emit();
  }

  @Output() navigateEvent = new EventEmitter();
  navigateByUrl(url: string) {
    this.navigateEvent.emit(url);
  }
}
