import {Injectable, TemplateRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApprovalService {

  changeStatus: Subject<number> = new BehaviorSubject<number>(1);

  constructor(
    private _http: HttpClient
  ) { }

  getApprovingList(targetPage: number, pageSize: number): Observable<any> {
    return this._http.post(`/user/getUserApproval`, {
      pageNum: targetPage,
      pageSize: pageSize,
      approvalStatus: 2
    })
  }

  getApprovedList(targetPage: number, pageSize: number):Observable<any> {
    return this._http.post(`/user/getUserApproval`, {
      pageNum: targetPage,
      pageSize: pageSize,
      approvalStatus: 3
    })
  }

  filterApprovingList(targetPage: number, pageSize: number, filterOptions: any): Observable<any> {
    return this._http.post(`/user/getUserApproval`, {
      pageNum: targetPage,
      pageSize: pageSize,
      searchTimeType: filterOptions.searchTimeType,
      starTime: filterOptions.starTime,
      endTime: filterOptions.endTime,
      searchType: filterOptions.searchType,
      searchParameter: filterOptions.searchParameter,
      approvalStatus: 2
    })
  }

  filterApprovedList(targetPage: number, pageSize: number, filterOptions: any): Observable<any> {
    return this._http.post(`/user/getUserApproval`, {
      pageNum: targetPage,
      pageSize: pageSize,
      searchTimeType: filterOptions.searchTimeType,
      starTime: filterOptions.starTime,
      endTime: filterOptions.endTime,
      searchType: filterOptions.searchType,
      searchParameter: filterOptions.searchParameter,
      approvalStatus: 3
    })
  }

  updateUserApproval(approvalStatus: string, reason: string, userId: string): Observable<any> {
    return this._http.put(`/user/updateUserApproval`, {
      approvalStatus: approvalStatus,
      reason: reason,
      userId: userId
    })
  }

}
