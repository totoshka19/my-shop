import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types/types';
import { formatPrice } from '../../utils';
import Button from '../Button/Button';
import { cartStore } from '../../store/cartStore';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const formattedPrice = formatPrice(product.price);

  const handleAddToCart = () => {
    cartStore.addItem(product.id);
  };

  const handleOpenProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">{formattedPrice}</p>
      <p className="text-sm text-gray-500 mt-1">{product.description}</p>
      <div className="mt-4 flex space-x-2">
        <Button onClick={handleOpenProduct} className="w-1/2 border border-custom-taupe-medium bg-white text-custom-taupe-dark hover:bg-custom-taupe-medium hover:text-white">Details</Button>
        <Button onClick={handleAddToCart} className="w-1/2 bg-custom-taupe-medium hover:bg-custom-taupe-dark text-white">Add&nbsp;to&nbsp;Cart</Button>
      </div>
    </div>
  );
}

export default ProductCard;
