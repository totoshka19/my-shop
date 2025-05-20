import React, { type ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className={`${styles.layoutContainer} bg-white text-gray-900 flex flex-col min-h-screen`}>
      <Header />
      <main className={`${styles.mainContent} flex-grow`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
