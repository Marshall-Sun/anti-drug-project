import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ShareModule } from "../share/share.module";
import { QuillModule } from "ngx-quill";
import { CoreModule } from "../core/core.module";
import { NgxEchartsModule } from "ngx-echarts";
import { OpenresourceManagementComponent } from './openresource-management.component';
import { OpenresourceBaseInfoComponent } from './base-info/base-info.component';
import { OpenresourceDetailInfoComponent } from './detail-info/detail-info.component';
import { OpenresourceCoverPhotoComponent } from './cover-photo/cover-photo.component';
import { OpenresourceFileComponent } from './file/file.component';
import { OpenresourceStudentManagementComponent } from './student-management/student-management.component';
import { StudentManagementTabComponent } from './student-management/student-management-tab/student-management-tab.component';
import { StudentInvolveRecordComponent } from './student-management/student-involve-record/student-involve-record.component';
import { StudentExitRecordComponent } from './student-management/student-exit-record/student-exit-record.component';
import { InformalStudentTableComponent } from './student-management/informal-student-table/informal-student-table.component';
import { FormalStudentTableComponent } from './student-management/formal-student-table/formal-student-table.component';

@NgModule({
  declarations: [
    OpenresourceManagementComponent,
    OpenresourceBaseInfoComponent,
    OpenresourceDetailInfoComponent,
    OpenresourceCoverPhotoComponent,
    OpenresourceFileComponent,
    OpenresourceStudentManagementComponent,
    StudentManagementTabComponent,
    StudentInvolveRecordComponent,
    StudentExitRecordComponent,
    InformalStudentTableComponent,
    FormalStudentTableComponent
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
