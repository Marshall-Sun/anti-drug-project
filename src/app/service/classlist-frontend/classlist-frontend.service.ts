import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  constructor(private http:HttpClient){}
  getClasses(page:number,orderkey:string,tag:string){
    const params = new HttpParams()
    // .set('classroomName','')
      .set('classroomType',tag)
      //.set('isClosed',"0") 不知为啥一查就报错500
      .set('pageNum',page.toString())
      .set('pageSize','12')
      .set('showAble','1')
      .set('sortType',"hot")//orderkey)
    const uri = `/classroom/explore`;
    return this.http.get(uri);
    
    
    //.pipe(map(data => data.classes));
  }
}
