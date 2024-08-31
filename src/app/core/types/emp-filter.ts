export class EmpFilter {
  public name: string;
  public company: string;
  public email: string;
  public designation: string;
  [key: string]: any;

  constructor() {
    this.name = "";
    this.company = "";
    this.email = "";
    this.designation = "";
  }
}