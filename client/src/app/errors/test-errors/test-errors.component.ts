import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css',
})
export class TestErrorsComponent {
  baseUrl = 'http://localhost:5000/api';
  private http = inject(HttpClient);

  get500error() {
    this.http.get(this.baseUrl + '/buggy/server-error').subscribe({
      next: (res) => console.log(res),
      error: (error) => {},
    });
  }
}
