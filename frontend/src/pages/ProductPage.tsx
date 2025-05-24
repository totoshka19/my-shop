import { useEffect } from 'react';
import { formatPrice } from '../utils';
import Button from '../components/Button/Button';
import { cartStore } from '../store/cartStore';
import Spinner from '../components/Spinner/Spinner';
import { useLocation } from 'react-router-dom';
import { breadcrumbStore } from '../store/breadcrumbStore';
import { observer } from 'mobx-react-lite';
import { productStore } from '../store/productStore';

const ProductPage = observer(() => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  const productId = pathSegments[1];

  useEffect(() => {
    const id = Number(productId);
    if (isNaN(id) || id <= 0) {
      breadcrumbStore.setProductBreadcrumb(null);
      return;
    }

    productStore.fetchProduct(id);
    breadcrumbStore.setProductBreadcrumb(null);
  }, [productId]);

  const { product, loading, error } = productStore;

  useEffect(() => {
    if (product) {
      breadcrumbStore.setProductBreadcrumb(product.name);
    }
  }, [product]);

  if (loading) {
    return <div className="text-center py-8"><Spinner /></div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found.</div>;
  }

  const handleAddToCart = () => {
    cartStore.addItem(product.id, {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl
    });
  };

  const formattedPrice = formatPrice(product.price);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full md:w-1/2 object-cover rounded-lg shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-4">{formattedPrice}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <Button
            onClick={handleAddToCart}
            className="bg-custom-taupe-medium hover:bg-custom-taupe-dark text-white"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
});

export default ProductPage;
