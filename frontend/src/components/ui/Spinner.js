import clsx from "clsx";
import React from "react";


const Spinner = ({
  size = "sm",
  variant = "secondary",
  className = "",
}) => {
  return (
    <div
      className={clsx(
        {
          "border-brand-900 border-t-white": variant === "primary",
          "border-emerald-900/90 border-t-white": variant === "success",
          "border-yellow-500/25 border-t-yellow-400": variant === "warning",
          "border-red-500/25 border-t-red-500": variant === "danger",

          "h-4 w-4 border-[2px]": size === "xs",
          "h-5 w-5 border-2": size === "sm",
          "h-8 w-8 border-[3px]": size === "md",
          "h-10 w-10 border-2": size === "lg",
        },
        "rounded-full animate-spin ease-in-out ",
        className
      )}
    />
  );
};

export default Spinner;
