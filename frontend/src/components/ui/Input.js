import clsx from "clsx";
import React, {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
} from "react";


const Input = (function Input(
  { label, type = "text", error = "", className = "", pre, ...props },
  ref
) {
  return (
    <div>
      <label>
        {label && (
          <div className="mb-2 font-sora font-medium text-gray-700">
            {label}
          </div>
        )}
        <div
          className={`flex group  items-center overflow-hidden  focus-within:border-brand-500 hover:shadow-xl focus-within:shadow-lg  active:border-brand-500 border-2 border-gray-400  duration-300 rounded-md ${
            !pre && "px-4 py-2.5"
          } ${
            error != "" &&
            "border-red-500 focus-within:border-red-500 active:border-red-500"
          }`}
        >
          {pre && (
            <div className="flex items-center justify-center text-gray-600 group-focus-within:bg-brand-800/20  group-focus-within:text-brand-900 group-focus-within:border-brand-500 bg-gray-300/75 h-10 w-10 border-r-2 border-gray-400 ">
              {pre}
            </div>
          )}
          <input
            autoComplete="off"
            className={clsx(
              {
                "px-4 py-2": pre,
              },
              "flex-1 bg-transparent focus:outline-none placeholder:text-gray-600 disabled:bg-gray-200 disabled:text-gray-600",
              className
            )}
            type={type}
            ref={ref}
            {...props}
          />
        </div>
        {error !== "" && <div className="mt-1 text-red-600">{error}</div>}
      </label>
    </div>
  );
});

export default forwardRef(Input);