import { NgModule } from '@angular/core';
import { ClientComponent } from './client.component';
import { ShareModule } from '../share/share.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CourselistComponent} from './courselist/courselist.component';
import {CoreModule} from '../core/core.module';
import { TeacherComponent } from './teacher/teacher.component';
import { ClasslistComponent } from './classlist/classlist.component';
import { PersonalSettingsComponent } from './personal-settings/personal-settings.component';
import { InformationComponent } from './personal-settings/information/information.component';
import { RouterModule } from '@angular/router';
import { VerificationComponent } from './personal-settings/verification/verification.component';
import { SecuritySettingComponent } from './personal-settings/security-setting/security-setting.component'
import { QuillModule } from 'ngx-quill'
import {OpenresourceComponent} from './openresource/openresource.component';
import {OpenresourcedetailComponent} from './openresourcedetail/openresourcedetail.component';
import {GroupmainlistComponent} from './groupmainlist/groupmainlist.component';
import {GroupnowComponent} from './groupmainlist/groupnow/groupnow.component';
import {GrouplistComponent} from './groupmainlist/grouplist/grouplist.component';
import {GrouphotComponent} from './groupmainlist/grouphot/grouphot.component';
import {GroupcreateComponent} from './groupmainlist/groupcreate/groupcreate.component';
import {GroupInfoComponent} from './groupmainlist/grouplist/group-info/group-info.component';
import {GroupeditComponent} from './groupmainlist/grouplist/groupedit/groupedit.component';
import {GroupfirstComponent} from './groupmainlist/grouplist/groupfirst/groupfirst.component';
import {GroupmemberComponent} from './groupmainlist/grouplist/groupmember/groupmember.component';
import {GrouptabComponent} from './groupmainlist/grouplist/grouptab/grouptab.component';
import {GrouptopicComponent} from './groupmainlist/grouplist/grouptopic/grouptopic.component';
import {BackgroundComponent} from './groupmainlist/grouplist/groupedit/background/background.component';
import {EditComponent} from './groupmainlist/grouplist/groupedit/edit/edit.component';
import {EdittabComponent} from './groupmainlist/grouplist/groupedit/edittab/edittab.component';
import {IconComponent} from './groupmainlist/grouplist/groupedit/icon/icon.component';
import {NewsAllModalComponent} from './news/news-all-modal/news-all-modal.component';
import {NewsLawModalComponent} from './news/news-law-modal/news-law-modal.component';
import {NewsNewsModalComponent} from './news/news-news-modal/news-news-modal.component';
import {NewsCaseModalComponent} from './news/news-case-modal/news-case-modal.component';
import { MineManagementComponent } from './mine-management/mine-management.component';
import { TeachingCourseComponent } from './mine-management/teaching-course/teaching-course.component';
import { TeachingCourseTabComponent } from './mine-management/teaching-course/teaching-course-tab/teaching-course-tab.component';
import { NormalCourseComponent } from './mine-management/teaching-course/normal-course/normal-course.component';
import { LiveCourseComponent } from './mine-management/teaching-course/live-course/live-course.component';
import { ClassCourseComponent } from './mine-management/teaching-course/class-course/class-course.component';
import { RecordCourseComponent } from './mine-management/teaching-course/record-course/record-course.component';
import { OpenCourseComponent } from './mine-management/teaching-course/open-course/open-course.component';
import { TeachingClassComponent } from './mine-management/teaching-class/teaching-class.component';
import { StudentQAComponent } from './mine-management/student-qa/student-qa.component';
import { StudentTopicComponent } from './mine-management/student-topic/student-topic.component';
import { TopicTabComponent } from './mine-management/student-topic/topic-tab/topic-tab.component';
import { CourseTopicComponent } from './mine-management/student-topic/course-topic/course-topic.component';
import { ClassTopicComponent } from './mine-management/student-topic/class-topic/class-topic.component';
import { MinePaperMarkingComponent } from './mine-management/paper-marking/paper-marking.component';
import { PaperMarkingTabComponent } from './mine-management/paper-marking/paper-marking-tab/paper-marking-tab.component';
import { HaveMarkedComponent } from './mine-management/paper-marking/have-marked/have-marked.component';
import { NotMarkedComponent } from './mine-management/paper-marking/not-marked/not-marked.component';
import { TeachingDatabaseComponent } from './mine-management/teaching-database/teaching-database.component';
import { TeachingDatabaseTabComponent } from './mine-management/teaching-database/teaching-database-tab/teaching-database-tab.component';
import { MyInformationComponent } from './mine-management/teaching-database/my-information/my-information.component';
import { PublicInformationComponent } from './mine-management/teaching-database/public-information/public-information.component';
import { FavoritesComponent } from './mine-management/teaching-database/favorites/favorites.component';
import { FromSharingComponent } from './mine-management/teaching-database/from-sharing/from-sharing.component';
import { MyCourseComponent } from './mine-management/my-course/my-course.component';
import { MyCourseTabComponent } from './mine-management/my-course/my-course-tab/my-course-tab.component';
import { LearningCourseComponent } from './mine-management/my-course/learning-course/learning-course.component';
import { LearnedCourseComponent } from './mine-management/my-course/learned-course/learned-course.component';
import { FavoriteCourseComponent } from './mine-management/my-course/favorite-course/favorite-course.component';
import { MyQAComponent } from './mine-management/my-qa/my-qa.component';
import { MyTopicComponent } from './mine-management/my-topic/my-topic.component';
import { MyTopicTabComponent } from './mine-management/my-topic/my-topic-tab/my-topic-tab.component';
import { MyNoteComponent } from './mine-management/my-note/my-note.component';
import { MyClassComponent } from './mine-management/my-class/my-class.component';
import { MyLiveComponent } from './mine-management/my-live/my-live.component';
import { CreateCourseComponent } from './mine-management/teaching-course/create-course/create-course.component';
import { MyLiveCourseComponent} from "./mine-management/my-course/my-live-course/my-live-course.component";

