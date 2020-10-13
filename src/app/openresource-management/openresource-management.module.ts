import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ShareModule } from "../share/share.module";
import { QuillModule } from "ngx-quill";
import { CoreModule } from "../core/core.module";
import { NgxEchartsModule } from "ngx-echarts";
import { OpenresourceManagementComponent } from './openresource-management.component';

@NgModule({
  declarations: [
    OpenresourceManagementComponent
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
