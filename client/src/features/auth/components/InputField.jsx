import React from 'react'

const InputField = ({ label, id, type, placeholder, value, onChange, error }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`block w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 sm:text-sm ${
          error ? "border-red-300 focus:ring-red-500" : "border-slate-200 focus:ring-teal-500"
        }`}
      />
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

export default InputField