import React from "react";

export default function FileInput({ name }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor={name}>
        Upload your {name}
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        id={name}
        name={name}
        type="file"
        multiple
      />
    </div>
  );
}
