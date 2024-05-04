import React from "react";
import { Datepicker } from "flowbite-react";

import Input from "../partials/Input";

function get18YearsAgo() {
  let d = new Date();
  d.setFullYear(d.getFullYear() - 18);
  d = d.toISOString().split("T")[0];
  d = d.split("-")[0];
  return d;
}

export default function Details1({ handleSubmit, handleChange, data }) {
  return (
    <>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <Input name="childName" label="Name" placeholder="John" value={data.childName} handleChange={handleChange} required />
        <div>
          <label htmlFor="childDOB" className="block mb-2 text-sm font-medium text-gray-900">
            Date of Birth
          </label>
          <Datepicker
            id="childDOB"
            name="childDOB"
            onSelectedDateChanged={(date) => handleChange(date, true)}
            defaultDate={new Date(get18YearsAgo(), 0, 1)}
          />
        </div>
        <div>
          <label htmlFor="childGender" className="block mb-2 text-sm font-medium text-gray-900">
            Gender
          </label>
          <select
            required
            id="childGender"
            name="childGender"
            value={data.childGender}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="PREFER NOT TO SAY">Prefer not to say</option>
          </select>
        </div>
        <div>
          <label htmlFor="childClass" className="block mb-2 text-sm font-medium text-gray-900">
            Class
          </label>
          <select
            required
            id="childClass"
            name="childClass"
            value={data.childClass}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Select Class</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <option key={i} value={i} defaultValue={data.childClass == i + 1}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="childSchool" className="block mb-2 text-sm font-medium text-gray-900">
            School
          </label>
          <select
            required
            id="childSchool"
            name="childSchool"
            value={data.childSchool}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="" defaultValue={data.childSchool}>
              Select School
            </option>
            <option value="A">ABC School</option>
            <option value="B">BCD School</option>
            <option value="C">CDE School</option>
          </select>
        </div>
        <Input name="location" label="Location" placeholder="Chennai" value={data.location} handleChange={handleChange} required />
        <div>
          <label htmlFor="childRequireSponsor" className="block mb-2 text-sm font-medium text-gray-900">
            Are you looking for sponsorships?
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <input
                required
                checked={data.childRequireSponsor === "YES"}
                id="sponsorshipY"
                type="radio"
                value="YES"
                name="childRequireSponsor"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                onChange={handleChange}
              />
              <label htmlFor="sponsorshipY" className="ms-2 text-sm font-medium text-gray-900">
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                required
                checked={data.childRequireSponsor === "NO"}
                id="sponsorshipN"
                type="radio"
                value="NO"
                name="childRequireSponsor"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                onChange={handleChange}
              />
              <label htmlFor="sponsorshipN" className="ms-2 text-sm font-medium text-gray-900">
                No
              </label>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Next
      </button>
    </>
  );
}
