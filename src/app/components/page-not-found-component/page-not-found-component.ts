import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { LoginService } from 'app/services/login/login-service';

@Component({
  selector: 'app-page-not-found-component',
  imports: [MatCardModule],
  templateUrl: './page-not-found-component.html',
  styleUrl: './page-not-found-component.scss',
})
export class PageNotFoundComponent {
  private loginService: LoginService = inject(LoginService);
  private router: Router = inject(Router);

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }
  goToLogin() {
    this.router.navigate(["/login"]);
  }
}
