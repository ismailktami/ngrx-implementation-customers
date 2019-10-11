import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromCustomer from '../state/customer.reducer';
import {Observable} from 'rxjs';
import {Customer} from '../customer.module';
import * as customerActions from '../state/customer.actions';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customerForm: FormGroup;
  submitted = false;
  id : number ;
  constructor(
    private fb: FormBuilder,
    private store: Store<fromCustomer.AppState>
  ) { }
  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required , Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)]],
      address: ['', Validators.required],
      membership: ['', Validators.required],
    });

    const customer$: Observable<Customer> = this.store.select(
    fromCustomer.getCurrentCostumer);
    customer$.subscribe(currentCustomer => {
      if (currentCustomer) {
        this.customerForm.patchValue({
          name: currentCustomer.name,
          phone: currentCustomer.phone,
          address: currentCustomer.address,
          id: currentCustomer.id,
          membership: currentCustomer.membership,
        });
        this.id = currentCustomer.id;
      }
    })
    ; }
  get f() { return this.customerForm.controls; }
  updateCustomer() {
    const updateCustomer: Customer = {
      name: this.customerForm.get('name').value,
      phone: this.customerForm.get('phone').value,
      address: this.customerForm.get('address').value,
      membership: this.customerForm.get('membership').value,
      id: this.id
    };
    this.store.dispatch(new customerActions.UpdateCustomer(updateCustomer));
  }
  onSubmit() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      console.log(this.customerForm.invalid);
      return;
    }
    this.updateCustomer();
    this.customerForm.reset();
    this.id = null;
  }

}
