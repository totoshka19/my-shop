import React from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import Button from '../components/Button/Button';
import { cartStore } from '../store/cartStore';
import type { Product } from '../types/types';

function ProductPage() {
  const { id } = useParams();
  const product = PRODUCTS.find((p: Product) => p.id === Number(id));

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  const handleAddToCart = () => {
    cartStore.addItem(product.id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold text-gray-800 mb-4">
              ${product.price.toLocaleString('en-US')}
            </p>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <Button
              onClick={handleAddToCart}
              className="w-full bg-custom-taupe-medium hover:bg-custom-taupe-dark text-white"
            >
              Add&nbsp;to&nbsp;Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage; 