import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { credentials } from '../login/mock';
import { Router, RouterLink } from '@angular/router';
import { SignupFeedback } from '../../shared/models/feedback/signupFeedback';

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
  feedback: SignupFeedback = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstname: new FormControl(this.values.firstname, [Validators.required]),
      lastname: new FormControl(this.values.lastname, [Validators.required]),
      email: new FormControl(this.values.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.values.password, [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl(this.values.password, [
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
      !credentials.some((value) => {
        return value.email === email && value.password === password;
      })
    ) {
      credentials.push({ email, password });
      this.submitted = false;
      console.log('loggedIn');
      this.signupForm.reset();
    } else {
      this.router.navigate(['', 'login']);
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
    if (email === null || this.neitherTouchNorBlurry(email)) {
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
  neitherTouchNorBlurry(element: AbstractControl<any, any>) {
    return !(element.touched && element.dirty);
  }
  validPassword() {
    const password = this.password;
    let style = 'form-control';
    if (password === null || this.neitherTouchNorBlurry(password)) {
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
    if (firstname === null || this.neitherTouchNorBlurry(firstname)) {
      return style;
    } else {
      if (firstname.valid) {
        style = style + ' is-valid';
      } else {
        this.feedback.firstname = 'Required';
        style = style + ' is-invalid';
      }
    }
    return style;
  }
  validLastname() {
    const lastname = this.lastname;
    let style = 'form-control';
    if (lastname === null || this.neitherTouchNorBlurry(lastname)) {
      return style;
    } else {
      if (lastname.valid) {
        style = style + ' is-valid';
      } else {
        this.feedback.lastname = 'Required';
        style = style + ' is-invalid';
      }
    }
    return style;
  }
  passwordMatch() {
    const { password, confirmPassword } = this.signupForm.value;
    return password === confirmPassword;
  }
  validConfirmPassword() {
    const confirmPassword = this.confirmPassword;
    let style = 'form-control';
    if (
      confirmPassword === null ||
      this.neitherTouchNorBlurry(confirmPassword)
    ) {
      return style;
    } else {
      if (!confirmPassword.valid) {
        this.feedback.confirmPassword = 'Password must be atleast 6 chars.';
        style = style + ' is-invalid';
      } else if (!this.passwordMatch()) {
        style = style + ' is-invalid';
        this.feedback.confirmPassword = 'Password dose not match.';
      } else if (confirmPassword.valid) {
        style = style + ' is-valid';
      }
    }
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
  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
}
