import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {PermissionService} from '../services/permission.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn?: boolean;

  constructor(private permissionService: PermissionService, private authService: AuthService, private router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const isLoggedIn = await this.authService.isSessionValid();
    if (isLoggedIn) {
      const requiredPermissions = route.data['permissions'] as string[];
      if (!requiredPermissions || requiredPermissions.every(permission => 
        this.permissionService.permissions.includes(permission) || this.permissionService.permissions.includes('super_user')
      )) {
        return true;
      } else {
        await this.router.navigate(['/']);
        return false;
      }
    }
    await this.router.navigate(['/login']);
    return false;
  }

}
