import ProductList from '../components/ProductList/ProductList';
import styles from '../components/Layout/Layout.module.css';

function HomePage() {
  return (
    <div className={`${styles.container} py-12`}>
      <h1 className="text-3xl font-bold mb-6">Welcome to My Shop</h1>
      <ProductList />
    </div>
  );
}

export default HomePage;
