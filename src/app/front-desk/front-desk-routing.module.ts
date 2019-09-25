import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientComponent} from '../client/client.component';
import {FrontDeskComponent} from './front-desk.component';
import {DashboardComponent} from '../client/dashboard/dashboard.component';
import {CourselistComponent} from '../client/courselist/courselist.component';
import {TeacherComponent} from '../client/teacher/teacher.component';
import {UserPageComponent} from '../core/user-page/user-page.component'


const routes: Routes = [
  { path: '', redirectTo: '/client', pathMatch: 'full'},
  { path: 'client', component: FrontDeskComponent, children: [
      { path: '', component: ClientComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'courselist', component: CourselistComponent},
      { path: 'teacher', component: TeacherComponent},
      { path: 'userpage', component: UserPageComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontDeskRoutingModule { }
