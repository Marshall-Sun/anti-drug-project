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

@NgModule({
  declarations: [
    OpenresourceManagementComponent,
    OpenresourceBaseInfoComponent,
    OpenresourceDetailInfoComponent,
    OpenresourceCoverPhotoComponent,
    OpenresourceFileComponent
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
