import * as customerActions from '../state/customer.actions';
import {Customer} from '../customer.module';
import * as fromRoot from '../../state/app-state';
import {createFeatureSelector ,  createSelector} from '@ngrx/store';
import {EntityState , EntityAdapter , createEntityAdapter} from '@ngrx/entity/';


export interface CustomerState extends EntityState<Customer> {
  selectedCustomerId: number| null;
  customers: Customer[] ;
  loading: boolean ;
  loaded: boolean ;
  error: string;
}
export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();
export const defaultCustomer: CustomerState = {

    ids: [],
  selectedCustomerId: null,
  entities: {},
  customers: [] ,
  loading: false ,
  loaded: false ,
  error: '',
};

export interface AppState  extends fromRoot.AppState {
  customers: CustomerState;
}


export const initialeState: CustomerState = customerAdapter.getInitialState(defaultCustomer);

export  function customerReducer(state= initialeState, action: customerActions.Action): CustomerState {

  switch (action.type) {
    case customerActions.CustomerActionType.LOAD_CUSTOMERS_SUCCESS : {
      console.log(action.payload);
      return customerAdapter.addAll(action.payload,
        {...state,
        loading: false,
        loaded: true,
        customers: action.payload
      });
    }

    case customerActions.CustomerActionType.LOAD_CUSTOMERS_FAIL: {

    return {...state,
      entities: {},
      loading: false,
      loaded: false,
      error: action.payload
    };
    }
    case customerActions.CustomerActionType.SEARCH_CUSTOMERS_SUCCESS: {
      return customerAdapter.addAll(action.payload,
        {...state,
          loading: false,
          loaded: true,
          customers: action.payload
        });
    }

    case customerActions.CustomerActionType.SEARCH_CUSTOMERS_FAIL: {

      return {...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }


    case customerActions.CustomerActionType.LOAD_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(action.payload, {
        ...state,
        selectedCustomerId: action.payload.id
      });
    }
    case customerActions.CustomerActionType.LOAD_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case customerActions.CustomerActionType.CREATE_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(action.payload, {
        ...state,
        selectedCustomerId: action.payload.id
      });
    }
    case customerActions.CustomerActionType.CREATE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case customerActions.CustomerActionType.UPDATE_CUSTOMER_SUCCESS: {
      return customerAdapter.updateOne(action.payload, state);    }
    case customerActions.CustomerActionType.UPDATE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case customerActions.CustomerActionType.DELETE_CUSTOMER_SUCCESS: {
      return customerAdapter.removeOne(action.payload, state);
    }
    case customerActions.CustomerActionType.DELETE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }




    default: {
      return state;
    }
  }
}


const getCustomerFeatureState = createFeatureSelector<CustomerState>(
  'customers'
);
export const getCustomers = createSelector(
  getCustomerFeatureState,
  customerAdapter.getSelectors().selectAll
);
export const getCustomersLoading = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.loading
);
export const getCustomersLoaded = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.loaded
);

export const getCustomersError = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.error
);
export const  getCurrentCustomerId = createSelector(
  getCustomerFeatureState,
  (state: CustomerState ) => state.selectedCustomerId
);

export const getCurrentCostumer = createSelector(
  getCustomerFeatureState,
  getCurrentCustomerId,
  state => state.entities[state.selectedCustomerId]
  );
