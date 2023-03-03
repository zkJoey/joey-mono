const Container = ({ children }) => {
  return (
    <div className="items-center justify-center">
      <div className="flex flex-col min-h-screen items-center justify-center text-center gap-y-4 max-w-md mx-auto">
        {children}
      </div>
    </div>

  )
};

export default Container;
