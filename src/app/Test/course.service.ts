import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Course } from './course.module';
import {HttpClient,HttpParams} from '@angular/common/http';

@Injectable()
export class CourseService {
    constructor(private http:HttpClient){}
    getCourse(id:string):Observable<Course>{
        const uri = `http://localhost:4200/course/${id}`;
        return this.http.get<Course>(uri); 
    }

    getCourses(page:number,orderkey:string,select:string):any{
        const params = new HttpParams()
        .set('orderBy',orderkey)
        .set('Select',select);
        const uri = `http://localhost:4200/course/${page}`;
        return this.http.get<courselist>(uri,{params}).pipe(map(data => data.courses));
    }

    getCoursesNum():number{
        return 21;
    }
}


class courselist{
    page:string;
    courses:Course[];
}

