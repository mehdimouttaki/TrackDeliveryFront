import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private router: Router, private storage: LocalStorageService) {}

  logout(): void {
    this.storage.remove('auth-key');
    this.router.navigate(['/login']);
  }
}
