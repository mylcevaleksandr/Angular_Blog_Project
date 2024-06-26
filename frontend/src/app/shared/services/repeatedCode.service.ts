import {Injectable} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {DefaultResponseType} from '../../../types/default-response.type';
import {LoginResponseType} from '../../../types/login-response.type';
import {AuthService} from '../../core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RepeatedCodeService {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  public performOperation(data: DefaultResponseType | LoginResponseType, operationType: string) {
    let error = null;
    if ((data as DefaultResponseType).error !== undefined) {
      error = (data as DefaultResponseType).message;
    }
    const loginResponse: LoginResponseType = data as LoginResponseType;
    if (!loginResponse.accessToken || !loginResponse.refreshToken || !loginResponse.userId) {
      error = 'Что-то пошло не так';
    }
    if (error) {
      this._snackBar.open(error);
      throw new Error(error);
    }
    this.authService.setTokens(loginResponse.accessToken, loginResponse.refreshToken);
    this.authService.userId = loginResponse.userId;
    if (operationType === 'signup') {
      this._snackBar.open(' Вы успешно зарегистрировались');
    } else if (operationType === 'login') {
      this._snackBar.open(' Вы успешно авторизовались');
    }
    this.router.navigate(['/']);
  }

}
