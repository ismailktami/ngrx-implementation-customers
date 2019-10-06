import { Component, OnInit } from '@angular/core';
import {Store, select} from '@ngrx/store';
import {Customer} from '../customer.module';
import * as customerActions from '../state/customer.actions';
import {Observable} from 'rxjs';
import * as fromCustomerReducer from '../state/customer.reducer';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
customers$: Observable<Customer[]>;
error$: Observable<string>;
config: any;
  constructor(private store: Store<fromCustomerReducer.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new customerActions.LoadCustomers());
    this.customers$ = this.store.pipe(select(fromCustomerReducer.getCustomers));
    this.error$ = this.store.pipe(select(fromCustomerReducer.getCustomersError));
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      config: this.customers$.subscribe(data => {
        return data.length;
      })
    };

  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  updateCustomer(customer: Customer) {
   this.store.dispatch(new  customerActions.LoadCustomer(customer.id));
  }
  deleteCustomer(customer: Customer ) {
    if (confirm('Are you sure you want to delete the Customer ')) {
      this.store.dispatch(new customerActions.DeleteCustomer(customer.id));
    }
  }
}
