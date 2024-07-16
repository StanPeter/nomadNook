import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ILogin } from '../ts/serviceInterfaces';
import { AccountService } from '../_services/account.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    NgIf,
    FormsModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private router = inject(Router);
  accountService = inject(AccountService);
  isNavbarCollapsed = true;
  model: ILogin = {};

  login() {
    this.accountService.login(this.model).subscribe({
      next: (_) => {
        this.router.navigateByUrl('/members');
      },
      error: (err: any) => console.log(err, 'ERROR'),
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
