import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  isLoggedIn?: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.authService.isSessionValid();
    if (isLoggedIn && this.authService.sessionValidationResult) {
      await this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
