import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@workspace/frontend/data-access/api';
import { User } from '@workspace/shared/data';

@Injectable()
export class UsersService {
  private resourceUrl = 'users';

  constructor(private api: ApiService) {}

  getAllUsers(): Observable<User[]> {
    return this.api.get<User[]>(this.resourceUrl);
  }

  getOneUser(id: string | number): Observable<User> {
    return this.api.getOne<User>(this.resourceUrl, id);
  }

  updateUser(user: User): Observable<User> {
    return this.api.put<User>(this.resourceUrl, user);
  }
}
