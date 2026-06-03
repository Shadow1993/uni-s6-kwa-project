import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'app/services/login/login-service';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, MatInputModule, MatButton],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  loginService = inject(LoginService);
  router = inject(Router);

  private snackBar = inject(MatSnackBar);

  form = new FormGroup({
    "email": new FormControl("", { validators: [Validators.required, Validators.email] }),
    "password": new FormControl("", { validators: [Validators.required] })
  });

  login() {

    if (this.form.valid) {

      const user = {
        email: this.form.value.email!,
        password: this.form.value.password!
      };

      this.loginService.login(user).subscribe((r) => {
        this.router.navigate([""]);
      }, (e) => {
        this.snackBar.open("Incorrect email or password", 'X' , { duration: 3000, verticalPosition: 'top', horizontalPosition: 'right'});
      });
    }
  }
}
