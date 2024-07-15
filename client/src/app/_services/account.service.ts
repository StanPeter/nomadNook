import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ILogin } from '../ts/serviceInterfaces';
import { User } from '../_models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'http://localhost:5000/api';
  currentUser = signal<User | null>(null);

  login(loginModel: ILogin) {
    return this.http
      .post<User>(`${this.baseUrl}/account/login`, loginModel)
      .pipe(
        map((userData) => {
          if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
            this.currentUser.set(userData);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
