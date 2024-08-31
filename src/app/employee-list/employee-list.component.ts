import { Component, OnInit } from "@angular/core";
import { Employee } from "../core/types/employee";
import { EmplyeeService } from "../core/services/employee.service";
import { MatDialog } from "@angular/material/dialog";
import { EmployeeFormDialogComponent } from "../employee-form-dialog/employee-form-dialog.component";
import { debounceTime, Subject, switchMap } from "rxjs";
import { EmpFilter } from "../core/types/emp-filter";
import { Constant } from "../core/constants/const";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.scss"]
})
export class EmployeeListComponent implements OnInit {
  public _const = new Constant();

  public employees: Employee[] = [];
  public filteredEmployees: Employee[] = [];
  public isShowFilter = false;
  public searchText: string = "";
  public filters: EmpFilter = new EmpFilter();

  private filterSubject: Subject<string | EmpFilter> = new Subject<string | EmpFilter>();

  constructor(
    public empSrvc: EmplyeeService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getEmployeeList();
    this.filterEmployees();
  }

  public openEmployeeForm = (employee?: Employee) => {
    const dialogRef = this.dialog.open(EmployeeFormDialogComponent, {
      width: this._const.DIALOG_WIDTH,
      position: { right: "0" },
      disableClose: true,
      data: {
        employee: employee ? employee : null,
        allEmployees: this.employees
      }
    });

    dialogRef.afterClosed().subscribe((result: Employee) => {
      if (result) {
        if (employee) {
          this.updateEmployee(result);
        } else {
          this.addEmployee(result);
        }
        this.getEmployeeList();
      }
    });
  }

  public onDeleteEmployee = (id: number) => {
    if (confirm(this._const.CONFIRM_EMP_DELETE)) {
      this.deleteEmployee(id);
    }
  }

  public toggleFilterBar = () => {
    this.isShowFilter = !this.isShowFilter;
  }

  public onSearch = (searchText: string) => {
    this.searchText = searchText;
    this.filterSubject.next(searchText);
  }

  public onFilter = (filter: EmpFilter) => {
    this.filters = filter;
    this.filterSubject.next(filter);
  }

  private filterEmployees = () => {
    this.filterSubject.pipe(
      debounceTime(300),
      switchMap((filter) => this.empSrvc.applySearchAndFilter(this.searchText, this.filters, this.employees))
    ).subscribe((resp: Employee[]) => {
      this.filteredEmployees = resp && resp.length > 0 ? resp : [];
    });
  }

  private getEmployeeList = () => {
    this.empSrvc.getEmployeeList().subscribe((resp: Employee[]) => {
      this.employees = resp && resp.length > 0 ? resp : [];
      this.filteredEmployees = resp && resp.length > 0 ? resp : [];
      const emitVal: string | EmpFilter = this.searchText ? this.searchText : this.filters;
      this.filterSubject.next(emitVal);
    });
  }

  private updateEmployee = (emp: Employee) => {
    this.empSrvc.updateEmployee(emp).subscribe((resp: Employee) => {
      this.getEmployeeList();
    });
  }

  private addEmployee = (emp: Employee) => {
    this.empSrvc.addEmployee(emp).subscribe((resp: Employee) => {
      this.getEmployeeList();
    });
  }

  private deleteEmployee = (id: number) => {
    this.empSrvc.deleteEmployee(id).subscribe((resp: any) => {
      this.getEmployeeList();
    });
  }
}
