import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ILogin } from '../ts/serviceInterfaces';
import { AccountService } from '../_services/account.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, NgIf, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private accountService = inject(AccountService);
  isLoggedIn = false;
  isNavbarCollapsed = true;
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

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
