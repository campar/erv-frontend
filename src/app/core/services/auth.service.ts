import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, map, catchError, firstValueFrom } from "rxjs";
import { environment } from "../../../environments/environment";
import { User } from "../../features/entities/user/user";
import { PermissionService } from "./permission.service";
import { ToastService } from "./toast.service";
import { TranslationService } from "./translation.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + 'auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  authEvent$ = this.isAuthenticatedSubject.asObservable();
  sessionValidationResult: boolean | null = null;
  private sessionValidationPromise: Promise<boolean> | null = null; // Cache promise to prevent multiple calls
  private sessionValidationInProgress = false; // Flag to track ongoing validation
  private toastService = inject(ToastService);
  private translationService = inject(TranslationService);
  private username!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private permissionService: PermissionService
  ) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { "username": username, "password": password }, { withCredentials: true })
      .pipe(
        map((response: any) => {
          this.isAuthenticatedSubject.next(true);
          this.username = response.data.username;
          this.permissionService.setPermissions(response.data.permissions || []);
          this.sessionValidationResult = true;
          this.sessionValidationPromise = Promise.resolve(true);
          return response;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  changePassword(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, user, { withCredentials: true })
      .pipe(
        map((response: any) => {
          this.username = response.data.username;
          this.permissionService.setPermissions(response.data.permissions || []);
          this.isAuthenticatedSubject.next(true);
          this.sessionValidationResult = true;
          this.sessionValidationPromise = Promise.resolve(true);
          return response;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  logout(showLogoutMessage: boolean): void {
    localStorage.clear();
    this.isAuthenticatedSubject.next(false);
    this.permissionService.clearPermissions();
    this.sessionValidationResult = false;
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
    .pipe(
      map((response: any) => {
        if(showLogoutMessage) this.toastService.showInfo(response.data || this.translationService.translate('logged_out_successfully'));
        this.router.navigate(['/login']);
        }),
        catchError((error) => {
          this.router.navigate(['/login']);
          throw error;
        })
      ).subscribe();
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh-token`, {}, { withCredentials: true })
      .pipe(
        map((response: any) => {
          this.username = response.data.username;
          this.permissionService.setPermissions(response.data.permissions || []);
          this.isAuthenticatedSubject.next(true);
          return response;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

   async isSessionValid(): Promise<boolean> {
    if (this.sessionValidationResult !== null) {
      return this.sessionValidationResult; // Return cached result if already validated
    }

    // If the session validation is already in progress, return the ongoing promise
    if (this.sessionValidationInProgress) {
      return this.sessionValidationPromise!;
    }

    // Start a new session validation request
    this.sessionValidationInProgress = true;
    this.sessionValidationPromise = new Promise<boolean>(async (resolve, reject) => {
      try {
        const response = await firstValueFrom(this.http.get<any>(`${this.apiUrl}/validate-session`, { withCredentials: true }));
        const isValid = response.code === '200';
        this.isAuthenticatedSubject.next(isValid);
        this.username = response.data.username;
        this.permissionService.setPermissions(response.data.permissions || []);
        this.sessionValidationResult = isValid;
        resolve(isValid);
      } catch (error) {
        this.isAuthenticatedSubject.next(false);
        this.permissionService.clearPermissions();
        this.sessionValidationResult = false;
        reject(false);
      } finally {
        this.sessionValidationInProgress = false; // Reset the flag once validation is complete
      }
    });

    return this.sessionValidationPromise;
  }

  getUsername() {
    return this.username;
  }
}
