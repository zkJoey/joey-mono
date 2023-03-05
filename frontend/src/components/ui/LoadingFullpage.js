import React from 'react';

const LoadingFullpage = ({isLoading}) => {
  if(!isLoading) return (<></>);
  return (
    <div className="flex flex-col items-center justify-center h-screen z-50 bg-color-white">
      <img src="/Joey.svg" alt="Jumping Image" className="animate-bounce w-32 h-32" />
      <div className="text-2xl font-bold">Loading...</div>
    </div>
  );
};

export default LoadingFullpage;