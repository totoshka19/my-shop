// --- НАЧАЛО ФАЙЛА: "frontend/src/pages/CartPage.tsx" ---
import { observer } from 'mobx-react-lite';
import { useQuery } from '@tanstack/react-query';
import { cartStore } from '../store/cartStore';
import { formatPrice } from '../utils';
import type { Product } from '../types/types';
import Spinner from '../components/Spinner/Spinner';
import { fetchProducts } from '../services/api';

const CartPage = observer(() => {
  const { items, totalItems } = cartStore;

  const { data: products = [], isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const handleRemoveItem = (productId: number) => {
    cartStore.removeItem(productId, true);
  };

  const handleIncreaseQuantity = (productId: number) => {
    cartStore.addItem(productId);
  };

  const handleDecreaseQuantity = (productId: number) => {
    cartStore.removeItem(productId);
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center"><Spinner /></div>;
  }

  if (isError) {
    return <div className="container mx-auto px-4 py-8 text-red-600">Failed to load product information.</div>;
  }

  if (totalItems === 0) {
    return <div className="container mx-auto px-4 py-8 text-center">Your cart is empty.</div>;
  }

  const totalCost = Object.entries(items).reduce((acc, [productId, quantity]) => {
    const product = products.find(p => p.id === Number(productId));
    if (product) {
      return acc + product.price * quantity;
    }
    return acc;
  }, 0);

  const pluralizeItem = (count: number) => (count === 1 ? 'item' : 'items');

  return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Your Cart ({totalItems} {pluralizeItem(totalItems)})</h2>
        <div className="space-y-4">
          {Object.entries(items).map(([productId, quantity]) => {
            const product = products.find(p => p.id === Number(productId));

            if (!product) {
              return <div key={productId} className="text-gray-500">Loading data for product ID {productId}...</div>;
            }

            return (
                <div key={productId} className="flex items-center border-b pb-4">
                  <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{formatPrice(product.price)}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                        onClick={() => handleDecreaseQuantity(product.id)}
                        className="px-2 py-1 border rounded-l disabled:opacity-50"
                        disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b">{quantity}</span>
                    <button
                        onClick={() => handleIncreaseQuantity(product.id)}
                        className="px-2 py-1 border rounded-r"
                    >
                      +
                    </button>
                    <button
                        onClick={() => handleRemoveItem(product.id)}
                        className="ml-4 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
            );
          })}
        </div>
        <div className="mt-6 text-right">
          <h3 className="text-xl font-bold">Total: {formatPrice(totalCost)}</h3>
        </div>
      </div>
  );
});

export default CartPage;
// --- КОНЕЦ ФАЙЛА: "frontend/src/pages/CartPage.tsx" ---
