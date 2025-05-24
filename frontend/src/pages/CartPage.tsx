import { observer } from 'mobx-react-lite';
import { cartStore } from '../store/cartStore';
import CartItem from '../components/CartItem/CartItem';

const CartPage = observer(() => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cart</h1>

      {cartStore.totalItems === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          {cartStore.cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
});

export default CartPage;
