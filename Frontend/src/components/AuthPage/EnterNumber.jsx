import React from "react";

export default function EnterNumber({ handleSendOtp, handleFormChange, formData }) {
  return (
    <form className="space-y-3 md:space-y-6" onSubmit={handleSendOtp}>
      <div>
        <label htmlFor="userPhone" className="block mb-2 text-sm font-medium text-gray-900">
          Phone Number
        </label>
        <div class="flex items-center mt-2">
          <div class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:cursor-default">
            +91{" "}
          </div>
          <div class="relative w-full">
            <input
              type="number"
              name="userPhone"
              id="userPhone"
              aria-describedby="helper-text-explanation"
              class="block py-2.5 px-2 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="1234567890"
              value={formData["userPhone"]}
              onChange={handleFormChange}
              required
            />
          </div>
        </div>
      </div>
      <div class="mx-auto mt-4">
        <button
          type="submit"
          class="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
        >
          Recieve OTP
        </button>
      </div>
    </form>
  );
}
