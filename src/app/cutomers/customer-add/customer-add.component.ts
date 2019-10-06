import { Component, OnInit } from '@angular/core';
import {Customer} from '../customer.module';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromCustomer from '../state/customer.reducer';
import * as customerActions from '../state/customer.actions';

import { NgProgress } from 'ngx-progressbar';
@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  customerForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private store: Store<fromCustomer.AppState>,
  ) { }

  ngOnInit() {
  this.customerForm = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(4)]],
    phone: ['', [Validators.required , Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)]],
    address: ['', Validators.required],
    membership: ['', Validators.required],

  });
  }
  createCostumer() {
    this.submitted = false;
    const newCustomer: Customer = {
      name: this.customerForm.get('name').value,
      phone: this.customerForm.get('phone').value,
      address: this.customerForm.get('address').value,
      membership: this.customerForm.get('membership').value,
    };
    this.store.dispatch(new customerActions.CreateCustomer(newCustomer));
    this.customerForm.reset();
  }
  get f() { return this.customerForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      console.log(this.customerForm.invalid);
      return;
    }
    this.createCostumer();
  }

}
