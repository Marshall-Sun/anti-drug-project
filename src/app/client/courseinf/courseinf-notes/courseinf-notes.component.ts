import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef, ViewRef, Input } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CourseInfService } from 'src/app/service/courseinf-frontend/courseinf-frontend.service';
@Component({
  selector: 'app-courseinf-notes',
  templateUrl: './courseinf-notes.component.html',
  styleUrls: ['./courseinf-notes.component.less'],
  inputs: ["notes","courseid","teachplanId","total_notes_page"],
})
export class CourseinfNotesComponent implements OnInit {
  courseid = "0";
  teachplanId = "0";
  //笔记
  notes = [];
  noteorder: string = "New";
  select_note: string = "全部课程";
  total_notes_page = 1;//总笔记页码
  current_notespage = 1;//当前笔记页码

  constructor(private modalService: NzModalService, private courseinfservice: CourseInfService, private notification: NzNotificationService) { }

  ngOnInit() {

  }
  
  selectedValue = "";
  changeOrder_Note(order: string): void {
    this.noteorder = order;
    this.current_notespage = 1;
    this.courseinfservice.get_teaching_plan_note(this.teachplanId, "1","0", this.noteorder).subscribe((res: any)  => {
      this.setCoursesNotes(res);
    }, error => {
      this.notification.create(
        'error',
        '错误！',
        `${error}`,
        { nzDuration: 100 }
      )
    });
  }

  onPageChange_note(event?: any) {
    this.courseinfservice.get_teaching_plan_note(this.teachplanId, this.current_notespage.toString(),"0", this.noteorder).subscribe((res: any) => {
      this.setCoursesNotes(res);
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

  setCoursesNotes(res: any) {
    this.notes = res.data;
    //this.total_notes_page = res.data.total;
  }

}
