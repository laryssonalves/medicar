import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { constants } from '../constants';
import { User } from '../models/user';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  registerUrl: string = '/usuarios/';
  tokenUrl: string = '/api-token-auth/';
  tokenUpdated = new EventEmitter();

  constructor(private http: HttpClient) {}

  login(username: string, password: string, remember: boolean): void {
    this.http
      .post<{ token: string }>(`${constants.apiUrl}${this.tokenUrl}`, {
        username,
        password,
      })
      .subscribe(
        (response) => {
          sessionStorage.setItem('token', response.token);
          if (remember) {
            this.rememberMe(username, password);
          } else {
            this.forgetMe();
          }
          this.tokenUpdated.emit();
        },
        () => {
          window.alert('Credenciais inválidas.');
        }
      );
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  private rememberMe(username: string, password: string): void {
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
  }

  private forgetMe(): void {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
  }

  register(user: User) {
    return this.http.post<User>(`${constants.apiUrl}${this.registerUrl}`, user);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
