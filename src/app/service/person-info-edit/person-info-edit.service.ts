import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonInfoEditService {

  changeStatus: Subject<number> = new BehaviorSubject<number>(1);

  constructor(private _http: HttpClient) { }

  updateUserDetail(user: any): Observable<any> {
    const api = "/user/updateUserDetail";
    return this._http.put(api, user);
  }

  getPersonDetail(userId: number): Observable<any> {
    const api = "/user/getPersonalDetail";
    const httpParams = new HttpParams()
      .set("userId", `${userId}`)
    return this._http.get(api, {
      params: httpParams
    })
  }
}
