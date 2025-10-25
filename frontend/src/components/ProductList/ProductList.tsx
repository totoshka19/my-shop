// --- НАЧАЛО ФАЙЛА: "frontend/src/components/ProductList/ProductList.tsx" ---
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../ProductCard/ProductCard';
import { BREAKPOINT_3XL, ITEMS_PER_PAGE_MD_UP, ITEMS_PER_PAGE_3XL_UP } from '../../constants';
import Pagination from '../Pagination/Pagination';
import { usePagination } from '../../hooks/usePagination';
import type { Product } from '../../types/types';
import SortOptions, { type SortOrder } from '../SortOptions/SortOptions';
import Spinner from '../Spinner/Spinner';
import { fetchProducts } from '../../services/api';

function ProductList() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  // Используем useQuery для загрузки данных
  const { data: products = [], isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
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

  if (isLoading) {
    return <div className="text-center py-8"><Spinner /></div>;
  }

  if (isError) {
    return <div className="text-center py-8 text-red-600">Failed to load products.</div>;
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
// --- КОНЕЦ ФАЙЛА: "frontend/src/components/ProductList/ProductList.tsx" ---
