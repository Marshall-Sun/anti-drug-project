import { NgModule } from '@angular/core';
import { FrontDeskComponent } from './front-desk.component';
import { ShareModule } from '../share/share.module';
import { FrontDeskRoutingModule } from './front-desk-routing.module';
import { ClientModule } from '../client/client.module';
import { CoreModule } from '../core/core.module';
import { ClassManagementModule } from '../class-management/class-management.module';
import { CourseManagementModule } from '../course-management/course-management.module'
import { FrontNotificationComponent } from './front-notification/front-notification.component';
import { FrontAvatarComponent } from './front-avatar/front-avatar.component';



@NgModule({
  declarations: [FrontDeskComponent,FrontNotificationComponent, FrontAvatarComponent],
  imports: [
    ShareModule,
    FrontDeskRoutingModule,
    ClientModule,
    CoreModule,
    ClassManagementModule,
    CourseManagementModule
  ]
})
export class FrontDeskModule { }
