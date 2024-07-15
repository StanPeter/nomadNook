import { Component, OnInit, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbar, MatInputModule, CarouselModule, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  users: { userName: string; id: number }[] = [];
  registerMode = false;

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  getUsers() {
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
