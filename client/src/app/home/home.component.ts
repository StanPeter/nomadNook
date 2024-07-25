import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { TestErrorsComponent } from '../errors/test-errors/test-errors.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbar,
    MatInputModule,
    CarouselModule,
    RegisterComponent,
    NgIf,
    TestErrorsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  registerMode = false;

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
