import { Component } from '@angular/core';
import { ShowResultsComponent } from '../show-results/show-results.component';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  resultForm = new FormGroup({});
  constructor(private _ShowResultsComponent:ShowResultsComponent){}
  search(value: any){
    this._ShowResultsComponent.searchKey = value;
  }
}
