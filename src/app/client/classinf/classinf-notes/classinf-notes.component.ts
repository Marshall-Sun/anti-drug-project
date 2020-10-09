import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef, ViewRef, Input } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClassInfService } from 'src/app/service/classinf-frontend/classinf-frontend.service';
import { isThisISOWeek } from 'date-fns';
@Component({
  selector: 'app-classinf-notes',
  templateUrl: './classinf-notes.component.html',
  styleUrls: ['./classinf-notes.component.less'],
  inputs:["classid"],
})
export class ClassinfNotesComponent implements OnInit {
  classid = "0";
  //笔记
  notes = [
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: '2019.1.1',
      appreciate: 10,
      course: "毒品的危害",
      largeAvatar:"",
    },
  ];
  courses;
  total_notes_page = 50;//总笔记页码
  current_notespage = 1;//当前笔记页码

  noteorder: string = "createdTime";
  select_note: string = "";
  courseSetTitle:string="全部课程";

  editorTitle = "";
  editorContent = "";

  @ViewChild("notescontainer", { read: ViewContainerRef, static: true }) notescontainer: ViewContainerRef;
  @ViewChild("noteslisttemplate", { read: TemplateRef, static: true }) topiclisttemplate: TemplateRef<any>;
  @ViewChild("notesquestion", { read: TemplateRef, static: true }) notesquestion: TemplateRef<any>;


  constructor(private modalService: NzModalService, private classinfservice: ClassInfService,private notification: NzNotificationService) { }

  ngOnInit() {

    this.classinfservice.getclassNotes(this.classid,6).subscribe((res: any) => {
      this.setclassNotes(res);
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    })

    this.classinfservice.getclassCourses(this.classid,0,6).subscribe((res: any) => {
      this.setclassCourses(res);
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    })
  }

  setclassNotes(res: any) {
    this.notes = res.data.classroomNoteList;
    this.total_notes_page = res.data.total;

    for (var i = 0; i < this.notes.length; i++) {
      if (this.notes[i].largeAvatar == "") {
        this.notes[i].largeAvatar = "../../../../assets/img/timg2.jpg";
      } else if (this.notes[i].largeAvatar.substr(0, 6) == "public") {
        this.notes[i].largeAvatar = "../../../../assets/img/timg2.jpg";
      } else if (this.notes[i].largeAvatar.substr(7, 7) == "edusoho") {
        this.notes[i].largeAvatar = "../../../../assets/img/timg2.jpg";
      }
    }
  }

  setclassCourses(res: any) {
    this.courses = res.data.list;
  }


  from_init() {
    this.editorTitle = "";
    this.editorContent = "";
  }

  changeOrder_Note(order: string): void {
    this.noteorder = order;
    this.classinfservice.getclassNotes(this.classid,6, this.select_note, this.noteorder).subscribe((res: any) => {
      this.setclassNotes(res);
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    })
  }

  changeselect_Note(select: string,courseSetTitle:string): void {
    this.select_note = select;
    this.courseSetTitle = courseSetTitle;
    this.classinfservice.getclassNotes(this.classid,6, this.select_note, this.noteorder).subscribe((res: any) => {
      this.setclassNotes(res);
    }, error => {
      this.notification.create(
        'error',
        '发生错误！',
        `${error.error}`)
    })
  }

  //笔记点赞 ------未完成
  // notelike(){
  //   this.classinfservice.note_like('','').subscribe((res: any) => {
  //     this.notification.create(
  //       'success',
  //       '提交成功！',
  //       `提交成功`)
  //   }, error => {
  //     this.notification.create(
  //       'error',
  //       '发生错误！',
  //       `${error.error}`)
  //   })
  // }


}
