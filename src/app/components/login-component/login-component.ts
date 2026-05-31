import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'app/services/login/login-service';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  loginService = inject(LoginService);
  router = inject(Router);

  errorMessage = signal("");

  form = new FormGroup({
    "email": new FormControl("", { validators: [Validators.required] }),
    "password": new FormControl("", { validators: [Validators.required] })
  });

  login() {

    if (this.form.valid) {

      this.loginService.login({ email: this.form.value.email!, password: this.form.value.password! }).subscribe(r => {
        this.errorMessage.set("");
        this.router.navigate([""]);
      }, e => {
        this.errorMessage.set("Neispravno unet email ili lozinka");
      });
    }
  }
}
