import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

export const ROLES = [
  { id: 1, nombre: 'admin' },
  { id: 2, nombre: 'usuario' }
];

function tokenGuardadoVigente(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (Date.now() >= payload.exp * 1000) {
      localStorage.removeItem('token');
      return null;
    }
    return token;
  } catch {
    localStorage.removeItem('token');
    return null;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  readonly token = signal<string | null>(tokenGuardadoVigente());
  readonly autenticado = computed(() => !!this.token());

  private readonly payload = computed(() => {
    const t = this.token();
    if (!t) return null;
    try {
      return JSON.parse(atob(t.split('.')[1]));
    } catch {
      return null;
    }
  });

  readonly rolId = computed<number | null>(() => this.payload()?.rol_id ?? null);
  readonly rolNombre = computed(() => ROLES.find(r => r.id === this.rolId())?.nombre ?? '');
  readonly esAdmin = computed(() => this.rolNombre() === 'admin');

  //señal para que el main.html pueda leer el usuario actual
  readonly usuarioActual = computed(() => this.payload());

  login(credentials: { login: string; password: string }) {
    return this.http.post<{ message: string; token: string }>('/api/auth/login', credentials).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.token.set(response.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
  }
}