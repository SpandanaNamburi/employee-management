import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { SearchComponent } from "./shared/components/search/search.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeeFormDialogComponent } from "./employee-form-dialog/employee-form-dialog.component";
import { EmployeeFiltersComponent } from "./employee-filters/employee-filters.component";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    EmployeeListComponent,
    EmployeeFormDialogComponent,
    EmployeeFiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
