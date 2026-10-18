import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginData = { login: '', password: '' };
  errorMsg = signal<string | null>(null);

  onSubmit() {
    this.errorMsg.set(null);
    this.authService.login(this.loginData).subscribe({
      next: () => {
        this.router.navigate(['/main']);
      },
      error: (err) => {
        this.errorMsg.set(err.error?.message || 'Error al iniciar sesión');
      }
    });
  }
}