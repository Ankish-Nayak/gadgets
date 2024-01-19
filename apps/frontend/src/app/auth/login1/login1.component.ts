import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginFeedback1 } from '../../shared/models/feedback/login1Feedback';
import { AuthService } from '../../shared/services/auth/auth.service';
import { users } from './mock';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login1',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login1.component.html',
  styleUrl: './login1.component.css',
})
export class Login1Component {
  values = { username: '', password: '' };
  feedback: LoginFeedback1 = new LoginFeedback1('', '');
  loginForm!: FormGroup;
  submitted: boolean = false;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(this.values.username, [
        Validators.required,
        Validators.min(6),
      ]),
      password: new FormControl(this.values.password, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  submit(e: SubmitEvent) {
    e.preventDefault();
    const { username, password } = this.loginForm.value;
    this.submitted = true;
    console.log(username, password);
    if (
      users.some((value) => {
        return value.username === username && value.password === password;
      })
    ) {
      this.submitted = false;
      console.log('loggedIn');
      this.authService.login(username, password).subscribe((res) => {
        console.log(res);
      });
      this.loginForm.reset();
    } else {
      console.log('not loggedIn');
    }
  }
  submitValidusername() {
    const username = this.username;
    let style = 'form-control';
    if (this.submitted) {
      if (username === null) {
        return style;
      } else {
        if (username.valid) {
          style = style + ' is-valid';
        } else {
          this.feedback.username = 'Invalid username address.';
          style = style + ' is-invalid';
        }
        return style;
      }
    } else {
      return style;
    }
  }
  submitValidPassword() {
    const password = this.password;
    let style = 'form-control';
    if (this.submitted) {
      if (password === null) {
        return style;
      } else {
        if (password.valid) {
          style = style + ' is-valid';
        } else {
          this.feedback.password = 'Password must atleast 6 chars';
          style = style + ' is-invalid';
        }
        return style;
      }
    } else {
      return style;
    }
  }
  validUsername() {
    const username = this.username;
    let style = 'form-control';
    if (username === null || !(username.touched && username.dirty)) {
      return style;
    } else {
      if (username.valid) {
        style = style + ' is-valid';
      } else {
        this.feedback.username = 'Username must of atleast 6 chars.';
        style = style + ' is-invalid';
      }
      return style;
    }
  }
  validPassword() {
    const password = this.password;
    let style = 'form-control';
    if (password === null || !(password.touched && password.dirty)) {
      return style;
    } else {
      if (password.valid) {
        style = style + ' is-valid';
      } else {
        this.feedback.password = 'Password must ot least 6 chars';
        style = style + ' is-invalid';
      }
      return style;
    }
  }
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
