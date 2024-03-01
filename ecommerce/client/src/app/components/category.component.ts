import { Component, OnInit, Output, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LineItem, Product } from '../models';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { CartStore } from '../cart.store';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  // NOTE: you are free to modify this component

  private prodSvc = inject(ProductService)
  private activatedRoute = inject(ActivatedRoute)
  private cartStore = inject(CartStore)

  @Output()
  product = new Subject<Product>()

  category: string = "not set"

  products$!: Observable<Product[]>

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.params['category']
    this.products$ = this.prodSvc.getProductsByCategory(this.category)
    // this.cartStore.addProductToCart(lineItem)
  }
  addProductToCart(product: Product): void {
    const lineItem = {
      name: product.name,
      prodId: product.prodId,
      quantity: 1,
      price: product.price
    };

    this.cartStore.addProductToCart(lineItem);
  }

}
