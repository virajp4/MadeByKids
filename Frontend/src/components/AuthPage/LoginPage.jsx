import React from "react";

export default function LoginPage() {
  return (
    <section class="bg-gray-50">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-7 md:p-8 space-y-4 md:space-y-6">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Sign in to your account</h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phno"
                  id="phno"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="+91 1234567890"
                  required=""
                />
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900">
                  Password Pin
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required=""
                    />
                  </div>
                  <div class="ml-1.5">
                    <label for="remember" class="text-gray-500 text-[12.5px] md:text-sm flex justify-center items-center">
                      Remember me
                    </label>
                  </div>
                </div>
                <a href="#" class="text-[12.5px] md:text-sm font-medium text-primary-600 hover:underline flex justify-center items-center">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p class="text-sm font-light text-gray-500">
                Don’t have an account yet?{" "}
                <a href="#" class="font-medium text-primary-600 hover:underline">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
