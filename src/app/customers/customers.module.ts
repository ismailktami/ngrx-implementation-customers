import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAddComponent } from '../cutomers/customer-add/customer-add.component';
import { CustomerComponent } from '../cutomers/customer/customer.component';
import { CustomerEditComponent } from '../cutomers/customer-edit/customer-edit.component';
import { CustomerListComponent } from '../cutomers/customer-list/customer-list.component';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {customerReducer} from '../cutomers/state/customer.reducer';
import {EffectsModule, Actions} from '@ngrx/effects';
import {CustomerEffect} from '../cutomers/state/customer.effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
const customerRoutes: Routes = [
  {path: '' , component : CustomerComponent} ,


  ];
@NgModule({
  declarations: [CustomerAddComponent, CustomerComponent, CustomerEditComponent, CustomerListComponent]
  ,
  imports: [
    CommonModule,
    RouterModule.forChild(customerRoutes),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('customers', customerReducer),
    EffectsModule.forFeature([CustomerEffect]),
    NgxPaginationModule
  ]
})
export class CustomersModule { }
