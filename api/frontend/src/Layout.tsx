import React from 'react';
import Footer from '../components/main/Footer';
import Nav from './main/Nav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
        <Nav />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;