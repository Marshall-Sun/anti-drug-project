import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagesUploadingService {

  changeStatus: Subject<number> = new BehaviorSubject<number>(1);


  constructor(private _http: HttpClient) { }
  setGroupBackground(images:string){
    return this._http.put(`/groupGate/`, {
      images:images
    })
  }

  getIcon(imageicon:any,groupId:string,userId){
    return this._http.post(`/material/uploadFile`, {
      imageicon:imageicon,
      fileGroupID:groupId,

    })
  }

  setGroupLogo(groupId:string,imageicon:string){
    return this._http.put(`/groupGate/setGroupLogo`, {
      groupId:groupId,
      logo:imageicon,

    })
  }
}
