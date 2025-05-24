import { Link, useLocation } from 'react-router-dom';
import type { BreadcrumbItem } from "../../types/types";
import { observer } from 'mobx-react-lite';
import { breadcrumbStore } from '../../store/breadcrumbStore';

const Breadcrumbs = observer(() => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const { productName } = breadcrumbStore;

  if (location.pathname === '/') {
    return null;
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
});

export default Breadcrumbs;
