import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {BreadcrumbItem} from "../../types/types";

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const [productName, setProductName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductName = async () => {
      setError(null);
      if (pathnames[0] === 'product' && pathnames[1]) {
        try {
          const apiBase = import.meta.env.VITE_BACKEND_URL || '';
          const response = await fetch(`${apiBase}/api/products/${pathnames[1]}`);
          if (!response.ok) {
             setError('Failed to load product information.');
             return;
          }
          const product = await response.json();
          setProductName(product.name);
        } catch (error) {
          setError('An error occurred while loading product information.');
        }
      }
    };

    fetchProductName();
  }, [pathnames]);

  if (location.pathname === '/') {
    return null;
  }

  if (error) {
    return (
      <nav className="py-4">
        <div className="text-red-600 text-sm">{error}</div>
      </nav>
    );
  }

  if (pathnames[0] === 'product' && pathnames.length === 2) {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/' },
      { label: productName || 'Loading...', path: location.pathname },
    ];

    return (
      <nav className="py-4">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.path} className="flex items-center space-x-2">
              {index > 0 && <span className="text-gray-400">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-custom-taupe-dark font-medium">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  to={breadcrumb.path}
                  className="text-gray-500 hover:text-custom-taupe-dark"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  const breadcrumbs: BreadcrumbItem[] = pathnames.map((value, index) => {
    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
    const label = value.charAt(0).toUpperCase() + value.slice(1);
    return { label, path };
  });

  return (
    <nav className="py-4">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link to="/" className="text-gray-500 hover:text-custom-taupe-dark">
            Home
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path} className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            {index === breadcrumbs.length - 1 ? (
              <span className="text-custom-taupe-dark font-medium">
                {breadcrumb.label}
              </span>
            ) : (
              <Link
                to={breadcrumb.path}
                className="text-gray-500 hover:text-custom-taupe-dark"
              >
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
