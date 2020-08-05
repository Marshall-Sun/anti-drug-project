import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestuserService {

  user={
    name:"Testuser",
    id:"Test_01",
    joinclass:[],
    joincourse:[]
  }
  constructor() { }

  joinClass(classid:string){
    this.user.joinclass.push(classid);
  }

  joinCourse(courseid:string){
    this.user.joincourse.push(courseid);
  }

  exitClass(classid:string){
    for(var i=0;i<this.user.joinclass.length;i++){
      if(this.user.joinclass[i]==classid){
        this.user.joinclass.splice(i,1);
        break;
      }
    }
  }

  exitCourse(courseid:string){
    for(var i=0;i<this.user.joincourse.length;i++){
      if(this.user.joincourse[i]==courseid){
        this.user.joincourse.splice(i,1);
        break;
      }
    }
  }

  isInClass(classid:string){
    for(var i=0;i<this.user.joinclass.length;i++){
      if(this.user.joinclass[i]==classid){
        return true;
      }
    }
    return false;
  }

  isInCourse(courseid:string){
    for(var i=0;i<this.user.joincourse.length;i++){
      if(this.user.joincourse[i]==courseid){
        return true;
      }
    }
    return false;
  }
}
