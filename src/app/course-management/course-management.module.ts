import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { CourseManagementComponent } from './course-management.component';
import { BaseInfoComponent } from './base-info/base-info.component';
import { DetailInfoComponent } from './detail-info/detail-info.component';
import { CoverPhotoComponent } from './cover-photo/cover-photo.component';
import { QuillModule } from 'ngx-quill';
import { FileComponent } from './file/file.component';
import { TestPaperComponent } from './test-paper/test-paper.component';
import { QuestionComponent } from './question/question.component';
import { TestPaperCreateComponent } from './test-paper/test-paper-create/test-paper-create.component';
import { SingleChoiceComponent } from './question/question-create/single-choice/single-choice.component';
import { MultipleChoiceComponent } from './question/question-create/multiple-choice/multiple-choice.component';
import { EssayComponent } from './question/question-create/essay/essay.component';
import { IndefiniteChoiceComponent } from './question/question-create/indefinite-choice/indefinite-choice.component';
import { JudgementComponent } from './question/question-create/judgement/judgement.component';
import { CompletionComponent } from './question/question-create/completion/completion.component';
import { MaterialComponent } from './question/question-create/material/material.component';
import { QuestionCreateComponent } from './question/question-create/question-create.component';
import { PlanOverviewComponent } from './plan-overview/plan-overview.component';
import { PlanTasksComponent } from './plan-tasks/plan-tasks.component'
import { NgxEchartsModule } from 'ngx-echarts';
import { TeachingPlanManagementComponent } from './teaching-plan-management/teaching-plan-management.component';
import { PaperMarkingComponent } from './paper-marking/paper-marking.component';
import { TestResultTableComponent } from './paper-marking/test-result-table/test-result-table.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import { StudentManagementTabComponent } from './student-management/student-management-tab/student-management-tab.component';
import { FormalStudentTableComponent } from './student-management/formal-student-table/formal-student-table.component';
import { InformalStudentTableComponent } from './student-management/informal-student-table/informal-student-table.component';
import { StudentInvolveRecordComponent } from './student-management/student-involve-record/student-involve-record.component';
import { StudentExitRecordComponent } from './student-management/student-exit-record/student-exit-record.component';
import { TeacherManagementComponent } from './teacher-management/teacher-management.component';
import { CoreModule } from '../core/core.module';
import { PlanSettingComponent } from './plan-setting/plan-setting.component';
import {PlanTasksDownLoadComponent} from './plan-tasks/plan-tasks-down-load/plan-tasks-down-load.component';

@NgModule({
  declarations: [
    PlanOverviewComponent, PlanTasksComponent,
    CourseManagementComponent, BaseInfoComponent,
    DetailInfoComponent, CoverPhotoComponent, FileComponent,
    TestPaperComponent,  QuestionComponent, TestPaperCreateComponent,
    SingleChoiceComponent, MultipleChoiceComponent, EssayComponent, IndefiniteChoiceComponent,
    JudgementComponent, CompletionComponent, MaterialComponent,  QuestionCreateComponent, TeachingPlanManagementComponent,
    PaperMarkingComponent, TestResultTableComponent, StudentManagementComponent, StudentManagementTabComponent, FormalStudentTableComponent,
    PlanTasksDownLoadComponent,
    InformalStudentTableComponent, StudentInvolveRecordComponent, StudentExitRecordComponent, TeacherManagementComponent, PlanSettingComponent],
  imports: [
    ShareModule,
    RouterModule,
    QuillModule,
    NgxEchartsModule,
    CoreModule
  ]
})
export class CourseManagementModule { }
