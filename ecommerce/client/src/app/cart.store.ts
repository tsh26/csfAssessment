
// TODO Task 2

import { Injectable } from "@angular/core";
import { Cart, LineItem } from "./models";
import { ComponentStore } from "@ngrx/component-store";

export interface CART_STATE {
    cart: Cart
}

// Use the following class to implement your store
@Injectable()
export class CartStore extends ComponentStore<CART_STATE> {

  constructor() {
    super({ cart: { lineItems: [] } });
  }

  readonly addProductToCart = this.updater((state, product: LineItem) => {
    return {
      ...state,
      cart: {
        ...state.cart,
        lineItems: [...state.cart.lineItems, product]
      }
    };
  });

  readonly removeProductFromCart = this.updater((state, productId: string) => {
    return {
      ...state,
      cart: {
        ...state.cart,
        lineItems: state.cart.lineItems.filter(item => item.prodId !== productId)
      }
    };
  });

  readonly clearCart = this.updater(state => {
    return {
      ...state,
      cart: { lineItems: [] }
    };
  });
}
