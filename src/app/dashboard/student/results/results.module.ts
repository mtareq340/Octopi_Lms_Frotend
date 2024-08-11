import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResultsRoutingModule } from './results-routing.module';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ShowResultsComponent } from './components/show-results/show-results.component';
import { ResultFilterPipe } from './pipes/result-filter.pipe';


@NgModule({
  declarations: [
    SearchResultsComponent,
    ShowResultsComponent,
    ResultFilterPipe
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    SharedModule
  ]
})
export class ResultsModule { }
