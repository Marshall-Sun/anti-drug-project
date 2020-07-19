import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsitesAnnouncementService {

  constructor(private _http: HttpClient) {
  }

  getAnnouncementList(targetPage: number, pageSize: number): Observable<any> {
    return this._http.get(`/system/getAllAnnouncement?pageNum=${targetPage}&pageSize=${pageSize}`)
  }

  createAnnouncement(content: string, endTime: number, startTime: number, userId: string): Observable<any> {
    return this._http.post(`/system/createAnnouncement?content=${content}&endTime=${endTime}&startTime=${startTime}&userId=${userId}`, {})
  }

  deleteAnnouncement(id: string): Observable<any> {
    return this._http.delete(`/system/deleteAnnouncementById?id=${id}`)
  }

  getActiveAnnoucement(): Observable<any> {
    return this._http.get(`/system/getActiveAnnouncement`)
  }

  editAnnoucement(content: string, endTime: number, id: string, startTime: number): Observable<any> {
    return this._http.put(`/system/updateAnnouncementById?content=${content}&endTime=${endTime}&id=${id}&startTime=${startTime}`, {})

  }
}
