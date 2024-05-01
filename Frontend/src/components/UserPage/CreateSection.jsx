import React from "react";
import { useState } from "react";

import Input from "../partials/Input";

export default function CreateSection({ handleSubmit }) {
  const [formData, setFormData] = useState({
    userName: "",
    userAddress: "",
    userRole: "",
    userEmail: "",
    userLang: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="grid gap-6 mb-6 grid-cols-1">
        <div>
          <label htmlFor="userRole" className="block mb-2 text-sm font-medium text-gray-900">
            Sign up as
          </label>
          <select
            required
            id="userRole"
            name="userRole"
            value={formData.userRole}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Select Account Type</option>
            <option value="GUARDIAN">Guardian</option>
            <option value="GUEST">Guest</option>
          </select>
        </div>
        <Input name="userName" label="Name" value={formData.userName} handleChange={handleChange} required={true} />
        <Input name="userAddress" label="Address" value={formData.userAddress} handleChange={handleChange} required={true} />
        <div>
          <label htmlFor="userLang" className="block mb-2 text-sm font-medium text-gray-900">
            Preferred Language
          </label>
          <select
            required
            id="userLang"
            name="userLang"
            value={formData.userLang}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Select Language</option>
            <option value="ENGLISH">English</option>
            <option value="TAMIL">Tamil</option>
          </select>
        </div>
        <Input name="userEmail" label="Email" value={formData.userEmail} handleChange={handleChange} />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Save
      </button>
    </>
  );
}
