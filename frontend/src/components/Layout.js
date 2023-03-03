import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, creditWalletAddress }) => {
  return (
    <>
      <Header creditWalletAddress={creditWalletAddress} />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;