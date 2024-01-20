import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { IUser } from '../../interfaces/user.interface';
import { map } from 'rxjs/operators';
import { UserAdapter } from '../../models/user.model';
import { AUTH_TOKEN } from '../../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth`;
  constructor(
    private http: HttpClient,
    private adatper: UserAdapter,
  ) {}
  logout() {
    //TODO: make logout backend request.
    localStorage.removeItem(AUTH_TOKEN);
  }
  login(username: string, password: string) {
    return this.http
      .post<IUser>(
        `${this.apiUrl}/login`,
        {
          username,
          password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .pipe(
        map((res) => {
          // storing token in localStorage
          localStorage.setItem(AUTH_TOKEN, res.token);
          return this.adatper.adapt(res);
        }),
      );
  }
  me() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return this.http.get(`${this.apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }
}
