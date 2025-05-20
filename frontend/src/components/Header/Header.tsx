import styles from '../Layout/Layout.module.css';
import Button from '../Button/Button';
import { observer } from 'mobx-react-lite';
import { cartStore } from '../../store/cartStore';

function Header() {
  const handleCartClick = () => {
    // Cart page navigation logic
    console.log('Navigate to cart');
  };

  return (
    <header className="bg-custom-taupe-dark text-custom-pink-extra-light py-4 w-full shadow-md">
      <div className={styles.container + " flex justify-between items-center"}>
        <h1 className="text-2xl font-bold">My Shop</h1>
        <div className="relative">
          <Button 
            onClick={handleCartClick}
            className="flex items-center gap-2 bg-custom-pink-light hover:bg-custom-pink-extra-light text-custom-taupe-dark"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
          </Button>
          {cartStore.totalItems > 0 && (
            <span className="absolute -top-1 -right-2 bg-white border border-gray-300 text-custom-taupe-dark text-sm font-medium rounded-full h-6 w-6 flex items-center justify-center leading-none">
              {cartStore.totalItems}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

export default observer(Header);
