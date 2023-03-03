const Container = ({ children }) => {
  return (
    <div className="container mx-auto">
    <div className="flex flex-col items-center justify-center min-h-screen gap-y-4">
        {children}
    </div>
    </div>
  )
};

export default Container;
