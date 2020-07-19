import { Component, OnInit } from '@angular/core';
import { CourseInfService } from 'src/app/service/courseinf-frontend/courseinf-frontend.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-courseinf-material',
  templateUrl: './courseinf-material.component.html',
  styleUrls: ['./courseinf-material.component.less'],
  inputs:["materials","courseid","teachplanId"]
})
export class CourseinfMaterialComponent implements OnInit {
  courseid = "0";
  materials = [];
  teachplanId = "0";
  

  total_material_pages = 1;//总资料页
  current_material_page = 1;//当前资料页

  constructor(private courseinfservice: CourseInfService,private notification: NzNotificationService,
    private message: NzMessageService,) { }

  ngOnInit() {

  }

  setCoursesMaterials(res: any) {
    this.materials = res;
   // this.total_material_pages = res.data.total||0;
  }

  
  onPageChange_material(event?: any) {
    this.courseinfservice.get_teaching_plan_material(this.teachplanId).subscribe((res: any) => {
      this.setCoursesMaterials(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });
    window.scrollTo(0, 0);
  }

  // downloadMaterial(materialitem:any){
  //   this.message.info('开始下载', { nzDuration: 1000 });
  //   window.open('http://172.16.10.94:9013/'+materialitem.CourseMaterialV8s[0].fileuri);
  // }
  //后端没给正确的link，先不管

}
