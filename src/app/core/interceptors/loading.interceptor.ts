import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {LoadingService} from "../services/loading.service";
import {finalize, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.show(); // Show spinner when request starts

  return next(req).pipe(
    catchError(error => {
      // Handle the error and hide the spinner
      loadingService.hide();
      return throwError(() => error); // Re-throw the error after handling it
    }),
    finalize(() => loadingService.hide()) // Hide the spinner when request completes (success or error)
  );
};
