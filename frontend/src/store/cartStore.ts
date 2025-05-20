import { makeAutoObservable } from 'mobx';
import { MAX_CART_ITEMS } from '../constants';

class CartStore {
  items: { [key: number]: number } = {}; // productId: quantity

  constructor() {
    makeAutoObservable(this);
  }

  get totalItems(): number {
    return Object.values(this.items).reduce((sum, quantity) => sum + quantity, 0);
  }

  addItem(productId: number) {
    if (this.totalItems >= MAX_CART_ITEMS) {
      return; // Не добавляем товар, если достигнут лимит
    }
    
    if (this.items[productId]) {
      this.items[productId]++;
    } else {
      this.items[productId] = 1;
    }
  }

  removeItem(productId: number) {
    if (this.items[productId]) {
      this.items[productId]--;
      if (this.items[productId] === 0) {
        delete this.items[productId];
      }
    }
  }
}

export const cartStore = new CartStore(); 