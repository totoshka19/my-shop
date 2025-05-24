import { makeObservable, observable, action, runInAction } from 'mobx';
import type { Product } from '../types/types';

class ProductStore {
  product: Product | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      product: observable,
      loading: observable,
      error: observable,
      fetchProduct: action,
    });
  }

  async fetchProduct(id: number) {
    this.loading = true;
    this.error = null;
    this.product = null;

    try {
      const apiBase = import.meta.env.VITE_BACKEND_URL || '';
      const response = await fetch(`${apiBase}/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const data: Product = await response.json();
      runInAction(() => {
        this.product = data;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = 'Failed to load product.';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const productStore = new ProductStore();
