import { AuthService } from './../components/auth/auth.service';
import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, finalize, Observable, throwError } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private _authService: AuthService, private _router: Router, private _toastrService: ToastrService, private _sharedService: SharedService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._authService.getToken();
    // const loggedUserId:any = this._authService.getLoggedUserId();


    if (token && this._authService.isAuthenticated()) {
      this._sharedService.setLoading(true);
      const cloned = request.clone({
        headers: this.httpHeaders.append("Authorization", "Bearer " + token),
        // params: request.params.set("logged_user_id", loggedUserId)
      });

      return next.handle(cloned).pipe(
        finalize(() => {
          this._sharedService.setLoading(false);
         }),
        catchError((err) => this.handleAuthError(err))
        
      );
    } else {
      return next.handle(request).pipe(
        finalize(() => {
          this._sharedService.setLoading(false); 
        }),
        catchError((err) => this.handleAuthError(err))
      );
    }
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    console.log(err);
    this._toastrService.clear();
    this._sharedService.setLoading(false);
    if (err.error.status == 401) {
      this._router.navigate(['']);
      this._toastrService.warning("Session Expries..!!!");
      localStorage.setItem('isLogin', 'false');
      this._sharedService.setIsLogin(false);
    }
    return throwError(err);
  }
}
