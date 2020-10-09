import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoginExpiredService } from '../service/login-expired/login-expired.service';
@Injectable()
export class CommonInterceptor implements HttpInterceptor {
    constructor(private router: Router, private notification: NzNotificationService, private loginExpiredService: LoginExpiredService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (window.localStorage.getItem('token') != undefined) {
            const access_token = window.localStorage.getItem('token');
            //每个请求发送前需要在Headers中需加入access_token（JWT协议）
            const authReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + access_token)
            });
            return next.handle(authReq).pipe(
                catchError((err: HttpErrorResponse) => this.handleError(err)
                ));// 返回结果错误处理
        }
        return next.handle(req).pipe(
            catchError(
                (err: HttpErrorResponse) => this.handleError(err)
            ));
    }
    private handleError(
        event: HttpResponse<any> | HttpErrorResponse,
    ): Observable<any> {
        switch (event.status) {
            case 401:
                window.localStorage.clear();
                this.notification.create(
                    'info',
                    '没有登录或者登录过期，请重新登录',
                    ''
                );
                this.loginExpiredService.loginExpired();
                this.router.navigateByUrl('/client');
                this.loginExpiredService.reLogin();
                return of(event);
            case 405:
                this.notification.create(
                    'warning',
                    '对不起，您的用户权限不足',
                    ''
                );
                return of(event);
        }
        return throwError(event);
    }
}
