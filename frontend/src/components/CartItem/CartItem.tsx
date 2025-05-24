import { observer } from 'mobx-react-lite';
import { cartStore } from '../../store/cartStore';
import type { CartItem as CartItemType } from '../../store/cartStore';
import { formatPrice } from '../../utils';
import { MAX_ITEMS_PER_PRODUCT } from '../../constants';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = observer(({ item }: CartItemProps) => {
  const isMinQuantity = item.quantity <= 1;
  const isMaxQuantity = item.quantity >= MAX_ITEMS_PER_PRODUCT;

  const handleRemove = () => {
    cartStore.updateQuantity(item.id, 0);
  };

  return (
    <div key={item.id} className="flex items-center gap-4 py-4 border-b last:border-b-0">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="flex-grow">
        <h3 className="font-medium text-lg">{item.name}</h3>
        <p className="text-gray-600">{formatPrice(item.price)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => cartStore.updateQuantity(item.id, item.quantity - 1)}
          disabled={isMinQuantity}
          className={`w-8 h-8 flex items-center justify-center border rounded-lg transition-colors duration-200
            ${isMinQuantity 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'hover:bg-gray-100 text-gray-700'}`}
        >
          -
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => cartStore.updateQuantity(item.id, item.quantity + 1)}
          disabled={isMaxQuantity}
          className={`w-8 h-8 flex items-center justify-center border rounded-lg transition-colors duration-200
            ${isMaxQuantity 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'hover:bg-gray-100 text-gray-700'}`}
        >
          +
        </button>
      </div>
      <div className="text-right min-w-[100px]">
        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
      </div>
      <button
        onClick={handleRemove}
        className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
});

export default CartItem;
