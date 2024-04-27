import { Form, Link, useActionData, useSearchParams, useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";

import EnterNumber from "./EnterNumber";
import RecieveOtp from "./RecieveOtp";

export default function AuthSection() {
  const data = useActionData();
  const navigation = useNavigation();
  const [otpState, setOtpState] = useState(-1);

  const [formData, setFormData] = useState({
    userPhone: "",
    userPassword: "",
    userOtp: "",
  });

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  const onFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "userPhone" && value.length > 10) setFormData({ ...formData, [name]: value.slice(0, 10) });
    else if (name === "userPassword" && value.length > 6) setFormData({ ...formData, [name]: value.slice(0, 6) });
    else setFormData({ ...formData, [name]: value });
  };

  const onSendOtp = (e) => {
    e.preventDefault();
    const { userPhone } = formData;
    if (userPhone.length !== 10) return;
    console.log("OTP Sent");
    setOtpState(0);
  };

  const handleChangeNumber = () => {
    setOtpState(-1);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const otp = formData.userOtp;
    if (formData.userOtp.length !== 4) return;
    if (otp === "1234") {
      console.log("Correct OTP");
      setOtpState(1);
    } else {
      console.log("Invalid OTP");
      setOtpState(0);
    }
  };

  useEffect(() => {
    setOtpState(-1);
  }, [isLogin]);

  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-7 md:p-8 space-y-4 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                {isLogin ? `Sign in to your account` : `Register your account`}
              </h1>
              {!isLogin && otpState < 0 && <EnterNumber handleSendOtp={onSendOtp} handleFormChange={onFormChange} formData={formData} />}
              {!isLogin && otpState === 0 && (
                <RecieveOtp onVerifyOtp={handleVerifyOtp} formData={formData} onFormChange={onFormChange} onChangeNumber={handleChangeNumber} />
              )}
              {(isLogin || otpState > 0) && (
                <Form className="space-y-4 md:space-y-6" method="post">
                  <div>
                    <label htmlFor="userPhone" className="block mb-2 text-sm font-medium text-gray-900">
                      Phone Number
                    </label>
                    <div class="flex items-center mt-2">
                      <div class="flex-shrink-0 inline-flex items-center py-2.5 px-3 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:cursor-default">
                        +91{" "}
                      </div>
                      <div class="relative w-full">
                        <input
                          type="number"
                          name="userPhone"
                          id="userPhone"
                          aria-describedby="helper-text-explanation"
                          class={`block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 
                            ${!isLogin ? `cursor-not-allowed` : ``}`}
                          placeholder="1234567890"
                          value={formData["userPhone"]}
                          onChange={onFormChange}
                          required
                          readOnly={!isLogin}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="userPassword" className="block mb-2 text-sm font-medium text-gray-900">
                      Pin
                    </label>
                    <input
                      type="password"
                      name="userPassword"
                      id="userPassword"
                      placeholder="••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                      value={formData["userPassword"]}
                      onChange={onFormChange}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                        />
                      </div>
                      <div className="ml-1.5">
                        <label htmlFor="remember" className="text-gray-500 text-[12.5px] md:text-sm flex justify-center items-center">
                          Remember me
                        </label>
                      </div>
                    </div>
                    {isLogin && (
                      <a
                        href="/forgot"
                        className="text-[12.5px] md:text-sm font-medium text-primary-600 hover:underline flex justify-center items-center"
                      >
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    {isLogin ? (isSubmitting ? `Logging In...` : `Login`) : isSubmitting ? `Registering...` : `Register`}
                  </button>
                  <button className="text-sm font-light text-gray-500">
                    {isLogin ? `Don’t have an account yet?` : `Already have an account?`}{" "}
                    <Link to={isLogin ? `/auth?mode=register` : `/auth?mode=login`} className="font-medium text-blue-600 hover:underline">
                      {isLogin ? `Register` : `Login`}
                    </Link>
                  </button>
                </Form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
