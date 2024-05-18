import React from "react";

import FileInput from "../partials/FileInput";

export default function Details2({ handleChange, data, handleBack, isNew }) {
  return (
    <>
      <div className="grid gap-6 mb-6 md:grid-cols-1">
        <div>
          <label htmlFor="skills" className="block mb-2 text-sm font-medium text-gray-900">
            Skills <span className="text-[11.5px]">(comma seperated)</span>
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Handicraft, Singing, Dancing"
            value={data.skills}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="childWriteUp" className="block mb-2 text-sm font-medium text-gray-900">
            Add a write-up
          </label>
          <textarea
            id="childWriteUp"
            name="childWriteUp"
            rows="4"
            value={data.childWriteUp}
            onChange={handleChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write a little bit about yourself..."
          ></textarea>
        </div>
      </div>
      <div className="grid gap-6 mb-6 grid-cols-1">
        <FileInput name="images" />
        <FileInput name="videos" />
        <FileInput name="certificates" />
      </div>
      {isNew && (
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
      )}
    </>
  );
}
