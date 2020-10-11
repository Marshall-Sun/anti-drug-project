import { NgModule } from '@angular/core';
import { LoginModalComponent } from './modal/login-modal/login-modal.component';
import { ShareModule } from '../share/share.module';
import { UserInfoViewModalComponent } from './modal/user-info-view-modal/user-info-view-modal.component';
import { UserInfoEditModalComponent } from './modal/user-info-edit-modal/user-info-edit-modal.component';
import { QuillModule } from 'ngx-quill';
import { CreateUserModalComponent } from './modal/create-user-modal/create-user-modal.component';
import { CreateTagModalComponent } from './modal/create-tag-modal/create-tag-modal.component';
import { CreateTagGroupModalComponent } from './modal/create-tag-group-modal/create-tag-group-modal.component';
import { TeacherRecommendModalComponent } from './modal/teacher-recommend-modal/teacher-recommend-modal.component';
import { TagInfoEditComponent } from './modal/tag-info-edit-modal/tag-info-edit.component';
import { TagGroupInfoEditModalComponent } from './modal/tag-group-info-edit-modal/tag-group-info-edit-modal.component';
import { CategoryEditModalComponent } from './modal/category-edit-modal/category-edit-modal.component';
import { NewsEditModalComponent } from './modal/news-edit-modal/news-edit-modal.component';
import { ProgramaEditModalComponent } from './modal/programa-edit-modal/programa-edit-modal.component';
import { AnnouncementEditModalComponent } from './modal/announcement-edit-modal/announcement-edit-modal.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AutocompleteInputComponent } from './class-management-component/autocomplete-input/autocomplete-input.component';
import { AddingCourseModalComponent } from './modal/adding-course-modal/adding-course-modal.component';
import { LoginPasswdEditModelComponent } from './modal/login-passwd-edit-model/login-passwd-edit-model.component';
import { SecurityProblemEditModalComponent } from './modal/security-problem-edit-modal/security-problem-edit-modal.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { PaperScoreStatisticsComponent } from './modal/paper-score-statistics/paper-score-statistics.component';
import { TeachingPlanAddingModalComponent } from './modal/teaching-plan-adding-modal/teaching-plan-adding-modal.component';
import {NewsTagModalComponent} from './news-component/news-tag-modal/news-tag-modal.component';
import {NewsDetailsModalComponent} from './news-component/news-details-modal/news-details-modal.component';
import {NewsSortModalComponent} from './news-component/news-sort-modal/news-sort-modal.component';
import {NewsListviewModalComponent} from './news-component/news-listview-modal/news-listview-modal.component';
import {NewsClassificationModalComponent} from './news-component/news-classification-modal/news-classification-modal.component';
import {NewsNewsblockModalComponent} from './news-component/news-newsblock-modal/news-newsblock-modal.component';
import { FocusDetailComponent } from './focus-detail/focus-detail.component';
import { CoreRoutingModule  } from "./core-routing.module";
import { FansComponent } from './fans/fans.component';
import {RouterModule} from '@angular/router';
import {OpenRsourceVideoPlayerComponent} from './openResource-video-player/openResource-video-player.component'
import { RegisterModalComponent } from './modal/register-modal/register-modal.component';
import { FindPasswdModalComponent } from './modal/find-passwd-modal/find-passwd-modal.component';
import { SelectQuestionComponent } from './modal/select-question/select-question.component';
import { VideoPlayerComponent } from './video-player/video-player/video-player.component';
import { VideoPlayerComponent as ParentVideoPlayerComponet } from './video-player/video-player.component';
import { HotspotModalComponent } from './modal/hotspot-modal/hotspot-modal.component';


@NgModule({
  declarations: [
    HotspotModalComponent,
    LoginModalComponent,
    UserInfoViewModalComponent,
    UserInfoEditModalComponent,
    TagInfoEditComponent,
    CreateUserModalComponent,
    CreateTagModalComponent,
    CreateTagGroupModalComponent,
    TeacherRecommendModalComponent,
    TagGroupInfoEditModalComponent,
    CategoryEditModalComponent, NewsEditModalComponent, ProgramaEditModalComponent, AnnouncementEditModalComponent,
    UserPageComponent,
    AutocompleteInputComponent,
    AddingCourseModalComponent,
    LoginPasswdEditModelComponent,
    SecurityProblemEditModalComponent,
    PaperScoreStatisticsComponent,
    TeachingPlanAddingModalComponent,
    NewsNewsblockModalComponent,
    NewsClassificationModalComponent,
    NewsListviewModalComponent,
    NewsSortModalComponent,
    NewsDetailsModalComponent,
    NewsTagModalComponent,
    FocusDetailComponent,
    FansComponent,
    OpenRsourceVideoPlayerComponent,
    RegisterModalComponent,
    FindPasswdModalComponent,
    SelectQuestionComponent,
    VideoPlayerComponent,
    ParentVideoPlayerComponet
  ],
  imports: [
    ShareModule,
    QuillModule,
    NgxEchartsModule,
    CoreRoutingModule ,
    RouterModule

  ],
  exports: [
    HotspotModalComponent,
    LoginModalComponent,
    UserInfoViewModalComponent,
    UserInfoEditModalComponent,
    CreateUserModalComponent,
    CreateTagModalComponent,
    CreateTagGroupModalComponent,
    TagInfoEditComponent,
    TeacherRecommendModalComponent,
    TagGroupInfoEditModalComponent,
    CategoryEditModalComponent,
    NewsEditModalComponent,
    ProgramaEditModalComponent,
    AnnouncementEditModalComponent,
    AutocompleteInputComponent,
    AddingCourseModalComponent,
    LoginPasswdEditModelComponent,
    NewsNewsblockModalComponent,
    NewsClassificationModalComponent,
    NewsListviewModalComponent,
    NewsSortModalComponent,
    NewsDetailsModalComponent,
    NewsTagModalComponent,
    FocusDetailComponent,
    FansComponent,
    OpenRsourceVideoPlayerComponent,
    RegisterModalComponent,
    FindPasswdModalComponent,
    SelectQuestionComponent,
    VideoPlayerComponent
  ]
})
export class CoreModule { }
