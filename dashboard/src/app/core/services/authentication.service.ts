import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private readonly _router: Router, private readonly _http: HttpClient) { }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  logout(): void {
    this.stopRefreshTokenTimer();
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  login(inputData: any) {
    return this._http.post(`${environment.apiURL}/login`, inputData)
  }

  refreshToken(refreshToken: any) {
    return this._http.post(`${environment.apiURL}/refresh_token`, {refresh_token: refreshToken}).pipe(map((res: any) => {
      localStorage.setItem('token', res.access_token)
      localStorage.setItem('refresh_token', res.refresh_token)
      this.startRefreshTokenTimer();
    }));
  }

  // login(inputData: any): any {
  //   try {
  //     let payload = `client_id=${environment.keycloakClient}&client_secret=${environment.keycloakSecret}&grant_type=password&username=${inputData.username}&password=${inputData.password}`
  //     let headers = {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     };
  //     const URL = `${environment.keycloakUrl}/realms/${environment.keycloakRealm}/protocol/openid-connect/token`;
  //     return this._http.post(URL, payload, { headers: headers });

  //   } catch (error) {
  //     console.log('keyClock.impl.service', error.message);
  //   }
  // }

  // refreshToken() {
  //   let refreshToken = localStorage.getItem('refresh_token')
  //   let payload = `client_id=${environment.keycloakClient}&client_secret=${environment.keycloakSecret}&grant_type=refresh_token&refresh_token=${refreshToken}`
  //   let headers = {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   };
  //   const URL = `${environment.keycloakUrl}/realms/${environment.keycloakRealm}/protocol/openid-connect/token`;
  //   return this._http.post(URL, payload, { headers: headers }).pipe(map((res: any) => {
  //     localStorage.setItem('token', res.access_token)
  //     localStorage.setItem('refresh_token', res.refresh_token)
  //     this.startRefreshTokenTimer();
  //   }));
  // }

  // helper methods

  refreshTokenTimeout?: NodeJS.Timeout;

  startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtBase64 = localStorage.getItem('token').split('.')[1];
    const refreshToken = localStorage.getItem('refresh_token')

    const jwtToken = JSON.parse(atob(jwtBase64));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken(refreshToken).subscribe(), timeout);
  }

  stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
