import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupTopicManagementTableService {

  constructor(private _http: HttpClient) { }
  getTopicTableList(targetPage: number, pageSize: number): Observable<any> {
    return this._http.post(`/group/getIndexGroup`, {
      pageSize: pageSize,
      pageNum: targetPage,
    })
  }
  filterTopicTableList(targetPage: number, pageSize: number, filterOptions: any): Observable<any> {
    return this._http.post(`/group/getIndexGroup`, {
      pageSize: pageSize,
      pageNum: targetPage,
      state: filterOptions.state,
      searchParameter: filterOptions.searchParameter,
    })
}
}
