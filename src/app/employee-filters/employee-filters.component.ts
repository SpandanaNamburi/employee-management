import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Constant } from "../core/constants/const";
import { EmpFilter } from "../core/types/emp-filter";
import { Employee } from "../core/types/employee";

@Component({
  selector: "app-employee-filters",
  templateUrl: "./employee-filters.component.html",
  styleUrls: ["./employee-filters.component.scss"]
})
export class EmployeeFiltersComponent implements OnInit {
  @Output() filter = new EventEmitter<EmpFilter>();
  @Input() public employees: Employee[] = [];

  public _const = new Constant();

  public designations: string[] = this._const.DESIGNATIONS;
  public companies: string[] = [];
  public filters: EmpFilter = new EmpFilter();

  constructor() { }

  ngOnInit(): void {
    this.getAllCompanies();
  }

  public onFilterChange = (filterType: string, value: string) => {
    this.filters[filterType] = value;
  }

  public onSubmit = () => {
    this.filter.emit(this.filters);
  }

  public onCancel = () => {
    this.filters = new EmpFilter();
    this.filter.emit(this.filters);
  }

  private getAllCompanies = () => {
    let companies: string[] = this.employees.map((emp) => emp && emp.companyName);
    this.companies = [...new Set(companies)];
  }
}
