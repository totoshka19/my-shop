import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../components/Button/Button';
import { cartStore } from '../store/cartStore';
import type { Product } from '../types/types';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Fetching product failed:", error);
        setError('Failed to load product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error || !product) {
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
