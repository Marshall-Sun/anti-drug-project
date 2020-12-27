import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from '../client/client.component';
import { FrontDeskComponent } from './front-desk.component';
import { DashboardComponent } from '../client/dashboard/dashboard.component';
import { CourselistComponent } from '../client/courselist/courselist.component';
import { ClasslistComponent } from '../client/classlist/classlist.component';
import { ClassManagementComponent } from '../class-management/class-management.component';
import { ManagementDashboardComponent } from '../class-management/management-dashboard/management-dashboard.component';
import { ClassInfoManagementComponent } from '../class-management/class-info-management/class-info-management.component';
import { HeadTeacherSettingComponent } from '../class-management/head-teacher-setting/head-teacher-setting.component';
import { TeacherSettingComponent } from '../class-management/teacher-setting/teacher-setting.component';
import { TutorSettingComponent } from '../class-management/tutor-setting/tutor-setting.component';
import { CourseSettingComponent } from '../class-management/course-setting/course-setting.component';
import { StudentSettingComponent } from '../class-management/student-setting/student-setting.component';
import { PersonalSettingsComponent } from '../client/personal-settings/personal-settings.component';
import { InformationComponent } from '../client/personal-settings/information/information.component';
import { VerificationComponent } from '../client/personal-settings/verification/verification.component';
import { SecuritySettingComponent } from '../client/personal-settings/security-setting/security-setting.component';
import { CourseManagementComponent } from '../course-management/course-management.component'
import { BaseInfoComponent } from '../course-management/base-info/base-info.component';
import { DetailInfoComponent } from '../course-management/detail-info/detail-info.component';
import { CoverPhotoComponent } from '../course-management/cover-photo/cover-photo.component';
import { FileComponent } from '../course-management/file/file.component';
import { QuestionComponent } from '../course-management/question/question.component'
import { TestPaperComponent } from '../course-management/test-paper/test-paper.component';
import { TeacherComponent } from '../client/teacher/teacher.component';
import { UserPageComponent } from '../core/user-page/user-page.component';
import { CoverSettingComponent } from '../class-management/cover-setting/cover-setting.component';
import {TestpaperListingComponent} from '../class-management/testpaper-listing/testpaper-listing.component';
import {ResultTableComponent} from '../class-management/testpaper-listing/result-table/result-table.component';
import {PaperResultDetailComponent} from '../class-management/testpaper-listing/paper-result-detail/paper-result-detail.component';
import {PaperResultAnalysisComponent} from '../class-management/testpaper-listing/paper-result-analysis/paper-result-analysis.component';
import {TeachingPlanManagementComponent} from '../course-management/teaching-plan-management/teaching-plan-management.component';
import {PaperMarkingComponent} from '../course-management/paper-marking/paper-marking.component';
import {TestResultTableComponent} from '../course-management/paper-marking/test-result-table/test-result-table.component';
import {StudentManagementComponent} from '../course-management/student-management/student-management.component';
import {TeacherManagementComponent} from '../course-management/teacher-management/teacher-management.component';
import {PlanSettingComponent} from '../course-management/plan-setting/plan-setting.component';
import {OpenresourcedetailComponent} from '../client/openresourcedetail/openresourcedetail.component';
import {OpenresourceComponent} from '../client/openresource/openresource.component';
import {GrouptopicComponent} from '../client/groupmainlist/grouplist/grouptopic/grouptopic.component';
import {GroupInfoComponent} from '../client/groupmainlist/grouplist/group-info/group-info.component';
import {GrouplistComponent} from '../client/groupmainlist/grouplist/grouplist.component';
import {GroupcreateComponent} from '../client/groupmainlist/groupcreate/groupcreate.component';
import {GroupmainlistComponent} from '../client/groupmainlist/groupmainlist.component';
import {NewsCaseModalComponent} from '../client/news/news-case-modal/news-case-modal.component';
import {NewsNewsModalComponent} from '../client/news/news-news-modal/news-news-modal.component';
import {NewsLawModalComponent} from '../client/news/news-law-modal/news-law-modal.component';
import {NewsAllModalComponent} from '../client/news/news-all-modal/news-all-modal.component';
import {NewsTagModalComponent} from '../core/news-component/news-tag-modal/news-tag-modal.component';
import {NewsDetailsModalComponent} from '../core/news-component/news-details-modal/news-details-modal.component';
import {MineManagementComponent} from "../client/mine-management/mine-management.component";
import {TeachingCourseComponent} from "../client/mine-management/teaching-course/teaching-course.component";
import {TeachingClassComponent} from "../client/mine-management/teaching-class/teaching-class.component";
import {StudentQAComponent} from "../client/mine-management/student-qa/student-qa.component";
import {StudentTopicComponent} from "../client/mine-management/student-topic/student-topic.component";
import {TeachingDatabaseComponent} from "../client/mine-management/teaching-database/teaching-database.component";
import {MyCourseComponent} from "../client/mine-management/my-course/my-course.component";
import {MyQAComponent} from "../client/mine-management/my-qa/my-qa.component";
import {MyTopicComponent} from "../client/mine-management/my-topic/my-topic.component";
import {MyNoteComponent} from "../client/mine-management/my-note/my-note.component";
import {MyExamComponent} from "../client/mine-management/my-exam/my-exam.component";
import {MyGroupComponent} from "../client/mine-management/my-group/my-group.component";
import {MyClassComponent} from "../client/mine-management/my-class/my-class.component";
import {MyLiveComponent} from "../client/mine-management/my-live/my-live.component";
import {CreateCourseComponent} from "../client/mine-management/teaching-course/create-course/create-course.component";
import {MyLiveCourseComponent} from "../client/mine-management/my-course/my-live-course/my-live-course.component";
import { FocusDetailComponent } from '../core/focus-detail/focus-detail.component';
import { FansComponent } from "../core/fans/fans.component";
import {MyNoteDetailComponent} from '../client/mine-management/my-note-detail/my-note-detail.component';
import {CourseTaskComponent} from '../client/course-task/course-task.component';
import {GroupnowComponent} from '../client/groupmainlist/groupnow/groupnow.component';
import {GroupmainsearchComponent} from '../client/groupmainlist/groupmainsearch/groupmainsearch.component';
import {GroupsearchComponent} from '../client/groupmainlist/grouplist/groupsearch/groupsearch.component';
import {GroupthreadComponent} from '../client/groupmainlist/grouplist/groupthread/groupthread.component';
import {GroupthreadeditComponent} from '../client/groupmainlist/grouplist/groupthreadedit/groupthreadedit.component';
import {TestPaperCreateComponent} from '../course-management/test-paper/test-paper-create/test-paper-create.component';
import {QuestionCreateComponent} from '../course-management/question/question-create/question-create.component';
import {SingleChoiceComponent} from '../course-management/question/question-create/single-choice/single-choice.component';
import {MultipleChoiceComponent} from '../course-management/question/question-create/multiple-choice/multiple-choice.component';
import {EssayComponent} from '../course-management/question/question-create/essay/essay.component';
import {IndefiniteChoiceComponent} from '../course-management/question/question-create/indefinite-choice/indefinite-choice.component';
import {JudgementComponent} from '../course-management/question/question-create/judgement/judgement.component';
import {CompletionComponent} from '../course-management/question/question-create/completion/completion.component';
import {MaterialComponent} from '../course-management/question/question-create/material/material.component';
import {PlanTasksComponent} from '../course-management/plan-tasks/plan-tasks.component';
import {PlanOverviewComponent} from '../course-management/plan-overview/plan-overview.component';
import {TidingsComponent} from '../client/tidings/tidings.component';
import {MessagesComponent} from '../client/tidings/messages/messages.component';
import {NotificationsComponent} from '../client/tidings/notifications/notifications.component';
import {PrivateChatComponent} from '../client/tidings/private-chat/private-chat.component';
import {CourseinfComponent} from '../client/courseinf/courseinf.component';
import {CoursevideoComponent} from '../client/coursevideo/coursevideo.component';
import {ClassinfComponent} from '../client/classinf/classinf.component';
import { TeachingPlanPageComponent } from '../course-management/teaching-plan-page/teaching-plan-page/teaching-plan-page.component';
import {PaperMarkingComponent as ClassPaperMarkingComponent} from '../class-management/paper-marking/paper-marking.component'
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from '../client/page-not-found/page-not-found.component';
import { TestPaperEditComponent } from '../course-management/test-paper/test-paper-edit/test-paper-edit.component';
import { CourseExamComponent } from '../client/course-exam/course-exam.component';
import { SearchclassComponent } from '../client/search/searchclass/searchclass.component';
import { SearchgroupComponent } from '../client/search/searchgroup/searchgroup.component';
import { SearchnewsComponent } from '../client/search/searchnews/searchnews.component';
import { SearchopensorComponent } from '../client/search/searchopensor/searchopensor.component';
import { SearchcourseComponent } from '../client/search/searchcourse/searchcourse.component';

