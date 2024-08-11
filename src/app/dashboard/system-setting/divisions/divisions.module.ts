import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DivisionsRoutingModule } from './divisions-routing.module';
import { AddDivisionsComponent } from './components/add-divisions/add-divisions.component';
import { DeleteDivisionsComponent } from './components/delete-divisions/delete-divisions.component';
import { UpdateDivisionsComponent } from './components/update-divisions/update-divisions.component';
import { SearchDivisionsComponent } from './components/search-divisions/search-divisions.component';
import { ShowDivisionsComponent } from './components/show-divisions/show-divisions.component';


@NgModule({
  declarations: [
    AddDivisionsComponent,
    DeleteDivisionsComponent,
    UpdateDivisionsComponent,
    SearchDivisionsComponent,
    ShowDivisionsComponent
  ],
  imports: [
    CommonModule,
    DivisionsRoutingModule,
    SharedModule
  ]
})
export class DivisionsModule { }
