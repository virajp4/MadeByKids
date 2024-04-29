import React from "react";
import { useState } from "react";
import { Datepicker } from "flowbite-react";

export default function Details1({ handleSubmit, inputData }) {
  const [data, setData] = useState(inputData);

  function submitForm(e) {
    e.preventDefault();
    handleSubmit(data);
  }

  function handleChange(e, isDate = false) {
    if (isDate) {
      setData({ ...data, dob: e });
      return;
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  }

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-semibold text-gray-900">Add Talent Details</h1>
      <div>
        <form onSubmit={submitForm}>
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
              <Datepicker id="dob" name="dob" onSelectedDateChanged={(date) => handleChange(date, true)} required />
            </div>
            <div>
              <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">
                Gender
              </label>
              <select
                required
                id="gender"
                name="gender"
                defaultValue={data.gender}
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
                    checked={data.sponsorship === "Y"}
                    id="sponsorshipY"
                    type="radio"
                    value="Y"
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
                    checked={data.sponsorship === "N"}
                    id="sponsorshipN"
                    type="radio"
                    value="N"
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
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                required
              />
            </div>
            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">
              I agree with the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                terms and conditions
              </a>
              .
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
