import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@workspace/frontend/data-access/api';
import { IUser } from '@workspace/shared/interfaces';

@Injectable()
export class UsersService {
  private resourceUrl = 'users';

  constructor(private api: ApiService) {}

  getAllUsers(): Observable<IUser[]> {
    return this.api.get<IUser[]>(this.resourceUrl);
  }

  getOneUser(id: string | number): Observable<IUser> {
    return this.api.getOne<IUser>(this.resourceUrl, id);
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.api.put<IUser>(this.resourceUrl, user);
  }
}
