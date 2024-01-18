import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { credentials } from './mock';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  values = { email: '', password: '' };
  feedback: { email: string; password: string } = {
    email: '',
    password: '',
  };
  loginForm!: FormGroup;
  submitted: boolean = false;
  constructor(private location: Location) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(this.values.email, [
        Validators.required,
        Validators.min(1),
        Validators.email,
      ]),
      password: new FormControl(this.values.password, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  submit(e: SubmitEvent) {
    e.preventDefault();
    const { email, password } = this.loginForm.value;
    this.submitted = true;
    console.log(email, password);
    if (
      credentials.some((value) => {
        return value.email === email && value.password === password;
      })
    ) {
      this.submitted = false;
      console.log('loggedIn');
      this.loginForm.patchValue({ email: '', password: '' });
    } else {
      console.log('not loggedIn');
    }
  }
  submitValidEmail() {
    const email = this.email;
    let style = 'form-control';
    if (this.submitted) {
      if (email === null) {
        return style;
      } else {
        if (email.valid) {
          style = style + ' is-valid';
        } else {
          this.feedback.email = 'Invalid email address.';
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
          this.feedback.password = 'Password must ot least 6 chars';
          style = style + ' is-invalid';
        }
        return style;
      }
    } else {
      return style;
    }
  }
  validEmail() {
    const email = this.email;
    let style = 'form-control';
    if (email === null || email.value === '') {
      return style;
    } else {
      if (email.valid) {
        style = style + ' is-valid';
      } else {
        this.feedback.email = 'Invalid email address.';
        style = style + ' is-invalid';
      }
      return style;
    }
  }
  validPassword() {
    const password = this.password;
    let style = 'form-control';
    if (password === null || password.value === '') {
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
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
