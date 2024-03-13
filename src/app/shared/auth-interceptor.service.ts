import { AuthService } from './../components/auth/auth.service';
import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, finalize, Observable, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private _authService:AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._authService.getToken();
    // const loggedUserId:any = this._authService.getLoggedUserId();
console.log("AuthInterceptor");

    if (token && this._authService.isAuthenticated()) {
      const cloned = request.clone({
        headers: this.httpHeaders.append("Authorization", "Bearer " + token),
        // params: request.params.set("logged_user_id", loggedUserId)
      });

      return next.handle(cloned).pipe(
        finalize(() => {}),
        catchError((err) => this.handleAuthError(err))
      );
    } else {
      return next.handle(request).pipe(
        finalize(() => {}),
        catchError((err) => this.handleAuthError(err))
      );
    }
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    console.log(err);
    return throwError(err);
  }
}
