import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Employee } from "../types/employee";
import { HttpClient } from "@angular/common/http";
import { CoreUtils } from "../utils/core-utils";

@Injectable({
  providedIn: "root"
})
export class EmplyeeService {
  public apiUrl = "http://localhost:3000/employees";

  public _util = new CoreUtils();

  constructor(private http: HttpClient) { }

  public getEmployeeList = (): Observable<Employee[]> => {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  public getEmployeeById = (id: number): Observable<Employee> => {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  public addEmployee = (employee: Employee): Observable<Employee> => {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  public updateEmployee = (employee: Employee): Observable<Employee> => {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  public deleteEmployee = (id: number): Observable<any> => {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  public getAvatars = (): string[] => {
    return [
      "../../../assets/avatars/av1.png",
      "../../../assets/avatars/av3.jfif",
      "../../../assets/avatars/av4.jfif",
      "../../../assets/avatars/av5.png",
      "../../../assets/avatars/av6.jfif",
      "../../../assets/avatars/av7.jfif",
      "../../../assets/avatars/av8.jfif",
      "../../../assets/avatars/av9.jfif",
      "../../../assets/avatars/av10.png"
    ];
  }

  public applySearchAndFilter(searchTerm: string, filters: any, employees: Employee[]): Observable<Employee[]> {
    let empResult: Employee[] = employees;
    try {
      if (filters) {
        empResult = empResult.filter((emp: Employee) =>
          (!filters.name || this._util.toLowerCase(emp.name).includes(this._util.toLowerCase(filters.name)))
          && (!filters.email || this._util.toLowerCase(emp.email).includes(this._util.toLowerCase(filters.email)))
          && (!filters.designation || this._util.toLowerCase(emp.designation) === this._util.toLowerCase(filters.designation))
          && (!filters.company || this._util.toLowerCase(emp.companyName) === this._util.toLowerCase(filters.company))
        );
      }

      if (searchTerm && searchTerm.trim()) {
        empResult = empResult.filter((emp: Employee) =>
          this._util.toLowerCase(emp.name).includes(this._util.toLowerCase(searchTerm))
          || this._util.toLowerCase(emp.email).includes(this._util.toLowerCase(searchTerm))
        );
      }
    } catch (e) {
      console.log(`Error occurred while applying search or filter. Error is ${e}`);
    }

    return of(empResult);
  }
}