import { TdClassificationComponent } from './mine-management/teaching-database/td-classification/td-classification.component';
import { TdCardComponent } from './mine-management/teaching-database/td-card/td-card.component';
import {MyExamComponent} from "./mine-management/my-exam/my-exam.component";
import {MyGroupComponent} from "./mine-management/my-group/my-group.component";

import { ExamRecordComponent } from './mine-management/my-exam/exam-record/exam-record.component';
import { QuestionRecordComponent } from './mine-management/my-exam/question-record/question-record.component';
import { TopicRecordComponent } from './mine-management/my-group/topic-record/topic-record.component';
import { TopicComponent } from './mine-management/my-group/topic/topic.component';
import { GroupJoinComponent } from './mine-management/my-group/group-join/group-join.component';
import { MyGroupJoinComponent } from './mine-management/my-group/my-group-join/my-group-join.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import {MyNoteDetailComponent} from './mine-management/my-note-detail/my-note-detail.component';
import {TopicPostComponent} from './mine-management/my-group/topic-post/topic-post.component';
import {MyOwnGroupComponent} from './mine-management/my-group/my-own-group/my-own-group.component';
import {CourseTaskComponent} from './course-task/course-task.component';
import {MyClassTopicComponent} from './mine-management/my-topic/class-topic/class-topic.component';
import {MyCourseTopicComponent} from './mine-management/my-topic/course-topic/course-topic.component';
import {GroupsearchComponent} from './groupmainlist/grouplist/groupsearch/groupsearch.component';
import {GroupmainsearchComponent} from './groupmainlist/groupmainsearch/groupmainsearch.component';
import {GroupthreadeditComponent} from './groupmainlist/grouplist/groupthreadedit/groupthreadedit.component';
import {GroupthreadComponent} from './groupmainlist/grouplist/groupthread/groupthread.component';
import {MessagesComponent} from './tidings/messages/messages.component';
import {PrivateChatComponent} from './tidings/private-chat/private-chat.component';
import {NotificationsComponent} from './tidings/notifications/notifications.component';
import {TidingsComponent} from './tidings/tidings.component';

