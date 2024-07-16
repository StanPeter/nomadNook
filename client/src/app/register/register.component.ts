import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IRegister } from '../ts/serviceInterfaces';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private toastr = inject(ToastrService);
  accountService = inject(AccountService);
  cancelRegisterMode = output<boolean>();
  model: IRegister = {};

  register() {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.toastr.success('You are now registered');
      },
      error: (error) => {
        this.toastr.error('There was an error registering');
      },
    });
  }

  cancel() {
    this.cancelRegisterMode.emit(false);
  }
}
