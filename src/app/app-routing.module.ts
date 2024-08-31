import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeListComponent } from "./employee-list/employee-list.component";

const routes: Routes = [
  { path: "", redirectTo: "/employee-management", pathMatch: "full" },
  { path: "employee-management", component: EmployeeListComponent },
  { path: "**", redirectTo: "/employee-management" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
