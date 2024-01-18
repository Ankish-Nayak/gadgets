import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth`;
  constructor(private http: HttpClient) {}
  logout() {
    //TODO: make logout backend request.
    localStorage.removeItem('authToken');
  }
  login(username: string, password: string) {
    return this.http.post(
      `${this.apiUrl}/login`,
      {
        username,
        password,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
  me() {
    const authToken = localStorage.getItem('authToken');
    return this.http.get(`${this.apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }
}
