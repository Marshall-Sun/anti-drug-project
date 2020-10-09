import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaperResultDetailService {

  constructor(private _http: HttpClient) { }

  getTestPaperDetail(testPaperId: string  , userId: string): Observable<any> {
      return this._http.get(`/user/getTestPaperDetail?testPaperId=${testPaperId}&userId=${userId}`);
  };

  collectQuestion(question: any): Observable<any> {
    return this._http.post(`/user/collectionQuestion`, {
      questionid: question.questionid,
      targetid: question.targetid,
      targettype: question.targettype,
      userid: question.userid
    })
  }

  cancelCollection(questionId: string): Observable<any> {
    return this._http.delete(`/user/cancelCollection?questionId=${questionId}`)
  }

  getFavoriteCollection(userId: string): Observable<any> {
    return this._http.get(`/user/getFavoriteQuestion?userId=${userId}`)
  }
}
