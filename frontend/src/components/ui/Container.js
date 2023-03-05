import clsx from "clsx";


const Container = ({ children, className }) => {
  return (
    <div className={clsx("items-center justify-center")}>
      <div className={clsx("flex flex-col min-h-screen items-center justify-center text-center gap-y-4 max-w-md mx-auto", className)}>
        {children}
      </div>
    </div>

  )
};

export default Container;