import {MinePaperMarkingComponent} from "../client/mine-management/paper-marking/paper-marking.component"
import {HomeworkExamComponent} from "../client/homework-exam/homework-exam.component";
import { MineHomeworkMarkingComponent } from '../client/mine-management/homework-marking/homework-marking.component';
import { ClasspaperComponent } from '../client/mine-management/homework-marking/classpaper/classpaper.component';
import { CoursepaperComponent } from '../client/mine-management/homework-marking/coursepaper/coursepaper.component';
import {ClassManagementHomeworkMarkingComponent} from '../class-management/homework-marking/homework-marking.component';
import {HomeworkMarkingComponent} from '../course-management/homework-marking/homework-marking.component';
import {TaskpreviewComponent} from '../client/taskpreview/taskpreview.component';
import {PreviewTestpaperComponent} from '../client/preview-testpaper/preview-testpaper.component';
import {PreviewHomeworkComponent} from '../client/preview-homework/preview-homework.component';
import { OpenresourceManagementComponent } from '../openresource-management/openresource-management.component';
import { OpenresourceBaseInfoComponent } from '../openresource-management/base-info/base-info.component';
import { OpenresourceCoverPhotoComponent } from '../openresource-management/cover-photo/cover-photo.component';
import { OpenresourceFileComponent } from '../openresource-management/file/file.component';
import { OpenresourceStudentManagementComponent } from '../openresource-management/student-management/student-management.component';
import { OpenresourceTeacherManagementComponent } from '../openresource-management/teacher-management/teacher-management.component';
import { OpenresourceCourseSettingComponent } from '../openresource-management/course-setting/course-setting.component';
import { OpenresourcePlanTasksComponent } from '../openresource-management/plan-tasks/plan-tasks.component';

