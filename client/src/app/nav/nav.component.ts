import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ILogin } from '../ts/serviceInterfaces';
import { AccountService } from '../_services/account.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'Navigation',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  private accountService = inject(AccountService);
  isLoggedIn = false;
  model: ILogin = {};

  login() {
    this.accountService.login(this.model).subscribe({
      next: (res: any) => {
        console.log(res, ' res');
        if (res.hasOwnProperty('token'))
          localStorage.setItem('accessToken', res.token);
        this.isLoggedIn = true;
      },
      error: (err: any) => console.log(err, 'ERROR'),
    });
  }

  logout() {
    console.log('clicked');
  }
}
