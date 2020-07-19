import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(private _http: HttpClient) { }

  getUserVerificationStatus(userId: string): Observable<any> {
    return this._http.get(`/user/getUserApproveStatus?userId=${userId}`)
  }

  setUserApproval(backImg: string, faceImg: string, idCard: string, trueName: string, userId: number): Observable<any> {
    const api = "/user/setUserApproval";
    return this._http.post(api, {
      backImg: backImg,
      faceImg: faceImg,
      idcard: idCard,
      truename: trueName,
      userId: userId
    });
  }
}
