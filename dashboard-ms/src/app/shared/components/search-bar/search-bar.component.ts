import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchText: any
  @Output() searchTextEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Input() searchFilterConfig: any;

  constructor() { }

  ngOnInit(): void {
  }

  updateSearchText() {
    setTimeout(() => {
      this.searchTextEmitter.emit(this.searchText)
    }, 100);
    
  }

}
