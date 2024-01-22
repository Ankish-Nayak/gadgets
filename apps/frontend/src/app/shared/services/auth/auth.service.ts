import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { AUTH_TOKEN } from '../../../utils/constants';
import { IUser } from '../../interfaces/user.interface';
import { UserAdapter } from '../../models/user.model';
import { IResMe } from '../../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth`;
  private _authenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  authenticatedMessage$ = this._authenticated.asObservable();
  constructor(
    private http: HttpClient,
    private adatper: UserAdapter,
  ) {}
  logout() {
    //TODO: make logout backend request.

    this._authenticated.next(false);
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
          this._authenticated.next(true);
          return this.adatper.adapt(res);
        }),
      );
  }
  me() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return this.http.get<IResMe>(`${this.apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }
  updateAuthenticated(authenticated: boolean) {
    this._authenticated.next(authenticated);
  }
}