import { ClassinfHeaderComponent } from './classinf/classinf-header/classinf-header.component';
import { ClassinfIntroducesComponent } from './classinf/classinf-introduces/classinf-introduces.component';
import { ClassinfCoursesComponent } from './classinf/classinf-courses/classinf-courses.component';
import { ClassinfCommentComponent } from './classinf/classinf-comment/classinf-comment.component';
import { ClassinfTopicComponent } from './classinf/classinf-topic/classinf-topic.component';
import { ClassinfNotesComponent } from './classinf/classinf-notes/classinf-notes.component';
import { ClassinfTeachersComponent } from './classinf/classinf-teachers/classinf-teachers.component';
import { SigninComponent } from './classinf/signin/signin.component';
import { ClassinfHeadmasterComponent } from './classinf/classinf-headmaster/classinf-headmaster.component';
import { ClassinfStudentlistComponent } from './classinf/classinf-studentlist/classinf-studentlist.component';
import { CourseinfHeaderComponent } from './courseinf/courseinf-header/courseinf-header.component';
import { CourseinfIntroduceComponent } from './courseinf/courseinf-introduce/courseinf-introduce.component';
import { CourseinfCoursesComponent } from './courseinf/courseinf-courses/courseinf-courses.component';
import { CourseinfTopicComponent } from './courseinf/courseinf-topic/courseinf-topic.component';
import { CourseinfNotesComponent } from './courseinf/courseinf-notes/courseinf-notes.component';
import { CourseinfCommentComponent } from './courseinf/courseinf-comment/courseinf-comment.component';
import { CourseinfCourselistBottomComponent } from './courseinf/courseinf-courselist-bottom/courseinf-courselist-bottom.component';
import { CourseinfCoursefeatureComponent } from './courseinf/courseinf-coursefeature/courseinf-coursefeature.component';
import { CourseinfNewstudentsComponent } from './courseinf/courseinf-newstudents/courseinf-newstudents.component';
import { CourseinfComponent } from './courseinf/courseinf.component';
import { ClassinfComponent } from './classinf/classinf.component';
import { CourseinfMaterialComponent } from './courseinf/courseinf-material/courseinf-material.component';
import { ClasslistSortModalComponent } from './classlist/classlist-sort-modal/classlist-sort-modal.component';
import {CoursevideoComponent} from './coursevideo/coursevideo.component'
import {ClasslistListviewModalComponent} from './classlist/classlist-listview-modal/classlist-listview-modal.component';
import {ClasslistClassblockModalComponent} from './classlist/classlist-classblock-modal/classlist-classblock-modal.component';
import {ClasslistClassificationModalComponent} from './classlist/classlist-classification-modal/classlist-classification-modal.component';
import {TeacherblockComponent} from './classinf/teacherblock/teacherblock.component';
import {CourselistClassificationModalComponent} from './courselist/courselist-classification-modal/courselist-classification-modal.component';
import {ClassificationListComponent} from './courselist/courselist-classification-modal/classification-list/classification-list.component';
import {CourselistSortModalComponent} from './courselist/courselist-sort-modal/courselist-sort-modal.component';
import {CourselistListviewModalComponent} from './courselist/courselist-listview-modal/courselist-listview-modal.component';
import {CourselistCourseblockModalComponent} from './courselist/courselist-courseblock-modal/courselist-courseblock-modal.component';
import {CourseinfTeacherlistModalComponent} from './courseinf/courseinf-teacherlist-modal/courseinf-teacherlist-modal.component';
import {CourseinfStudentdynamicsModalComponent} from './courseinf/courseinf-studentdynamics-modal/courseinf-studentdynamics-modal.component';

import { TeachPlanPageComponent } from './course-management/teach-plan-page/teach-plan-page/teach-plan-page.component';
import { PaperListComponent } from './mine-management/paper-marking/paper-list/paper-list.component';
import { HomeworkMarkingComponent } from './mine-management/homework-marking/homework-marking.component';
import { HomeworkMarkingTabComponent } from './mine-management/homework-marking/homework-marking-tab/homework-marking-tab.component';
import { DashboardMenuComponent } from './dashboard/dashboard-menu/dashboard-menu.component';
import { DashboardListComponent } from './dashboard/dashboard-list/dashboard-list.component';
import { DashboardListCourseComponent } from './dashboard/dashboard-list/dashboard-list-course/dashboard-list-course.component';
import { DashboardListOpenresourceComponent } from './dashboard/dashboard-list/dashboard-list-openresource/dashboard-list-openresource.component';
import { DashboardListStudentComponent } from './dashboard/dashboard-list/dashboard-list-student/dashboard-list-student.component';
import { DashboardListTeacherComponent } from './dashboard/dashboard-list/dashboard-list-teacher/dashboard-list-teacher.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HaveMarkedClasspaperComponent } from './mine-management/paper-marking/have-marked-classpaper/have-marked-classpaper.component';
import { HaveMarkedCoursepaperComponent } from './mine-management/paper-marking/have-marked-coursepaper/have-marked-coursepaper.component';
import { NotMarkedClasspaperComponent } from './mine-management/paper-marking/not-marked-classpaper/not-marked-classpaper.component';
import { NotMarkedCoursepaperComponent } from './mine-management/paper-marking/not-marked-coursepaper/not-marked-coursepaper.component';
import { CourseExamComponent } from './course-exam/course-exam.component';
import { SearchclassComponent } from './search/searchclass/searchclass.component';
import { SearchopensorComponent } from './search/searchopensor/searchopensor.component';
import { SearchgroupComponent } from './search/searchgroup/searchgroup.component';
import { SearchnewsComponent } from './search/searchnews/searchnews.component';
import { SearchcourseComponent } from './search/searchcourse/searchcourse.component';


