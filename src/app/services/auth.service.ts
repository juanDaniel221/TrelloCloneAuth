import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { ResponseLogin } from '@models/auth.model';
import { User } from '@models/user.model';
import { BehaviorSubject } from 'rxjs';
import { checkToken } from '../interceptor/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.API_URL;
  user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  logIn(email: string, password: string) {
    return this.http
      .post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.access_token);
          this.tokenService.saveRefreshToken(response.access_token);
        })
      );
  }
  refreshToken(refreshToken: string) {
    return this.http
      .post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/refresh-token`, {
        refreshToken,
      })
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.access_token);
          this.tokenService.saveRefreshToken(response.access_token);
        })
      );
  }
  register(name: string, password: string, email: string) {
    console.log('llega aqui', email, name, password);
    return this.http.post(`${this.apiUrl}/api/v1/auth/register`, {
      email,
      name,
      password,
    });
  }

  registerAndLogin(name: string, password: string, email: string) {
    return this.register(name, password, email).pipe(
      switchMap(() => this.logIn(email, password))
    );
  }

  isAvailable(email: string) {
    console.log('el correo es=>', email);
    return this.http.post<{ isAvailable: boolean }>(
      `${this.apiUrl}/api/v1/auth/is-available`,
      {
        email,
      }
    );
  }
  recovery(email: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/recovery`, {
      email,
    });
  }
  getProfile() {
    const token = this.tokenService.getToken();
    return this.http
      .get<User>(`${this.apiUrl}/api/v1/auth/profile`, {
        context: checkToken(),
      })
      .pipe(
        tap((user) => {
          this.user$.next(user);
        })
      );
  }
  changePassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/change-password`, {
      token,
      newPassword,
    });
  }
  logout() {
    this.tokenService.removeToken();
  }
}
