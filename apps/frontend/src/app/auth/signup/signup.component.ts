import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { credentials } from '../login/mock';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  values = { firstname: '', lastname: '', email: '', password: '' };
  submitted = false;
  feedback: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  } = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstname: new FormControl(this.values.firstname, [Validators.required]),
      lastname: new FormControl(this.values.lastname, [Validators.required]),
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
    const { email, password } = this.signupForm.value;
    this.submitted = true;
    console.log(email, password);
    if (
      credentials.some((value) => {
        return value.email === email && value.password === password;
      })
    ) {
      this.submitted = false;
      console.log('loggedIn');
      this.signupForm.reset();
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
    if (email === null || !(email.touched && email.dirty)) {
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
  validFirstname() {
    const firstname = this.firstname;
    let style = 'form-control';
    return style;
  }
  validLastname() {
    const lastname = this.lastname;
    let style = 'form-control';
    return style;
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get firstname() {
    return this.signupForm.get('firstname');
  }
  get lastname() {
    return this.signupForm.get('lastname');
  }
}
