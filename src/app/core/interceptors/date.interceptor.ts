import {HttpHandlerFn, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AppDate} from "../../shared/utils/app-date";
import {AppUtils} from "../../shared/utils/app-utils";

export const dateInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
  // Modify the request body before sending it out
  if (req.body instanceof FormData) {
    return next(req).pipe(
      catchError((error) => {
        console.error('Error in dateInterceptorFn:', error);
        throw error;
      })
    );
  }
  let modifiedReq = req.clone({
      body: req.body
    }
  );
  const requestContentType = req.headers.get('Content-Type');
  if (!requestContentType || requestContentType.includes('application/json')) {
    modifiedReq = req.clone({
      body: convertDatesToISOString(req.body)
    });
  }
  // Handle the response and convert date strings to local time
  return next(modifiedReq).pipe(
    map(event => {
      if (event instanceof HttpResponse) {
        // Check if the response is not of type application/pdf
        const contentType = event.headers.get('Content-Type');
        if (contentType && (contentType.includes('application/pdf') || contentType.includes('application/octet-stream'))) {
          return event; // Skip processing for PDF responses
        }
        return event.clone({body: convertDates(event.body)});
      }
      return event;
    }),
    catchError((error) => {
      // Log the error
      // console.error('Error in dateInterceptorFn:', error);
      // Re-throw the error so that it can be handled downstream
      throw error;
    })
  );
};


// Helper function to recursively convert Date objects to ISO strings in the request body
function convertDatesToISOString(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (obj instanceof Date) {
    // Convert Date to ISO string
    return AppDate.from(obj).toString();
  }

  // Check if the object is a string that can be parsed as a date
  if (typeof obj === 'string' && isDateString(obj)) {
    // console.log("Converting Date String:", obj);
    const parsedDate = new Date(obj);
    return AppDate.from(parsedDate).toString();
  }

  if (Array.isArray(obj)) {
    // If it's an array, recursively apply this to each item
    return obj.map(item => convertDatesToISOString(item));
  }

  if (typeof obj === 'object') {
    // If it's an object, apply this to each key
    const newObj: any = {};
    for (const key of Object.keys(obj)) {
      newObj[key] = convertDatesToISOString(obj[key]);
    }
    return newObj;
  }

  // Return the value as is for non-Date objects
  return obj;
}

function isDateString(str: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
  return dateRegex.test(str);
}

// Function to convert ISO date strings to local time recursively
const convertDates = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === 'string' && AppUtils.isISODate(obj)) {
    return AppDate.from(new Date(obj)).toLocalDate();  // Automatically converts to local time
  } else if (Array.isArray(obj)) {
    return obj.map(item => convertDates(item));
  } else if (typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = convertDates(obj[key]);
      return acc;
    }, {} as any);
  }

  return obj;
};
