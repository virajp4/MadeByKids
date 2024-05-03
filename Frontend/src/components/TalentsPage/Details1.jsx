import React from "react";
import { Datepicker } from "flowbite-react";

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
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="John"
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900">
            Date of Birth
          </label>
          <Datepicker id="dob" name="dob" onSelectedDateChanged={(date) => handleChange(date, true)} defaultDate={new Date(get18YearsAgo(), 0, 1)} />
        </div>
        <div>
          <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">
            Gender
          </label>
          <select
            required
            id="gender"
            name="gender"
            value={data.gender}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Prefer not to say</option>
          </select>
        </div>
        <div>
          <label htmlFor="class" className="block mb-2 text-sm font-medium text-gray-900">
            Class
          </label>
          <select
            required
            id="class"
            name="class"
            value={data.class}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Select Class</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <option key={i} value={i} defaultValue={data.class == i + 1}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="school" className="block mb-2 text-sm font-medium text-gray-900">
            School
          </label>
          <select
            required
            id="school"
            name="school"
            value={data.school}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="" defaultValue={data.school}>
              Select School
            </option>
            <option value="A">ABC School</option>
            <option value="B">BCD School</option>
            <option value="C">CDE School</option>
          </select>
        </div>
        <div>
          <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">
            Location
          </label>
          <input
            required
            type="location"
            id="location"
            name="location"
            value={data.location}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Chennai"
          />
        </div>
        <div>
          <label htmlFor="sponsorship" className="block mb-2 text-sm font-medium text-gray-900">
            Are you looking for sponsorships?
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <input
                required
                checked={data.sponsorship === "YES"}
                id="sponsorshipY"
                type="radio"
                value="YES"
                name="sponsorship"
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
                checked={data.sponsorship === "NO"}
                id="sponsorshipN"
                type="radio"
                value="NO"
                name="sponsorship"
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
