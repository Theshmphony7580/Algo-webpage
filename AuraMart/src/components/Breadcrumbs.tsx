import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/" className="text-muted-foreground hover:text-primary transition-smooth flex items-center gap-1">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </motion.li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');

          return (
            <motion.li
              key={name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              {isLast ? (
                <span className="text-foreground font-medium" aria-current="page">{displayName}</span>
              ) : (
                <Link to={routeTo} className="text-muted-foreground hover:text-primary transition-smooth">
                  {displayName}
                </Link>
              )}
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
};
