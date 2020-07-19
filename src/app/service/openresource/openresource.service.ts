import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenresourceService {

  constructor( private _http: HttpClient) { }

  getOpenCourseList(): Observable<any> {
    return this._http.get(`/course/open/list`);
  }
}
