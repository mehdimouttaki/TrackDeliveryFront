import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: LocalStorageService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const token = this.authService.get('auth-key');
    console.log("Guard Auth Key::", token);

    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
