import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginExpiredService {
  loginExpired: Function;
  reLogin: Function;
  constructor() { }
}
