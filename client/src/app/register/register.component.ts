import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  model: any = {};

  register() {
    console.log(this.model, ' clicked');
  }

  cancel() {
    console.log('cancelled');
  }
}
