import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  
  constructor(private http: HttpClient) { }

  postLogin(username: string, password: string) {
    var res = this.http.post(`/login/doLogin?username=${username}&password=${password}`, {});
    res.subscribe((res: any) => {
      window.localStorage.setItem('id',res.id);
    })
    return res;
  }
  testAdmin(){
    return this.http.get('/login/admin',{});
  }
  getToken(username: string, password: string){
    return this.http.post(`/oauth/token?client_id=angular&client_secret=NEU&grant_type=password&username=${username}&password=${password}`,{});
  }
  checkUsername(username: string) {
    return this.http.get(`/login/checkNickname?userName=${username}`, {});
  }

  postRegister(
    username: string,
    email: string,
    phoneNumber: number,
    password: string
  ) {
    return this.http.post(
      `/login/doRegister?` +
      `email=${email}&` +
      `password=${password}&` +
      `phoneNumber=${phoneNumber}&` +
      `userName=${username}`
      , {});
  }
}
