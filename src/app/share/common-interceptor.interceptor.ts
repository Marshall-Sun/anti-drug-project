import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
@Injectable()
export class CommonInterceptor implements HttpInterceptor {
    constructor(private message: NzMessageService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // 获取本地存储的token值，完整token示例
        // {
        //     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTI0MTY3NjIsInVzZXJfbmFtZSI6IjEiLCJhdXRob3JpdGllcyI6WyJST0xFX1NVUEVSX0FETUlOIiwiUk9MRV9VU0VSIiwiUk9MRV9URUFDSEVSIl0sImp0aSI6IjU2MTBhNmM2LTMwZTgtNDE4NS05M2U2LThjYjQ3OTdjYzMxYyIsImNsaWVudF9pZCI6ImFuZ3VsYXIiLCJzY29wZSI6WyJhbGwiXX0.QhGi9_GL96YXbZtnpj7TEpyh6l_6voFLHN30RHIJ5As",
        //     "token_type": "bearer",
        //     "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxIiwic2NvcGUiOlsiYWxsIl0sImF0aSI6IjU2MTBhNmM2LTMwZTgtNDE4NS05M2U2LThjYjQ3OTdjYzMxYyIsImV4cCI6MTU5MjY1NDM2MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9TVVBFUl9BRE1JTiIsIlJPTEVfVVNFUiIsIlJPTEVfVEVBQ0hFUiJdLCJqdGkiOiIyNjlhNWVjNC1kZWUyLTRkOGEtODY0NC1kZjE4NDVhODdmNGYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.waveYd7Es3iI6yuDhKl2xKhuzE3y8zkarduzmE9a6O8",
        //     "expires_in": 21599,
        //     "scope": "all",
        //     "jti": "5610a6c6-30e8-4185-93e6-8cb4797cc31c"
        // }
        //需要加入请求头的是access_token(BASE64编码)
        if (window.localStorage.getItem('token') != undefined) {

            const access_token = window.localStorage.getItem('token');
            //每个请求发送前需要在Headers中需加入access_token（JWT协议）
            const authReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + access_token)
            });
            return next.handle(authReq);// 返回结果错误处理
        }
        return next.handle(req);
    }
}
