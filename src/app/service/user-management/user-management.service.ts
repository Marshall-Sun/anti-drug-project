import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private _http: HttpClient) {
  }

  getUserList(targetPage: number, pageSize: number, filterOptions: any): Observable<any> {
    if (filterOptions.searchType == '' && filterOptions.searchParameter == '' && filterOptions.searchTimeType == '' && filterOptions.starTime == '' && filterOptions.role == 0) {
      return this._http.post(`/user/getIndexUser`, {
        pageSize: pageSize,
        pageNum: targetPage,
      });
    } else {
      return this._http.post(`/user/getIndexUser`, {
        pageSize: pageSize,
        pageNum: targetPage,
        searchType: filterOptions.searchType,
        searchParameter: filterOptions.searchParameter,
        searchTimeType: filterOptions.searchTimeType,
        starTime: filterOptions.starTime,
        endTime: filterOptions.endTime,
        role: filterOptions.role
      });
    }

  }

  getUserDetailById(userId: string): Observable<any> {
    return this._http.get(`/user/getUserDetail?userId=${userId}`);
  }

  getPersonalDetailById(userId: string): Observable<any> {
    return this._http.get(`/user/getPersonalDetail?userId=${userId}`);
  }

  updateUserDetail(
    userId: string, trueName: string, gender: string, idcard: string, mobile: string, company: string, job: string, iam: string, signature: string, site: string,
    weibo: string, weixin: string, qq: string, about: string
  ): Observable<any> {
    return this._http.put(`/user/updateUserDetail`, {
      id: userId,
      truename: trueName,
      gender: gender,
      idcard: idcard,
      mobile: mobile,
      company: company,
      job: job,
      iam: iam,
      signature: signature,
      site: site,
      weibo: weibo,
      weixin: weixin,
      qq: qq,
      about: about
    });
  }

  getAllUserRoles(): Observable<any> {
    return this._http.get(`/user/getAllRoles`);
  }

  updateUserRoles(roles: string, userId: string): Observable<any> {
    return this._http.put(`/user/updateUserRole`, {
      newRole: roles,
      userId: userId
    });
  }

  updatePassword(password: string, userId: string): Observable<any> {
    return this._http.put(`/user/updateUserPasswordbyAdmin`, {
      newPassword: password,
      userId: userId
    });
  }

  updateNewPassword(newPassword: string, oldPassword: string, userId: string): Observable<any> {
    return this._http.put(`/user/updateUserPassword`, {
      newPassword: newPassword,
      oldPassword: oldPassword,
      userId: userId
    });
  }

  setSecureQuestion(securityQuestionCode: string, securityAnswer: string, userId: string): Observable<any> {
    return this._http.put(`/user/setUserSecureQuestion`, {
      securityquestioncode: securityQuestionCode,
      securityanswer: securityAnswer,
      userid: userId
    });
  }

  getSecureQuestionStatus(userId: string): Observable<any> {
    return this._http.get(`/user/getSecureQuestionStatus?userId=${userId}`)
  }

  createNewUser(username: string, password: string, roleList: any): Observable<any> {
    return this._http.post(`/login/doRegisterByAdmin`, {
      userName: username,
      password: password,
      roleList: roleList
    });
  }

  updateLockedStatus(userId: string, lockedStatus: number): Observable<any> {
    return this._http.put(`/user/lockedUser`, {
      userId: userId,
      locked: lockedStatus
    });
  }

  uploadFile(file: any): Observable<any> {
    const headerOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    };
    return this._http.post(`/user/uploadAvatar`, {
      file: file
    }, headerOptions);
  }
}
