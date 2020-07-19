import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class LoginRegisterService {
  constructor(private http: HttpClient) {}

  courseUserID:BehaviorSubject<any[]> = new BehaviorSubject([]);

  postLogin(username: string, password: string) {
    return this.http.post(
      `/login/doLogin?username=${username}&password=${password}`,
      {}
    );
  }

  testAdmin() {
    return this.http.get("/login/admin", {});
  }

  getToken(username: string, password: string) {
    return this.http.post(
      `/oauth/token?` +
        `client_id=angular&` +
        `client_secret=NEU&` +
        `grant_type=password&` +
        `username=${username}&` +
        `password=${password}`,
      {}
    );
  }

  checkToken(token: string) {
    return this.http.post(`oauth/check_token?token=${token}`, {});
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
        `userName=${username}`,
      {}
    );
  }
}
