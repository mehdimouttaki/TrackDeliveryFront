import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  message: string = '';

  private http = inject(HttpClient);
  private router = inject(Router);

  login(event: Event): void {
    event.preventDefault();
    this.message = '⏳ Sending request...';

    this.http.post<any>('http://localhost:8080/apis/authenticate', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.message = '✅ Login successful';
        setTimeout(() => this.router.navigateByUrl('/dashboard'), 1000);
      },
      error: (err) => {
        this.message = err.error?.message || '❌ Invalid username or password';
      }
    });
  }
}
