import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountService } from './_services/account.service';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NavbarComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  accountService = inject(AccountService);
  title = 'client';

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) this.accountService.currentUser.set(JSON.parse(user));
  }
}
