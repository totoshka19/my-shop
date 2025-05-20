import { useState, useEffect, useMemo } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { BREAKPOINT_3XL, ITEMS_PER_PAGE_MD_UP, ITEMS_PER_PAGE_3XL_UP } from '../../constants';
import Pagination from '../Pagination/Pagination';
import { usePagination } from '../../hooks/usePagination';
import type { Product } from '../../types/types';
import SortOptions, { type SortOrder } from '../SortOptions/SortOptions';

function ProductList() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this effect runs only once on mount and cleans up on unmount

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Fetching products failed:", error);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const itemsPerPage = screenWidth < BREAKPOINT_3XL ? ITEMS_PER_PAGE_MD_UP : ITEMS_PER_PAGE_3XL_UP;

  const sortedProducts = useMemo(() => {
    let sortableProducts = [...products];
    if (sortOrder === 'asc') {
      sortableProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      sortableProducts.sort((a, b) => b.price - a.price);
    }
    return sortableProducts;
  }, [sortOrder, products]);

  const {
    currentPage,
    totalPages,
    setPage,
    getPageItems,
  } = usePagination({
    totalItems: sortedProducts.length,
    itemsPerPage: itemsPerPage,
  });

  const currentProducts = getPageItems(sortedProducts);

  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order);
    setPage(1); // Reset to first page on sort change
  };

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Product List</h2>
      <SortOptions onSortChange={handleSortChange} currentSort={sortOrder} />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl_custom:grid-cols-3 3xl:grid-cols-4 gap-6">
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product as Product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage!}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

export default ProductList;
