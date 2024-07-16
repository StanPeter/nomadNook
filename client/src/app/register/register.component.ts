import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IRegister } from '../ts/serviceInterfaces';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  accountService = inject(AccountService);
  cancelRegisterMode = output<boolean>();
  model: IRegister = {};

  register() {
    this.accountService.register(this.model).subscribe({
      error: (error) => {
        console.log(error);
      },
    });
  }

  cancel() {
    this.cancelRegisterMode.emit(false);
  }
}
