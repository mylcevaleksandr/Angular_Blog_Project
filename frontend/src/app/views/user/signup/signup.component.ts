import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {RepeatedCodeService} from "../../../shared/services/repeatedCode.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {LoginResponseType} from "../../../../types/login-response.type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public signupForm = this.fb.group({
    userName: ['', [Validators.required, Validators.pattern(/^[ А-Яа-яё]*$/)]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]],
    agree: [false, [Validators.requiredTrue]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private repeatedCodeService: RepeatedCodeService,
    private _snackBar: MatSnackBar,
  ) {
  }

  signup(): void {
    if (this.signupForm.valid && this.signupForm.value.userName && this.signupForm.value.email && this.signupForm.value.password) {
      this.authService.signup(this.signupForm.value.userName, this.signupForm.value.email, this.signupForm.value.password).subscribe({
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
