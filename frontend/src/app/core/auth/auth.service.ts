import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {DefaultResponseType} from "../../../types/default-response.type";
import {LoginResponseType} from "../../../types/login-response.type";
import {TokenType} from "../../../types/token.type";
import {UserResponseType} from "../../../types/user-response.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public accessTokenKey = 'accessToken';

  public refreshTokenKey = 'refreshToken';

  public userIdKey = 'userId';
  public userNameKey = 'userName';
  public userMailKey = 'userMail';

  public isLogged$: Subject<boolean> = new Subject<boolean>();

  private isLogged = false;

  constructor(private http: HttpClient) {
    this.isLogged = !!localStorage.getItem(this.accessTokenKey);
  }

  login(email: string, password: string, rememberMe: boolean): Observable<DefaultResponseType | LoginResponseType> {
    return this.http.post<DefaultResponseType | LoginResponseType>(`${environment.apiUrl}login`, {
      email,
      password,
      rememberMe,
    });
  }

  signup(name: string, email: string, password: string): Observable<DefaultResponseType | LoginResponseType> {
    return this.http.post<DefaultResponseType | LoginResponseType>(`${environment.apiUrl}signup`, {
      name,
      email,
      password
    });
  }

  logout(): Observable<DefaultResponseType> {
    const tokens: TokenType = this.getTokens();
    if (tokens && tokens.refreshToken) {
      return this.http.post<DefaultResponseType>(`${environment.apiUrl}logout`, {
        refreshToken: tokens.refreshToken,
      });
    }
    throw throwError(() => 'Can not find token');
  }

  refresh(): Observable<DefaultResponseType | LoginResponseType> {
    const tokens: TokenType = this.getTokens();
    if (tokens && tokens.refreshToken) {
      return this.http.post<DefaultResponseType | LoginResponseType>(`${environment.apiUrl}refresh`, {
        refreshToken: tokens.refreshToken,
      });
    }
    throw throwError(() => 'Can not use token');
  }

  public getUser(): Observable<DefaultResponseType | UserResponseType> {
    return this.http.get<DefaultResponseType | UserResponseType>(`${environment.apiUrl}users`);
  }

  public getIsLoggedIn(): boolean {
    return this.isLogged;
  }

  public setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    this.isLogged = true;
    this.isLogged$.next(true);
  }

  public removeTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.isLogged = false;
    this.isLogged$.next(false);
  }

  public getTokens(): TokenType {
    return {
      accessToken: localStorage.getItem(this.accessTokenKey),
      refreshToken: localStorage.getItem(this.refreshTokenKey),
    };
  }

  get userId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  set userId(id: string | null) {
    if (id) {
      localStorage.setItem(this.userIdKey, id);
    } else {
      localStorage.removeItem(this.userIdKey);
    }
  }

  get userName(): string | null {
    return localStorage.getItem(this.userNameKey);
  }

  get userMail(): string | null {
    return localStorage.getItem(this.userMailKey);
  }

  setUserInfo(id: string | null, name: string | null, mail: string | null) {
    if (id && name && mail) {
      localStorage.setItem(this.userIdKey, id);
      localStorage.setItem(this.userNameKey, name);
      localStorage.setItem(this.userMailKey, mail);
    } else {
      localStorage.removeItem(this.userIdKey);
      localStorage.removeItem(this.userNameKey);
      localStorage.removeItem(this.userMailKey);
    }
  }

}
