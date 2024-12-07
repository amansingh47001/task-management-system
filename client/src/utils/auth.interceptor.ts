import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const authService = inject(UserService);
  const router = inject(Router);

  const newReq = req.clone({
    withCredentials: true,
  });
  // return next(newReq);
  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // If a 401 error occurs, call the logout function from the AuthService
        authService.logout().subscribe((res: any) => {
          localStorage.clear();
          router.navigate(['/']);
        });
      }
      return throwError(error);
    })
  );
}
