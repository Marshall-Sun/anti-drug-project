import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }

  //获取所有标签
  getAllTag(): Observable<any> {
    const uri = `/material/lib/getAllTag`;
    // const params = new HttpParams()
    //   .set('fellowId', toid)
    //   .set('userId', userid)
    return this.http.get(uri, {});//params
  }

  //获取资料
  getMyMaterials(userID: string, pageNum: string, materialType: string, tagID: string, startTime: string, endTime: string,
    searchKeyword: string, convertStatus: string, isUsed: string): Observable<any> {
    const uri = `/material/lib/getMyTeachingMaterial`;
    var data: { [k: string]: any } = {};
    data.userID = userID;
    data.pageNum = pageNum;
    data.pageSize = "12";
    if (materialType != "") data.materialType = materialType;
    if (tagID != "") data.tagID = tagID;
    if (startTime != "") data.startTime = startTime;
    if (endTime != "") data.endTime = endTime;
    if (searchKeyword != "") data.searchKeyword = searchKeyword;
    if (convertStatus != "") data.convertStatus = convertStatus;
    if (isUsed != "") data.isUsed = isUsed;

    const params = new HttpParams({
      fromObject: data
    })
    return this.http.get(uri, { params });
  }

  getOpenTeachingMaterials(userID: string, pageNum: string, materialType: string, tagID: string, startTime: string, endTime: string,
    searchKeyword: string, convertStatus: string, isUsed: string): Observable<any> {
    const uri = `/material/lib/getOpenTeachingMaterial`;
    var data: { [k: string]: any } = {};
    data.userID = userID;
    data.pageNum = pageNum;
    data.pageSize = "12";
    if (materialType != "") data.materialType = materialType;
    if (tagID != "") data.tagID = tagID;
    if (startTime != "") data.startTime = startTime;
    if (endTime != "") data.endTime = endTime;
    if (searchKeyword != "") data.searchKeyword = searchKeyword;
    if (convertStatus != "") data.convertStatus = convertStatus;
    if (isUsed != "") data.isUsed = isUsed;

    const params = new HttpParams({
      fromObject: data
    })
    return this.http.get(uri, { params });
  }

  getCollectedMaterials(userID: string, pageNum: string, materialType: string, tagID: string, startTime: string, endTime: string,
    searchKeyword: string, convertStatus: string, isUsed: string): Observable<any> {
    const uri = `/material/lib/getCollectedTeachingMaterial`;
    var data: { [k: string]: any } = {};
    data.userID = userID;
    data.pageNum = pageNum;
    data.pageSize = "12";
    if (materialType != "") data.materialType = materialType;
    if (tagID != "") data.tagID = tagID;
    if (startTime != "") data.startTime = startTime;
    if (endTime != "") data.endTime = endTime;
    if (searchKeyword != "") data.searchKeyword = searchKeyword;
    if (convertStatus != "") data.convertStatus = convertStatus;
    if (isUsed != "") data.isUsed = isUsed;

    const params = new HttpParams({
      fromObject: data
    })
    return this.http.get(uri, { params });
  }

  getShareTeachingMaterials(userID: string, pageNum: string, materialType: string, tagID: string, startTime: string, endTime: string,
    searchKeyword: string, convertStatus: string, isUsed: string): Observable<any> {
    const uri = `/material/lib/getShareTeachingMaterial`;
    var data: { [k: string]: any } = {};
    data.userID = userID;
    data.pageNum = pageNum;
    data.pageSize = "12";
    if (materialType != "") data.materialType = materialType;
    if (tagID != "") data.tagID = tagID;
    if (startTime != "") data.startTime = startTime;
    if (endTime != "") data.endTime = endTime;
    if (searchKeyword != "") data.searchKeyword = searchKeyword;
    if (convertStatus != "") data.convertStatus = convertStatus;
    if (isUsed != "") data.isUsed = isUsed;

    const params = new HttpParams({
      fromObject: data
    })
    return this.http.get(uri, { params });
  }

  collectMaterial(fileid: any, userid: any) {
    return this.http.post(`/material/lib/collectTeachingMaterial?fileID=${fileid}&userID=${userid}`, {})
    //return this.http.post(`/material/lib/collectTeachingMaterial?fileID =${fileID}&userID =${userID}`,{})
  }

  UncollectMaterial(fileid: any, userid: any) {
    return this.http.delete(`/material/lib/cancelTeachingMaterialCollection?fileID=${fileid}&userID=${userid}`)
  }

  GetMaterial(fileid: any) {
    return this.http.get(`/material/lib/getTeachingMaterialDetail?fileID=${fileid}`, {})
  }

  GetMaterialSharingHistory(pageNum: any, pageSize: any, userID: any) {
    return this.http.get(`/material/lib/getShareHistory?pageNum=${pageNum}&pageSize=${pageSize}&userID=${userID}`, {})
  }


  setTeachingMaterialPublicity(fileid: any, ispublic: any) {
    return this.http.put(`/material/lib/setTeachingMaterialPublicity?fileID=${fileid}&isPublic=${ispublic}`, {})
    //return this.http.post(`/material/lib/collectTeachingMaterial?fileID =${fileID}&userID =${userID}`,{})
  }

  GetMyShareUser(pageNum: any, pageSize: any, userID: any) {
    return this.http.get(`/material/lib/getMyShareUser?pageNum=${pageNum}&pageSize=${pageSize}&userID=${userID}`, {})
  }

  cancelMyShareToUser(sourceUserId: any, targetUserId: any) {
    return this.http.post(`/material/lib/cancelMyShareToUser?sourceUserId=${sourceUserId}&targetUserId=${targetUserId}`, {});
  }

  GetAllTeacher() {
    return this.http.get(`/material/lib/getAllTeacher`, {})
  }

  ShareMaterialWithUser(currentUserID: any, teacherIdList: any) {
    return this.http.post(`/material/lib/shareMaterialWithUser?currentUserID=${currentUserID}&teacherIdList=${teacherIdList}`, {});
  }

  ShareMaterialList(fileIdList: any) {
    return this.http.put(`/material/lib/setTeachingMaterialListPublic?fileIdList=${fileIdList}`, {});
  }

  EditMaterial(description: any, fileID: any, filename: any, isPublic: any, tagList: any) {
    return this.http.post(`/material/lib/editTeachingMaterialDetail`, {
      description:description,
      fileID:fileID,
      filename:filename,
      isPublic:isPublic,
      tagList:tagList
    });
    //?description=${description}&fileID=${fileID}&filename=${filename}&isPublic=${isPublic}&tagList=${tagList}
  }

  UploadTeachingMaterial(file: any, userId: any) {
    return this.http.post(`/material/uploadTeachingMaterial?file=${file}&userId=${userId}`, {});
  }

  DeleteTeachingMaterial(fileId: any) {
    return this.http.delete(`/material/deleteUpload?fileId=${fileId}`);
  }

  DeleteTeachingMaterialList(fileIds: any) {
    return this.http.delete(`/material/deleteUploadList?fileIds=${fileIds}`);
  }

  addTagToMaterialList(fileIdList: any, tagIdList: any) {
    return this.http.post(`/material/lib/addTagToTeachingMaterialList?fileIdList=${fileIdList}&tagIdList=${tagIdList}`, {});
  }

  addTaskMaterial(courseId: any, file: any,userId:any) {
    return this.http.post(`/material/uploadTaskMaterial?courseId=${courseId}&file=${file}&userId=${userId}`, {});
  }

}
