import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    return this.http.post('http://localhost:9000/api/register', user);
  }

  loginUser(user: { email: string; password: string }) {
    return this.http.post('http://localhost:9000/api/login', user);
  }

  logout() {
    return this.http.post('http://localhost:9000/api/logout', {});
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
