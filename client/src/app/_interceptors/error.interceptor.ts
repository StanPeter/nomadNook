import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error) => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error) {
              const modalStateErrors = [];
              for (const key in error.error.errors) {
                if (error?.error?.errors?.[key]?.[0])
                  modalStateErrors.push(error.error.errors[key][0]);
              }
              toastr.error(modalStateErrors.join('\n'));
            } else {
              toastr.error(error.errors);
            }
            break;
          case 401:
            toastr.error('Unauthorized');
            break;
          case 404:
            toastr.error('Not found');
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras: NavigationExtras = {
              state: { error: error.error },
            };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            toastr.error(error.error.message);
            break;
        }
      }

      return throwError(() => error);
    })
  );
};
