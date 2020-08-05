import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassManagementService} from '../service/class-management/class-management.service';
import {ClientClassManagementService} from '../service/client-class-management/client-class-management.service';
import {NzNotificationService} from 'ng-zorro-antd';
import { AuthService } from '../front-desk/auth/auth.service';

@Component({
  selector: 'app-class-management',
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.less']
})
export class ClassManagementComponent implements OnInit {

  location: Location;


  classroomId: string;

  classroom: any;

  constructor(
    private routeInfo: ActivatedRoute,
    private router: Router,
    private _notification: NzNotificationService,
    private authService: AuthService,
    private classManagementService$: ClientClassManagementService
  ) {
    this.location = location;
    this.classroomId = location.pathname.split('/')[3];
    this.classManagementService$.changeStatus.subscribe(value => {
      this.getClassroomDetail()
    })
  }

  ngOnInit() {

  }

  getClassroomDetail() {
    this.classManagementService$.getClassroomDetail(this.classroomId).subscribe(result => {
      this.classroom = result.data
    }, error1 => {
      this._notification.error(
        '发生错误！',
        `${error1.error}`
      )
    })
  }

  navigatTo(url: string) {
    this.router.navigateByUrl(url)
  }

  checkIdentity(identity: string): boolean {
    return this.authService.userIdentityChecker(identity);
  }
}
