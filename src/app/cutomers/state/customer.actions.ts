import {Action} from '@ngrx/store';
import {Customer} from '../customer.module';
import {Update} from '@ngrx/entity';
export enum CustomerActionType {
  LOAD_CUSTOMERS = '[Customer] load Customers',
  LOAD_CUSTOMERS_SUCCESS = '[Customer] load Customers Success',
  LOAD_CUSTOMERS_FAIL = '[Customer] load Customers FAIL',
  LOAD_CUSTOMER = '[Customer] load Customer',
  LOAD_CUSTOMER_SUCCESS = '[Customer] load Customer Success',
  LOAD_CUSTOMER_FAIL = '[Customer] load Customer FAIL',
  CREATE_CUSTOMER = '[Customer] create Customer',
  CREATE_CUSTOMER_SUCCESS = '[Customer] create Customer Success',
  CREATE_CUSTOMER_FAIL = '[Customer] create Customer FAIL',
  UPDATE_CUSTOMER = '[Customer] update Customer',
  UPDATE_CUSTOMER_SUCCESS = '[Customer] update Customer Success',
  UPDATE_CUSTOMER_FAIL = '[Customer] update Customer FAIL',
  DELETE_CUSTOMER = '[Customer] delete Customer',
  DELETE_CUSTOMER_SUCCESS = '[Customer] delete Customer Success',
  DELETE_CUSTOMER_FAIL = '[Customer] delete Customer FAIL',
}


export class LoadCustomers implements Action {
  readonly  type = CustomerActionType.LOAD_CUSTOMERS;
}

export class LoadCustomersSuccess implements Action {
  readonly  type = CustomerActionType.LOAD_CUSTOMERS_SUCCESS;
  constructor( public payload: Customer[] ) {}
}
export class LoadCustomersFail implements Action {
  readonly type = CustomerActionType.LOAD_CUSTOMERS_FAIL;

  constructor(public payload: string) {
  }
}



export class LoadCustomer implements Action {
  readonly  type = CustomerActionType.LOAD_CUSTOMER;
  constructor(public payload: number) {}
}

export class LoadCustomerSuccess implements Action {
  readonly  type = CustomerActionType.LOAD_CUSTOMER_SUCCESS;
  constructor( public payload: Customer ) {}
}
export class LoadCustomerFail implements Action {
  readonly type = CustomerActionType.LOAD_CUSTOMER_FAIL;

  constructor(public payload: string) {
  }
}


export class CreateCustomer implements Action {
  readonly  type = CustomerActionType.CREATE_CUSTOMER;
  constructor(public payload: Customer) {
  }
}

export class CreateCustomerSuccess implements Action {
  readonly  type = CustomerActionType.CREATE_CUSTOMER_SUCCESS;
  constructor( public payload: Customer ) {}
}
export class CreateCustomerFail implements Action {
  readonly type = CustomerActionType.CREATE_CUSTOMER_FAIL;

  constructor(public payload: string) {
  }
}




export class UpdateCustomer implements Action {
  readonly  type = CustomerActionType.UPDATE_CUSTOMER;
  constructor(public payload: Customer) {}
}

export class UpdateCustomerSuccess implements Action {
  readonly  type = CustomerActionType.UPDATE_CUSTOMER_SUCCESS;
  constructor( public payload: Update<Customer> ) {}
}
export class UpdateCustomerFail implements Action {
  readonly type = CustomerActionType.UPDATE_CUSTOMER_FAIL;

  constructor(public payload: string) {
  }
}

export class DeleteCustomer implements Action {
  readonly  type = CustomerActionType.DELETE_CUSTOMER;
  constructor(public payload: number) {}
}

export class DeleteCustomerSuccess implements Action {
  readonly  type = CustomerActionType.DELETE_CUSTOMER_SUCCESS;
  constructor( public payload: number ) {}
}
export class DeleteCustomerFail implements Action {
  readonly type = CustomerActionType.DELETE_CUSTOMER_FAIL;
  constructor(public payload: string) {
  }
}





export type Action=

  LoadCustomers| LoadCustomersSuccess | LoadCustomersFail|
  LoadCustomer| LoadCustomerSuccess | LoadCustomerFail|
  CreateCustomer| CreateCustomerSuccess | CreateCustomerFail|
UpdateCustomer| UpdateCustomerSuccess | UpdateCustomerFail|
DeleteCustomer| DeleteCustomerSuccess | DeleteCustomerFail
;
