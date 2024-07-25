import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ILogin, IRegister } from '../ts/serviceInterfaces';
import { User } from '../_models/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = environment.baseUrl;
  currentUser = signal<User | null>(null);

  login(loginModel: ILogin) {
    return this.http
      .post<User>(this.baseUrl + 'account/login', loginModel)
      .pipe(
        map((userData) => {
          if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
            this.currentUser.set(userData);
          }
        })
      );
  }

  register(signUpModel: IRegister) {
    return this.http
      .post<User>(`${this.baseUrl}account/register`, signUpModel)
      .pipe(
        map((userData) => {
          if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
            this.currentUser.set(userData);
          }
          return userData;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
