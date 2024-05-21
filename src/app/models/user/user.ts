export class User {
  userId?: string | null;
  fullName?: string | null;
  userName?: string | null;
  status?: string | null;
  dob?: Date | null;
  role?: any | null;
  email?: string | null;
  phone?: string | null;
  gender?: string | null;
  empStatus?: string | null;
  empId?: string | null;
  empLevel?: string | null;
  department?: string | null;
  startDate?: Date | null;
  isAdmin?: boolean | null;

  constructor(
    id: string | null,
    fullName: string | null,
    userName: string | null,
    status: string | null,
    dob: Date | null,
    role: string | null,
    email: string | null,
    phone: string | null,
    gender: string | null,
    empStatus: string | null,
    empId: string | null,
    empLevel: string | null,
    department: string | null,
    startDate: Date | null,
    isAdmin: boolean | null
  ) {
    this.userId = id;
    this.fullName = isAdmin ? 'Administrator' :  fullName;
    this.userName = userName;
    this.status = status;
    this.dob = dob;
    this.role = role;
    this.email = email;
    this.phone = phone;
    this.gender = gender;
    this.empStatus = empStatus;
    this.empId = empId;
    this.empLevel = empLevel;
    this.department = department;
    this.startDate = startDate;
    this.isAdmin = isAdmin;
  }
}
