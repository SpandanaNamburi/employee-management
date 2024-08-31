import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  public searchText: string = "";

  @Output() search = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public onSearchText = () => {
    this.search.emit(this.searchText);
  }
}