@NgModule({
  declarations: [
    TeacherComponent,
    ClientComponent,
    DashboardComponent,
    CourselistComponent,
    PersonalSettingsComponent,
    ClasslistComponent,
    InformationComponent,
    VerificationComponent,
    SecuritySettingComponent,
    OpenresourceComponent,
    OpenresourcedetailComponent,
    GroupmainlistComponent,
    GroupnowComponent,
    GrouplistComponent,
    GrouphotComponent,
    GroupcreateComponent,
    GroupInfoComponent,
    GroupeditComponent,
    GroupfirstComponent,
    GroupmemberComponent,
    GrouptabComponent,
    GrouptopicComponent,
    BackgroundComponent,
    EditComponent,
    EdittabComponent,
    IconComponent,
    MessagesComponent,
    PrivateChatComponent,
    NotificationsComponent,
    TidingsComponent,
    NewsAllModalComponent,
    NewsLawModalComponent,
    ClasslistListviewModalComponent,
    ClasslistClassblockModalComponent,
    TeacherblockComponent,
    CourselistClassificationModalComponent,
    ClassificationListComponent,
    CourselistSortModalComponent,
    CourselistListviewModalComponent,
    CourselistCourseblockModalComponent,
    CourseinfTeacherlistModalComponent,
    CourseinfStudentdynamicsModalComponent,
    ClasslistClassificationModalComponent,
    ClassinfHeaderComponent, ClassinfIntroducesComponent, ClassinfCoursesComponent,
    ClassinfCommentComponent, ClassinfTopicComponent, ClassinfNotesComponent, ClassinfTeachersComponent, CourseinfComponent, ClassinfComponent,
    SigninComponent, ClassinfHeadmasterComponent, ClassinfStudentlistComponent, CourseinfHeaderComponent,
    CourseinfIntroduceComponent, CourseinfCoursesComponent, CourseinfTopicComponent, CourseinfNotesComponent,
    CourseinfCommentComponent, CourseinfCourselistBottomComponent, CourseinfCoursefeatureComponent, CourseinfNewstudentsComponent,
    CourseinfMaterialComponent, ClasslistSortModalComponent,CoursevideoComponent,
    NewsNewsModalComponent, NewsCaseModalComponent,
    MineManagementComponent, TeachingCourseComponent, TeachingCourseTabComponent,
    NormalCourseComponent, LiveCourseComponent, ClassCourseComponent, RecordCourseComponent, OpenCourseComponent, TeachingClassComponent, StudentQAComponent,
    StudentTopicComponent, TopicTabComponent, CourseTopicComponent, ClassTopicComponent, MinePaperMarkingComponent, PaperMarkingTabComponent, HaveMarkedComponent,
    NotMarkedComponent, TeachingDatabaseComponent, TeachingDatabaseTabComponent, MyInformationComponent,
    PublicInformationComponent, FavoritesComponent, FromSharingComponent, MyCourseComponent, MyCourseTabComponent, LearningCourseComponent, LearnedCourseComponent,
    FavoriteCourseComponent, MyQAComponent, MyTopicComponent, MyTopicTabComponent, MyNoteComponent, MyExamComponent, MyGroupComponent,
     MyClassComponent, MyLiveComponent, CreateCourseComponent, MyLiveCourseComponent, ExamRecordComponent, QuestionRecordComponent,
    TopicRecordComponent, TopicComponent, GroupJoinComponent, MyGroupJoinComponent,TdClassificationComponent, TdCardComponent, MyNoteDetailComponent, MyCourseComponent,
    TopicPostComponent, MyOwnGroupComponent, CourseTaskComponent, MyClassTopicComponent, MyCourseTopicComponent, GroupsearchComponent, GroupmainsearchComponent, GroupthreadComponent,
    GroupthreadeditComponent, TeachPlanPageComponent,PaperListComponent,HomeworkMarkingComponent,HomeworkMarkingTabComponent,
    DashboardMenuComponent, DashboardListComponent, DashboardListCourseComponent, DashboardListOpenresourceComponent, DashboardListStudentComponent, DashboardListTeacherComponent, 
    PageNotFoundComponent,HaveMarkedClasspaperComponent,HaveMarkedCoursepaperComponent,NotMarkedClasspaperComponent,
    NotMarkedCoursepaperComponent,CourseExamComponent,SearchclassComponent, SearchopensorComponent, SearchgroupComponent, SearchnewsComponent, SearchcourseComponent
  ],
  imports: [
    ShareModule,
    CoreModule,
    RouterModule,
    QuillModule,
    NzDropDownModule
  ]
})
export class ClientModule { }
