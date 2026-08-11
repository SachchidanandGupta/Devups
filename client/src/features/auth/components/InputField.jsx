import React from "react";
import { PiGreaterThanBold } from "react-icons/pi";
const InputField = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  define = null,
  name = null,
}) => {
  return (
    <div>
      <div className="flex justify-between font-sans">
        <label
          htmlFor={id}
          className="block text-sm  uppercase text-text-secondary mb-1"
        >
          {label}
        </label>
        {define ? (
          <span className="uppercase animate-pulse  text-accent text-sm">
            [{define}]
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="relative ">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          className={`block w-full pl-8 py-3 border text-accent placeholder-text-secondary focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 sm:text-sm    [&:-webkit-autofill]:border-accent
                [&:-webkit-autofill]:ring-2
              [&:-webkit-autofill]:ring-accent
                [&:-webkit-autofill]:[-webkit-text-fill-color:#00ff88]
                [&:-webkit-autofill]:shadow-[0_0_0_2px_#00ff88,inset_0_0_0_1000px_#0d0d0d]
${
  error ? "border-danger focus:ring-danger" : "border-border focus:ring-accent"
}`}
        />
        <div className="absolute left-1 top-3 text-accent  ">
          <PiGreaterThanBold size={20} />
        </div>
        {error && (
          <p className="mt-1.5 text-xs font-sans text-danger">{error}</p>
        )}
      </div>
    </div>
  );
};

export default InputField;