const routes: Routes = [
  { path: '', redirectTo: '/client', pathMatch: 'full' },
 
  {
    path: 'client', component: FrontDeskComponent, children: [
      { path: '', component: ClientComponent },
      { path: 'dashboard', component: DashboardComponent },
      {path: 'searchclass', component: SearchclassComponent},
      {path: 'searchgroup', component: SearchgroupComponent},
      {path: 'searchnews', component: SearchnewsComponent},
      {path: 'searchopensor', component: SearchopensorComponent},
      {path: 'searchcourse', component: SearchcourseComponent},
      { path: 'mine', component:MineManagementComponent, canActivate: [AuthGuard], children:[
          {path: 'teachingcourse', component:TeachingCourseComponent},
          {path: 'createcourse', component:CreateCourseComponent},
          {path: 'teachingclass', component:TeachingClassComponent},
          {path: 'studentQA' , component:StudentQAComponent},
          {path: 'studenttopic', component:StudentTopicComponent},
          {path: 'papermarking', component:MinePaperMarkingComponent},
          {path: 'homeworkmarking',component:MineHomeworkMarkingComponent},
          {path: 'teachingdatabase', component:TeachingDatabaseComponent},
          {path: 'mycourse', component:MyCourseComponent},
          {path: 'myQA', component:MyQAComponent},
          {path: 'mytopic', component:MyTopicComponent},
          {path: 'mynote', component:MyNoteComponent},
          {path: 'mynoteDetail/:id',component:MyNoteDetailComponent},
          {path: 'myexam', component:MyExamComponent},
          {path: 'mygroup', component:MyGroupComponent},
          {path: 'myclass', component:MyClassComponent},
          {path: 'mylive', component:MyLiveComponent},
          {path: 'mylivecourse', component:MyLiveCourseComponent}
        ]},
      { path: 'courselist', component: CourselistComponent},
      { path: 'courseinf/:id', component: CourseinfComponent, canActivate: [AuthGuard]},
      { path: 'courseinf/:id/teachplan/:pid', component: CourseinfComponent, canActivate: [AuthGuard] },
      { path: 'courseinf/:id/teachplan/:pid/previewtask/:taskId', component: TaskpreviewComponent, canActivate: [AuthGuard] },
      { path: 'courseinf/:id/teachplan/:pid/task/:taskId', component: CoursevideoComponent, canActivate: [AuthGuard] },
      { path: 'course_test/:courseId/task/:taskId/test/:testId',component:CourseExamComponent, canActivate: [AuthGuard]},
      {path : 'courseId/:courseId/taskId/:taskId/testId/:testId/homework-exam',component:HomeworkExamComponent, canActivate: [AuthGuard]},
      { path: 'teacher', component: TeacherComponent},
      { path: 'userpage/:id', component: UserPageComponent, canActivate: [AuthGuard], children:[
        {path: 'focus', component: FocusDetailComponent},
        {path: 'fans', component: FansComponent},
        {path: 'focus', component: FocusDetailComponent,outlet:'r2'},
        {path: 'fans', component: FansComponent,outlet:'r2'},
      ]},
      { path: 'classlist', component: ClasslistComponent },
      { path: 'classinf/:id', component: ClassinfComponent, canActivate: [AuthGuard]},
      { path: 'openresource', component: OpenresourceComponent},
      { path: 'openresourcedetail/:id/:url', component: OpenresourcedetailComponent, canActivate: [AuthGuard] },
      {path: 'groupmainlist', component: GroupmainlistComponent,
      children:[
          {path: '', component: GroupnowComponent},
          {path: 'groupmainsearch', component: GroupmainsearchComponent}
        ]},
      {path: 'groupcreate', component: GroupcreateComponent, canActivate: [AuthGuard]},
      {path: 'groupmainlist/:id', component: GrouplistComponent, canActivate: [AuthGuard],
       children: [
          {path: '', component: GroupInfoComponent},
          {path: 'groupthread/grouptopic', component: GrouptopicComponent},
          {path: 'groupsearch', component: GroupsearchComponent},
          {path: 'groupthread/:id', component: GroupthreadComponent},
          {path: 'groupthread/:id/groupthreadedit', component: GroupthreadeditComponent}
        ]},
      { path: 'newsall', component: NewsAllModalComponent},
      { path: 'newslaw', component: NewsLawModalComponent },
      { path: 'newsnews', component: NewsNewsModalComponent},
      { path: 'newscase', component: NewsCaseModalComponent},
      { path: 'newsdetails/:id', component: NewsDetailsModalComponent, canActivate: [AuthGuard]},
      { path: 'newstag/:id', component: NewsTagModalComponent, canActivate: [AuthGuard]},
      {
        path: 'classroom/:id', component: ClassManagementComponent, canActivate: [AuthGuard], children: [
          { path: '', redirectTo: 'manage', pathMatch: 'full' },
          { path: 'manage', component: ManagementDashboardComponent },
          { path: 'basicinfo', component: ClassInfoManagementComponent },
          { path: 'headteacher', component: HeadTeacherSettingComponent },
          { path: 'teachersetting', component: TeacherSettingComponent },
          { path: 'tutorsetting', component: TutorSettingComponent },
          { path: 'coursesetting', component: CourseSettingComponent },
          { path: 'studentsetting', component: StudentSettingComponent },
          { path: 'coversetting', component: CoverSettingComponent },
          { path: 'testpaper', component: ClassPaperMarkingComponent},
          { path: 'homeworkmarking',component:ClassManagementHomeworkMarkingComponent},
         // { path: 'testpaper/:paperid/resulttable', component: ResultTableComponent }
        ]},
      { path: 'testpaper/:paperid/result/:studentid', component: PaperResultDetailComponent, canActivate: [AuthGuard] },
      {path:'courseId/:courseId/taskId/:taskId/preview_homework',component:PreviewHomeworkComponent},
      {path:'testId/:testId/preview_homework',component:PreviewHomeworkComponent},
      {path:'courseId/:courseId/taskId/:taskId/preview_testpaper',component:PreviewTestpaperComponent},
      {path:'testId/:testId/preview_testpaper',component:PreviewTestpaperComponent},
      { path: 'tidings', component:TidingsComponent, canActivate: [AuthGuard], children: [
          { path: '', redirectTo: 'messages', pathMatch: 'full' },
          { path: 'messages', component: MessagesComponent },
          { path: 'notifications', component: NotificationsComponent },
          { path: 'privatechat/:name', component: PrivateChatComponent },
        ]
      },
      {
        path: 'settings', component: PersonalSettingsComponent, canActivate: [AuthGuard], children: [
          { path: '', redirectTo: 'information', pathMatch: 'full' },
          { path: 'information', component: InformationComponent },
          { path: 'verification', component: VerificationComponent },
          { path: 'security', component: SecuritySettingComponent },
        ]
      },
      {
        path: 'openresource/:id', component: OpenresourceManagementComponent, children: [
          { path: '', redirectTo: 'base', pathMatch: 'full' },
          { path: 'base', component: OpenresourceBaseInfoComponent },
          { path: 'cover', component: OpenresourceCoverPhotoComponent },
          { path: 'file', component: OpenresourceFileComponent },
          { path: 'studentsetting', component: OpenresourceStudentManagementComponent },
          { path: 'teachersetting', component: OpenresourceTeacherManagementComponent },
          { path: 'coursesetting', component: OpenresourceCourseSettingComponent },
          { path: 'tasks', component: OpenresourcePlanTasksComponent },
        ]
      },
      {
        path: 'course/:id', component: CourseManagementComponent, canActivate: [AuthGuard], children: [
          { path: '', redirectTo: 'base', pathMatch: 'full' },
          { path: 'base', component: BaseInfoComponent },
          { path: 'detail', component: DetailInfoComponent },
          { path: 'cover', component: CoverPhotoComponent },
          { path: 'file', component: FileComponent },
          { path: 'testpaper', component: TestPaperComponent },
          { path: 'testpapercreate', component: TestPaperCreateComponent },
          { path: 'testpaperedit/:testPaperId', component: TestPaperEditComponent },
          { path: 'question', component: QuestionComponent },
          {
            path: 'question_create', component: QuestionCreateComponent, children: [
              { path: '', redirectTo: 'single_choice', pathMatch: 'full' },
              { path: 'single_choice', component: SingleChoiceComponent },
              { path: 'single_choice/:id', component: SingleChoiceComponent },
              { path: 'mutiple_choice', component: MultipleChoiceComponent },
              { path: 'mutiple_choice/:id', component: MultipleChoiceComponent },
              { path: 'essay', component: EssayComponent },
              { path: 'choice', component: IndefiniteChoiceComponent },
              { path: 'choice/:id', component: IndefiniteChoiceComponent },
              { path: 'determine', component: JudgementComponent },
              { path: 'determine/:id', component: JudgementComponent },
              { path: 'completion', component: CompletionComponent },
              { path: 'material', component: MaterialComponent }
            ]
          },
          { path: 'teaching_plan', component: TeachingPlanManagementComponent },       
        ]
      },
      { path: 'course/:id/teaching_plan_page/:pid', component: TeachingPlanPageComponent, canActivate: [AuthGuard], children: [
        { path: '', redirectTo: 'tasks', pathMatch: 'full' },
        //{ path: 'overview', component: PlanOverviewComponent },
        { path: 'tasks', component: PlanTasksComponent },
        { path: 'plansetting', component: PlanSettingComponent },
        { path: 'studentsetting', component: StudentManagementComponent },
        { path: 'teachersetting', component: TeacherManagementComponent },
        { path: 'papers', component: PaperMarkingComponent },
        { path: 'homeworkmarking',component:HomeworkMarkingComponent},
        { path: 'papers/:paperid/resulttable', component: TestResultTableComponent },
      ] },
      { path: 'course/:courseid/analysis/:courseTaskId', component: PaperResultAnalysisComponent, canActivate: [AuthGuard]},
      { path:'course/:id/task/:id/show',component:CourseTaskComponent, canActivate: [AuthGuard]}
    ]
  },
  
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontDeskRoutingModule { }
