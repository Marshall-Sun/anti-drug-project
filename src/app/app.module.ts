import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { ShareModule } from './share/share.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FrontDeskModule } from './front-desk/front-desk.module';
import { BackgroundModule } from './background/background.module';
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
import { LoginModalComponent } from './core/modal/login-modal/login-modal.component';
import { CoreModule } from './core/core.module';
import { UserInfoViewModalComponent } from './core/modal/user-info-view-modal/user-info-view-modal.component';
import { UserInfoEditModalComponent } from './core/modal/user-info-edit-modal/user-info-edit-modal.component';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';
import { CreateUserModalComponent } from './core/modal/create-user-modal/create-user-modal.component';
import { CreateTagModalComponent } from './core/modal/create-tag-modal/create-tag-modal.component';
import { CreateTagGroupModalComponent } from './core/modal/create-tag-group-modal/create-tag-group-modal.component';
import { TagInfoEditComponent } from './core/modal/tag-info-edit-modal/tag-info-edit.component';
import { TeacherRecommendModalComponent } from './core/modal/teacher-recommend-modal/teacher-recommend-modal.component';
import { CategoryEditModalComponent } from './core/modal/category-edit-modal/category-edit-modal.component';
import { TagGroupInfoEditModalComponent } from './core/modal/tag-group-info-edit-modal/tag-group-info-edit-modal.component';
import { NewsEditModalComponent } from './core/modal/news-edit-modal/news-edit-modal.component';
import { ProgramaEditModalComponent } from './core/modal/programa-edit-modal/programa-edit-modal.component';
import { AnnouncementEditModalComponent } from './core/modal/announcement-edit-modal/announcement-edit-modal.component';
import { AddingCourseModalComponent } from './core/modal/adding-course-modal/adding-course-modal.component';
import { ClientModule } from './client/client.module'
import { LoginPasswdEditModelComponent } from './core/modal/login-passwd-edit-model/login-passwd-edit-model.component';
import { SecurityProblemEditModalComponent } from './core/modal/security-problem-edit-modal/security-problem-edit-modal.component';
import { CourseManagementModule } from './course-management/course-management.module'
import {PaperScoreStatisticsComponent} from './core/modal/paper-score-statistics/paper-score-statistics.component';
import {TeachingPlanAddingModalComponent} from './core/modal/teaching-plan-adding-modal/teaching-plan-adding-modal.component';
import { RegisterModalComponent } from './core/modal/register-modal/register-modal.component';
import { FindPasswdModalComponent } from './core/modal/find-passwd-modal/find-passwd-modal.component';
import { CommonInterceptor } from './share/common-interceptor.interceptor';
import { SelectQuestionComponent } from './core/modal/select-question/select-question.component';
import { HotspotModalComponent } from './core/modal/hotspot-modal/hotspot-modal.component';
import { OpenresourceManagementModule } from './openresource-management/openresource-management.module';
registerLocaleData(zh);
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ShareModule,
    FrontDeskModule,
    BackgroundModule,
    FormsModule,
    CoreModule,
    QuillModule.forRoot(),
    ClientModule,
    CourseManagementModule,
    OpenresourceManagementModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    QuillEditorComponent,
    QuillModule,
    {
      provide: HTTP_INTERCEPTORS,
          useClass: CommonInterceptor,
          multi: true
    },
  ],
  entryComponents: [
    HotspotModalComponent,
    LoginModalComponent,
    RegisterModalComponent,
    FindPasswdModalComponent,
    LoginPasswdEditModelComponent,
    SecurityProblemEditModalComponent,
    UserInfoViewModalComponent,
    UserInfoEditModalComponent,
    CreateUserModalComponent,
    CreateTagModalComponent,
    CreateTagGroupModalComponent,
    TagInfoEditComponent,
    TagGroupInfoEditModalComponent,
    TeacherRecommendModalComponent,
    CategoryEditModalComponent,
    NewsEditModalComponent,
    ProgramaEditModalComponent,
    AnnouncementEditModalComponent,
    AddingCourseModalComponent,
    PaperScoreStatisticsComponent,
    TeachingPlanAddingModalComponent,
    SelectQuestionComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
