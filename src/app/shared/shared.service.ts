import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private _userData = new Subject<boolean>();
  userData$ = this._userData.asObservable();
  
  private __isLoading = new Subject<boolean>();

//send user data
  sendUserData(message: boolean) {
    this._userData.next(message);
  }

}
