import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { LoginService } from 'app/services/login/login-service';

@Component({
  selector: 'app-header-component',
  imports: [RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  private loginService: LoginService = inject(LoginService);
  private router: Router = inject(Router);

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }
  logout() {
    this.loginService.logout();
    this.router.navigateByUrl("/");
  }

}
