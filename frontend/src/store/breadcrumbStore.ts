import { makeObservable, observable, action } from 'mobx';

class BreadcrumbStore {
  productName: string | null = null;

  constructor() {
    makeObservable(this, {
      productName: observable,
      setProductBreadcrumb: action,
    });
  }

  setProductBreadcrumb(name: string | null) {
    this.productName = name;
  }
}

export const breadcrumbStore = new BreadcrumbStore(); 