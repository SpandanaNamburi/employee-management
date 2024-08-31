import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { EmplyeeService } from "../core/services/employee.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Employee } from "../core/types/employee";
import { Constant } from "../core/constants/const";

@Component({
  selector: "app-employee-form-dialog",
  templateUrl: "./employee-form-dialog.component.html",
  styleUrls: ["./employee-form-dialog.component.scss"]
})
export class EmployeeFormDialogComponent implements OnInit {
  public _const = new Constant();

  public employeeForm!: FormGroup;
  public employeeId!: number;
  public avatars: string[] = [];
  public allEmployees: Employee[] = [];
  public designations = this._const.DESIGNATIONS;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmplyeeService,
    private dialogRef: MatDialogRef<EmployeeFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initEmployeeForm();
    this.getAvatars();
    this.hasEmpId();
    this.allEmployees = this.data.allEmployees;
  }

  public onSubmit = () => {
    if (this.employeeForm.valid) {
      this.dialogRef.close(this.employeeForm.value);
    }
  }

  public onCancel = () => {
    this.dialogRef.close();
  }

  private initEmployeeForm = () => {
    this.employeeForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      companyName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email, this.validateEmail.bind(this)]],
      contactNo: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]],
      designation: ["", Validators.required],
      avatarUrl: ["", Validators.required],
      id: [null, []]
    });
  }

  private getAvatars = () => {
    this.avatars = this.employeeService.getAvatars();
  }

  private hasEmpId = () => {
    if (this.data && this.data.employee) {
      this.employeeForm.patchValue(this.data.employee);
    }
  }

  private validateEmail = (cntrl: FormControl) => {
    let error = null;
    try {
      let allEmp: Employee[] = this.allEmployees;
      if (this.data && this.data.employee && this.data.employee.id) {
        allEmp = this.allEmployees.filter((emp: Employee) => emp && emp.id !== this.data.employee.id);
      }
      const allEmails: string[] = allEmp.map((emp: Employee) => emp && emp.email);
      if (allEmails.includes(cntrl.value)) {
        error = { notUnique: true };
      }
    } catch (e) {
      console.log(`Error occurred while validating employee email. Error is ${e}`);
    }
    return error;
  }
}
