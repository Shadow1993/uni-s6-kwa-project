import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { UserModel } from 'app/models/user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<UserModel> {
  protected override url: string = "http://localhost:3000/users";
}
