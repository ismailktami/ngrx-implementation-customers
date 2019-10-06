import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
const appRoutes: Routes =
  [
  {path: '', component : HomeComponent},
  {path: 'customers', loadChildren : '../app/customers/customers.module#CustomersModule'}
  ,  { path: '**', redirectTo: '' }

  ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule ,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
