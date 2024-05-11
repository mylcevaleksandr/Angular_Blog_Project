import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {UserResponseType} from "../../../../types/user-response.type";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLogged = false;
  public user = '';

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
      if (this.isLogged) {
        this.getUserInfo();
      }
    });
    if (this.isLogged && !this.authService.userName) {
      this.getUserInfo();
    } else {
      this.user = this.authService.userName!;
    }
  }

  private getUserInfo() {
    this.authService.getUser().subscribe((data: DefaultResponseType | UserResponseType): void => {
      if ((data as DefaultResponseType).error !== undefined) {
        throw new Error((data as DefaultResponseType).message);
      } else {
        const response: UserResponseType = data as UserResponseType;
        if (response.id && response.name && response.email) {
          this.authService.setUserInfo(response.id, response.name, response.email);
          this.user = this.authService.userName!;
        }
      }
    });
  }

  public logout() {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          this.doLogout();
        },
      });
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.setUserInfo(null, null, null);
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['']);
  }

}
