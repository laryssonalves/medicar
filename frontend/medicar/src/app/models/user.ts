export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  token: string;

  public constructor(
    firstName: string,
    username: string,
    email: string,
    password: string
  ) {
    this.firstName = firstName;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
