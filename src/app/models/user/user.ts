export class User {
  id: string;
  fullName: string;
  userName: string;
  status: string;
  dob: Date;
  role: Object;


  constructor(id: string, fullName: string, userName: string, status: string, dob: Date, role: string) {
    this.id = id;
    this.fullName = fullName;
    this.userName = userName;
    this.status = status;
    this.dob = dob;
    this.role = role;
  }
}
