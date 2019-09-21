import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from '../client/client.component';
import { FrontDeskComponent } from './front-desk.component';
import { DashboardComponent } from '../client/dashboard/dashboard.component';
import { CourselistComponent } from '../client/courselist/courselist.component';
import { PersonalSettingsComponent } from '../client/personal-settings/personal-settings.component';
import { InformationComponent } from '../client/personal-settings/information/information.component';
import { VerificationComponent } from '../client/personal-settings/verification/verification.component';
import { SecuritySettingComponent } from '../client/personal-settings/security-setting/security-setting.component';

const routes: Routes = [
  { path: '', redirectTo: '/client', pathMatch: 'full' },
  {
    path: 'client', component: FrontDeskComponent, children: [
      { path: '', component: ClientComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'courselist', component: CourselistComponent },
      {
        path: 'settings', component: PersonalSettingsComponent, children: [
          { path: 'information', component: InformationComponent },
          { path: 'verification', component: VerificationComponent },
          { path: 'security', component: SecuritySettingComponent },
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontDeskRoutingModule { }
