import { Injectable,  } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private _userData = new Subject<boolean>();
  userData$ = this._userData.asObservable();
  
  private __isLoading = new Subject<boolean>();
  isLoading$ = this.__isLoading.asObservable();
  //login and sign in 
  private _isLogin = new Subject<boolean>();
  isLogin$ = this._isLogin.asObservable();
  constructor() { }
//send user data
  sendUserData(message: boolean) {
    this._userData.next(message);
  }

  setIsLogin(isLogin: boolean) {
    this._isLogin.next(isLogin)
  }
  setLoading(isLoading: any) {
    this.__isLoading.next(isLoading);
  } 
 
 
}
