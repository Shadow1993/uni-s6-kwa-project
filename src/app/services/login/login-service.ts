import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserModel } from 'app/models/user-model';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private http: HttpClient = inject(HttpClient);

  private url = "http://localhost:3000/users"
  private currentUser: UserModel | null = null;

  constructor() {
    let currentUser = localStorage.getItem("currentUser");
    if (currentUser != null) {
      this.currentUser = JSON.parse(currentUser);
    }
  }

  getCurrentUser(): UserModel | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  login(user: UserModel): Observable<boolean> {
    // json-server mock login
    return this.http.get<UserModel[]>(`${this.url}?username=${user.email}&password=${user.password}`)
      .pipe(
        map((users: UserModel[]) => {
          if (users.length > 0) {
            let user = users[0];
            delete user.password;
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
          }
          throw new Error("Wrong email or password");
        })
      );
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem("currentUser");
  }

}
