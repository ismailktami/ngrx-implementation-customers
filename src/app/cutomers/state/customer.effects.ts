import {Injectable} from '@angular/core';
import {Actions, Effect , ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable , of } from 'rxjs';
import {map, mergeMap, catchError, filter, debounceTime} from 'rxjs/operators';
import {CustomerService} from '../customer.service';
import * as customerActions from '../state/customer.actions';
import {Customer} from '../customer.module';

// @ts-ignore
@Injectable()
export class CustomerEffect {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService

  ) {}


  @Effect()
  loadCustomers$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.LoadCustomer>(
      customerActions.CustomerActionType.LOAD_CUSTOMERS
    ),
    mergeMap((action: customerActions.LoadCustomer) =>
      this.customerService.getCustomers().pipe(
        map(
          (customers: Customer[]) => new customerActions.LoadCustomersSuccess(customers)),
        catchError(err => of(new customerActions.LoadCustomerFail(err)))
      )
    )
  );


  @Effect()
  searchCustomers: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.SearchCustomers>(
      customerActions.CustomerActionType.SEARCH_CUSTOMERS
    ),
    mergeMap((action: customerActions.SearchCustomers) =>
      this.customerService.getCustomers().pipe(
        debounceTime(5000),
        map(
          (customers: Customer[]) => new customerActions.SearchCustomersSuccess(customers.filter(e => e.name.includes(action.payload))),
        catchError(err => of(new customerActions.SearchCustomersFail(err)))
      )
    )
  ));



  @Effect()
  loadCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.LoadCustomer>(
      customerActions.CustomerActionType.LOAD_CUSTOMER
    ),
    mergeMap((action: customerActions.LoadCustomer) =>
      this.customerService.getCustomerById(action.payload).pipe(
        map(
          (customer: Customer) => new customerActions.LoadCustomerSuccess(customer)),
        catchError(err => of(new customerActions.LoadCustomerFail(err)))
      )
    )
  );


  @Effect()
  createCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.CreateCustomer>(
      customerActions.CustomerActionType.CREATE_CUSTOMER
    ),
    map((action: customerActions.CreateCustomer) => action.payload),
    mergeMap((customer: Customer) =>
      this.customerService.createCustomer(customer).pipe(
        map(
          (newCustomer: Customer) => new customerActions.CreateCustomerSuccess(newCustomer)),
        catchError(err => of(new customerActions.LoadCustomerFail(err)))
      )
    )
  );

  @Effect()
  updateCustomer: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.UpdateCustomer>(
      customerActions.CustomerActionType.UPDATE_CUSTOMER
    ),
    map((action: customerActions.UpdateCustomer) => action.payload),
    mergeMap((customer: Customer) =>
      this.customerService.updateCustomer(customer).pipe(
        map(
          (updateCustomer: Customer) => new customerActions.UpdateCustomerSuccess(
            {id: updateCustomer.id, changes: updateCustomer})),
        catchError(err => of(new customerActions.UpdateCustomerFail(err)))
      )
    )
  );

  @Effect()
  deleteCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.DeleteCustomer>(
      customerActions.CustomerActionType.DELETE_CUSTOMER
    ),
    map((action: customerActions.DeleteCustomer) => action.payload),
    mergeMap((id: number) =>
      this.customerService.deleteCustomer(id).pipe(
        map(
          (updateCustomer: Customer) => new customerActions.DeleteCustomerSuccess(id)),
        catchError(err => of(new customerActions.DeleteCustomerFail(err)))
      )
    )
  );

}
