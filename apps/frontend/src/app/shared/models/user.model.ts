import { Injectable } from '@angular/core';
import { Adapter } from './adpater';
import { IUser } from '../interfaces/user.interface';

export class User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;

  constructor(
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    image: string,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.image = image;
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserAdapter implements Adapter<User> {
  adapt(user: IUser) {
    return new User(
      user.id,
      user.username,
      user.email,
      user.firstName,
      user.lastName,
      user.gender,
      user.image,
    );
  }
}
