import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  if (!accountService.currentUser()) {
    toastr.error('You must be logged in to view this page');
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
