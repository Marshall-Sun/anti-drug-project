import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ShareModule } from "../share/share.module";
import { QuillModule } from "ngx-quill";
import { CoreModule } from "../core/core.module";
import { NgxEchartsModule } from "ngx-echarts";
import { OpenresourceManagementComponent } from './openresource-management.component';
import { OpenresourceBaseInfoComponent } from './base-info/base-info.component';

@NgModule({
  declarations: [
    OpenresourceManagementComponent,
    OpenresourceBaseInfoComponent
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
