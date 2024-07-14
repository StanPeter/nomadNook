import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  title = 'client';
  users: { userName: string; id: number }[] = [];

  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/users').subscribe({
      next: (data) => {
        this.users = data as { userName: string; id: number }[];
        console.log('User created', data);
      },
      error: (error) => {
        console.error('Error creating user', error);
      },
      complete: () => {
        console.log('User creation completed');
      },
    });
  }
}
