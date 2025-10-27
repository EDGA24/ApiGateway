export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;

  constructor(props: UserProps) {
    this._id = props.id || this.generateId();
    this._name = props.name;
    this._email = props.email;
    this._password = props.password;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      email: this._email
    };
  }
}