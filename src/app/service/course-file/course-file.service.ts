import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseFileService {

  constructor(private _http: HttpClient) { }


  getCourseFileList(courseId: any, pageNum: number = 1, pageSize: number = 10): Observable<any> {
    const api = '/course/getCourseFileList';
    const httpParams = new HttpParams()
      .set('courseId', courseId)
      .set('pageNum', `${pageNum}`)
      .set('pageSize', `${pageSize}`)
    return this._http.get(api, {
      params: httpParams
    })
  }

  deleteUpload(fileId: number) {
    const api = `/material/deleteUpload?fileId=${fileId}`;
    return this._http.delete(api);
  }

  deleteUploadList(fileIds: Array<number>): Observable<any> {
    const api = `/material/deleteUploadList?fileIds=${fileIds}`;
    return this._http.delete(api);
  }
}
