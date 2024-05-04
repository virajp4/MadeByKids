import React from "react";

export default function Input({ name, label, value, handleChange, type = "text", placeholder = "", required = false }) {
  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
}
