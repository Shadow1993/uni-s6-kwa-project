import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from "@angular/router";
import { LoginService } from 'app/services/login/login-service';

@Component({
  selector: 'app-header-component',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  private loginService: LoginService = inject(LoginService);
  private router: Router = inject(Router);

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(["/login"]);
  }

}
