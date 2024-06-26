import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {LoginResponseType} from "../../../../types/login-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {RepeatedCodeService} from "../../../shared/services/repeatedCode.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private repeatedCodeService: RepeatedCodeService,
    private _snackBar: MatSnackBar,
  ) {
  }

  login(): void {
    this._snackBar.open('ok!');
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password, !!this.loginForm.value.rememberMe).subscribe({
        next: (data: DefaultResponseType | LoginResponseType) => {
          this.repeatedCodeService.performOperation(data, 'login');
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
            this._snackBar.open(errorResponse.error.message);
          } else {
            this._snackBar.open('Ошибка Авторизации');
          }
        },
      });
    }
  }

}
