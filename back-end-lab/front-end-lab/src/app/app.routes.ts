import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Main } from './features/main/main/main';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'main', component: Main, canActivate: [authGuard] }
];