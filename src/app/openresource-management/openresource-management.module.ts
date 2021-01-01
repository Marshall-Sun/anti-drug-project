import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ShareModule } from "../share/share.module";
import { QuillModule } from "ngx-quill";
import { CoreModule } from "../core/core.module";
import { NgxEchartsModule } from "ngx-echarts";
import { OpenresourceManagementComponent } from './openresource-management.component';
import { OpenresourceBaseInfoComponent } from './base-info/base-info.component';
import { OpenresourceCoverPhotoComponent } from './cover-photo/cover-photo.component';
import { InformalStudentTableComponent } from './student-management/informal-student-table/informal-student-table.component';
import { OpenresourceFileComponent } from './file/file.component';
import { OpenresourceStudentManagementComponent } from './student-management/student-management.component';
import { FormalStudentTableComponent } from './student-management/formal-student-table/formal-student-table.component';
import { OpenresourceTeacherManagementComponent } from './teacher-management/teacher-management.component';
import { OpenresourceCourseSettingComponent } from './course-setting/course-setting.component';
import { OpenresourcePlanTasksComponent } from './plan-tasks/plan-tasks.component';

@NgModule({
  declarations: [
    OpenresourceManagementComponent,
    OpenresourceBaseInfoComponent,
    OpenresourceCoverPhotoComponent,
    OpenresourceFileComponent,
    OpenresourceStudentManagementComponent,
    InformalStudentTableComponent,
    FormalStudentTableComponent,
    OpenresourceTeacherManagementComponent,
    OpenresourceCourseSettingComponent,
    OpenresourcePlanTasksComponent
  ],
  imports: [
    ShareModule,
    RouterModule,
    QuillModule,
    NgxEchartsModule,
    CoreModule,
  ],
})
export class OpenresourceManagementModule {}
