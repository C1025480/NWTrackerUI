import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  onLogin(): void {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post<LOG_LOGIN>('https://localhost:7199/UserLogin', loginData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
        (response: any) => {
        if (response.message === 'Login successful') {
            sessionStorage.clear();
            console.log('Login successful', response);
            sessionStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigate(['/Project-Management']);
          }
        },
        (error) => {
          if (error.status === 401) {
            console.error('Login failed: Invalid credentials');
            alert('Login failed. Please check your credentials.');
          } else {
            console.error('Login failed', error);
            alert('An error occurred. Please try again.');
          }
        }
    );
  }
}

interface LOG_LOGIN {
  LOG_ID: number;
  LOG_FIRSTNAME: string;
  LOG_SECONDNAME: string;
  LOG_EMAILADDRESS: string;
  LOG_PHONENUMBER: string;
  LOG_USERNAME: string
  LOG_HASHED_PASSWORD: string;
  LOG_SALT: string;
}
