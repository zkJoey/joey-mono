import { useEffect, useState } from "react";
import React from "react";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";


const ExampleComponent = () => {
  return (
    <div className="flex flex-col space-y-4">
    <div className="grid grid-cols-4 gap-4">
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Circle Balance
        </p>
        <p className="mt-2 text-lg font-bold text-gray-900 font-mono">$15,123.00</p>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Stripe Revenue
        </p>
        <p className="mt-2 text-lg font-bold text-gray-900 font-mono">N/A</p>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Spectral Score
        </p>
        <p className="mt-2 text-lg font-bold text-gray-900 font-mono">555</p>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Interest Rate
        </p>
        <p className="mt-2 text-lg font-bold text-gray-900 font-mono">4.6%</p>
      </div>
    </div>
    <div className="text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Credit Limit
        </p>
        <p className="mt-2 text-lg font-bold text-gray-900 font-mono">$1,000</p>
      </div>
    </div>
  );
};



const CreditInfo = ({ creditWalletAddress }) => {
  // creditStatus ={
  //     "creditLimit": 300000000,
  //     "intervalInDays": 30,
  //     "remainingPeriods": 12,
  //     "aprInBps": 0
  // }
  return (
    <div className="container mx-auto">
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold pb-8">Your credit line</h1>
        <ExampleComponent />
      </div>
      <Link to="/multisig">
      <Button type="button" variant="primary">Borrow</Button>
      </Link>
      <div className="border border-black border-dashed rounded-lg w-3/10 p-4 text-center">
        <p>Your borrower require collateral from your guarantor.</p>
      </div>
    </div>
  </div>
  
  
  
  
  

  );
};

export default CreditInfo;
