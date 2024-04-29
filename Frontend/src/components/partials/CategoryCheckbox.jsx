import React from "react";

const categories = ["Embroidery", "Decor", "Gifts", "Jewellery", "Books", "Crafts", "Fashion", "Music", "Clothing", "Sports", "Crafts"];

function CheckboxItems({ name, id }) {
  return (
    <li>
      <div className="flex items-center p-2 rounded hover:bg-gray-200 ">
        <input
          id={`checkbox-item-${id}`}
          type="checkbox"
          value=""
          className="w-4 h-4 text-blue-600 bg-gray-300 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor={`checkbox-item-${id}`} className="w-full ms-2 text-sm font-medium text-gray-900 rounded">
          {name}
        </label>
      </div>
    </li>
  );
}

export default function CategoryCheckbox() {
  return (
    <div>
      {categories.map((c, idx) => (
        <CheckboxItems key={idx} id={idx} name={c} />
      ))}
    </div>
  );
}
