import { Component, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LineItem, Order } from '../models';
import { ProductService } from '../product.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit {

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  checkoutForm!: FormGroup;

  @Input()
  lineitem: LineItem[] = []

  @Output()
  newOrder = new Subject<Order>()

  ngOnInit(): void {
    this.checkoutForm = this.createCheckOutForm()
  }

  private createCheckOutForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      address: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      priority: this.fb.control<boolean>(false),
      comments: this.fb.control<string>('')
    })
  }
  
  processForm() {
    const formData: FormData = new FormData();
    const formValue = this.checkoutForm.value;
    const order: Order = {
      ...formValue
    }
    console.log('process form', order)
    this.newOrder.next(order)

    return formData;
  }
  getTotalPrice() {
  // function to calculate total price of items and display it in component html. 
  }
  
  
  // TODO Task 3
  onCheckout(): void {
    if (this.checkoutForm.valid) {
      this.productService.checkout(this.checkoutForm.value).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }
}

