import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { ClassManagementComponent } from './class-management.component';
import { CoreModule } from '../core/core.module';
import { ManagementDashboardComponent } from './management-dashboard/management-dashboard.component';
import { RouterModule } from '@angular/router';
import { ClassInfoManagementComponent } from './class-info-management/class-info-management.component';
import { HeadTeacherSettingComponent } from './head-teacher-setting/head-teacher-setting.component';
import { TeacherSettingComponent } from './teacher-setting/teacher-setting.component';
import { TutorSettingComponent } from './tutor-setting/tutor-setting.component';
import { CourseSettingComponent } from './course-setting/course-setting.component';
import { StudentSettingComponent } from './student-setting/student-setting.component';
import { StudentSettingTabComponent } from './student-setting/student-setting-tab/student-setting-tab.component';
import { FormalStudentTableComponent } from './student-setting/formal-student-table/formal-student-table.component';
import { InformalStudentTableComponent } from './student-setting/informal-student-table/informal-student-table.component';
import { StudentInvolveRecordComponent } from './student-setting/student-involve-record/student-involve-record.component';
import { StudentExitRecordComponent } from './student-setting/student-exit-record/student-exit-record.component';
import { QuillModule } from 'ngx-quill';
import { CoverSettingComponent } from './cover-setting/cover-setting.component';
import { ClassManagementHomeworkMarkingComponent } from './homework-marking/homework-marking.component';
import { TestpaperListingComponent } from './testpaper-listing/testpaper-listing.component';
import { ResultTableComponent } from './testpaper-listing/result-table/result-table.component';
import { PaperResultDetailComponent } from './testpaper-listing/paper-result-detail/paper-result-detail.component';
import { PaperResultAnalysisComponent } from './testpaper-listing/paper-result-analysis/paper-result-analysis.component';
import { PaperMarkingComponent } from './paper-marking/paper-marking.component';
import { ClassManagementHomeworkMarkingTabComponent } from './homework-marking/homework-marking-tab/homework-marking-tab.component';
import { HaveMarkedComponent } from './paper-marking/have-marked/have-marked.component';
import { PaperListComponent } from './paper-marking/paper-list/paper-list.component';
import { PaperMarkingTabComponent } from './paper-marking/paper-marking-tab/paper-marking-tab.component';
import {ClassManagementHaveMarkedClasspaperComponent} from './paper-marking/have-marked-classpaper/have-marked-classpaper.component';
import {CourseManagementHaveMarkedCoursepaperComponent} from '../course-management/paper-marking/have-marked-coursepaper/have-marked-coursepaper.component';
import {ClassManagementClasspaperComponent} from './homework-marking/classpaper/classpaper.component';

@NgModule({
  declarations: [ClassManagementComponent, ManagementDashboardComponent, ClassInfoManagementComponent, HeadTeacherSettingComponent, TeacherSettingComponent,
    TutorSettingComponent, CourseSettingComponent, StudentSettingComponent, StudentSettingTabComponent, FormalStudentTableComponent, InformalStudentTableComponent, 
    StudentInvolveRecordComponent, StudentExitRecordComponent, CoverSettingComponent, ClassManagementHomeworkMarkingComponent, PaperMarkingComponent, TestpaperListingComponent,
    ResultTableComponent, PaperResultDetailComponent, PaperResultAnalysisComponent,ClassManagementHomeworkMarkingTabComponent,HaveMarkedComponent,PaperListComponent,
    ClassManagementClasspaperComponent,
    ClassManagementHaveMarkedClasspaperComponent,
    PaperMarkingTabComponent],
  imports: [
    ShareModule,
    CoreModule,
    RouterModule,
    QuillModule
  ]
})
export class ClassManagementModule { }
