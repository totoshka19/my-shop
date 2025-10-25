// --- НАЧАЛО ФАЙЛА: "frontend/src/pages/ProductPage.tsx" ---
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Button from '../components/Button/Button';
import { cartStore } from '../store/cartStore';
import Spinner from '../components/Spinner/Spinner';
import { fetchProductById } from '../services/api';

function ProductPage() {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id, // Запрос будет выполнен только если id существует
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center"><Spinner /></div>;
  }

  if (isError || !product) {
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
// --- КОНЕЦ ФАЙЛА: "frontend/src/pages/ProductPage.tsx" ---
