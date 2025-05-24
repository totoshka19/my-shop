import { makeAutoObservable } from 'mobx';
import { MAX_CART_ITEMS } from '../constants';
import type { Product } from '../types/types';

export interface CartItem extends Omit<Product, 'description'> {
  quantity: number;
}

class CartStore {
  items: { [key: number]: number } = {};
  products: { [key: number]: Omit<CartItem, 'quantity'> } = {};

  constructor() {
    makeAutoObservable(this);
  }

  get totalItems(): number {
    return Object.values(this.items).reduce((sum, quantity) => sum + quantity, 0);
  }

  get totalPrice(): number {
    return Object.entries(this.items).reduce((sum, [productId, quantity]) => {
      const product = this.products[Number(productId)];
      return sum + (product?.price || 0) * quantity;
    }, 0);
  }

  get cartItems(): CartItem[] {
    return Object.entries(this.items).map(([productId, quantity]) => {
      const productDetails = this.products[Number(productId)];
      return {
        ...productDetails,
        quantity,
      };
    });
  }

  addItem(productId: number, productDetails: Omit<CartItem, 'quantity'>) {
    if (this.totalItems >= MAX_CART_ITEMS) {
      return;
    }

    if (this.items[productId]) {
      this.items[productId]++;
    } else {
      this.items[productId] = 1;
      this.products[productId] = productDetails;
    }
  }

  removeItem(productId: number) {
    if (this.items[productId]) {
      this.items[productId]--;
      if (this.items[productId] === 0) {
        delete this.items[productId];
        delete this.products[productId];
      }
    }
  }

  clearCart() {
    this.items = {};
    this.products = {};
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    if (this.totalItems - (this.items[productId] || 0) + quantity > MAX_CART_ITEMS) {
      return;
    }

    this.items[productId] = quantity;
  }
}

export const cartStore = new CartStore();
