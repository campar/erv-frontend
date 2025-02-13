import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PermissionService } from '../services/permission.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  isLoggedIn?: boolean;

  constructor(
    private permissionService: PermissionService,
    private router: Router,
    private authService: AuthService,
  ) { }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    this.authService.authEvent$.subscribe(data => {
      this.isLoggedIn = data;
    });
    await this.permissionService.waitForPermissions();
    const requiredPermissions = route.data['permissions'] as string[];
    if (requiredPermissions.every(permission => this.permissionService.permissions.includes(permission) || this.permissionService.permissions.includes('super_user'))) {
      return true;
    }
    await this.router.navigate(['/']);
    return false;
  }
}
