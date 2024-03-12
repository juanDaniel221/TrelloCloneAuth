import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(token: string) {
    //localStorage.setItem('token', token);
    setCookie('token-trello', token, { expires: 365, path: '/' });
  }
  getToken() {
    //return localStorage.getItem('token');
    return getCookie('token-trello');
  }
  removeToken() {
    //localStorage.removeItem('token');
    removeCookie('token-trello');
  }
  isValidToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
  isValidRefreshToken() {
    const token = this.getRefreshToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  saveRefreshToken(token: string) {
    //localStorage.setItem('token', token);
    setCookie('refresh-token-trello', token, { expires: 365, path: '/' });
  }
  getRefreshToken() {
    //return localStorage.getItem('token');
    return getCookie('refresh-token-trello');
  }
  removeRefreshToken() {
    //localStorage.removeItem('token');
    removeCookie('refresh-token-trello');
  }
}
