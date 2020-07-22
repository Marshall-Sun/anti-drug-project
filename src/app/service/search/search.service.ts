import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SearchService {

  constructor(private _http: HttpClient) { }

  getSearchResults(keyword: string): Observable<any> {
    return this._http.get(`/system/globalSearch?keyword=${keyword}`);
  }
}

