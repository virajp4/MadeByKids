import React from "react";
import { useState } from "react";
import OtpInput from "react-otp-input";

export default function RecieveOtp({ onVerifyOtp, formData, onFormChange, onChangeNumber }) {
  const [otp, setOtp] = useState("");

  const onChange = (value) => {
    onFormChange({
      target: {
        name: "userOtp",
        value,
      },
    });
    setOtp(value);
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={onVerifyOtp}>
      <div>
        <label htmlFor="userPhone" className="block mb-2 text-sm font-medium text-gray-900">
          Phone Number
        </label>
        <div class="flex items-center mt-2">
          <div class="flex-shrink-0 inline-flex items-center py-2.5 px-2.5 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:cursor-default">
            +91{" "}
          </div>
          <div class="relative w-full">
            <input
              type="number"
              name="userPhone"
              id="userPhone"
              aria-describedby="helper-text-explanation"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={formData["userPhone"]}
              required
              readOnly={true}
            />
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="otp" className="block mb-3 text-sm font-medium text-gray-900">
          Enter the OTP sent to +91 {formData["userPhone"]}
        </label>
        <div className="flex items-center justify-center w-full">
          <OtpInput
            value={otp}
            onChange={onChange}
            numInputs={4}
            inputType="text"
            renderInput={(props) => <input {...props} />}
            inputStyle="mx-0.5 p-1 w-12 h-12 text-center text-black font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 rounded outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            skipDefaultStyles={true}
          />
        </div>
        <div class="max-w-[260px] mx-auto mt-4">
          <button
            type="submit"
            disabled={otp.length !== 4}
            class={`w-full inline-flex justify-center whitespace-nowrap rounded-lg  px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 ${
              otp.length === 4 ? `hover:bg-indigo-600 bg-indigo-500` : `bg-indigo-400 cursor-not-allowed`
            } focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150`}
          >
            Verify OTP
          </button>
        </div>
        <div class="text-sm text-slate-500 mt-4 items-end">
          Didn't receive code?{" "}
          <a class="font-medium text-indigo-500 hover:text-indigo-600" href="#0">
            Resend
          </a>
        </div>
        <div class="text-sm text-slate-500 mt-4 items-end">
          Incorrect phone?{" "}
          <button class="font-medium text-indigo-500 hover:text-indigo-600" onClick={onChangeNumber}>
            Change Number
          </button>
        </div>
      </div>
    </form>
  );
}
