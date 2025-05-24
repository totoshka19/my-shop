import { observer } from 'mobx-react-lite';
import { cartStore } from '../../store/cartStore';
import type { CartItem as CartItemType } from '../../store/cartStore';
import { formatPrice } from '../../utils';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = observer(({ item }: CartItemProps) => {
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
          className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100"
        >
          -
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => cartStore.updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100"
        >
          +
        </button>
      </div>
      <div className="text-right min-w-[100px]">
        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
      </div>
      <button
        onClick={() => cartStore.removeItem(item.id)}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
});

export default CartItem;
