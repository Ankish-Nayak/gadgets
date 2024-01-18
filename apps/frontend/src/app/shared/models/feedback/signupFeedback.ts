export class SignupFeedback {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}
