import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, creditWalletAddress }) => {
  return (
    <>
      <Header creditWalletAddress={creditWalletAddress} />
      <div className="max-w-screen-xl ">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;