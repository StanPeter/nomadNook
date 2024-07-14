import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ILogin } from '../ts/serviceInterfaces';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'http://localhost:5000/api';

  login(loginModel: ILogin) {
    return this.http.post(`${this.baseUrl}/account/login`, loginModel);
  }
}
