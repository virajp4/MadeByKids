import { Form, Link, useActionData, useSearchParams, useNavigation } from "react-router-dom";

export default function AuthSection() {
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-7 md:p-8 space-y-4 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                {isLogin ? `Sign in to your account` : `Register your account`}
              </h1>
              {data && data.errors && (
                <ul>
                  {Object.values(data.errors).map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              )}
              <Form className="space-y-4 md:space-y-6" method="post">
                <div>
                  <label htmlFor="userPhone" className="block mb-2 text-sm font-medium text-gray-900">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="userPhone"
                    id="userPhone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="+91 1234567890"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="userPassword" className="block mb-2 text-sm font-medium text-gray-900">
                    Password Pin
                  </label>
                  <input
                    type="password"
                    name="userPassword"
                    id="userPassword"
                    placeholder="••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
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
                  <Link to={isLogin ? `/auth?mode=register` : `/auth?mode=login`} className="font-medium text-primary-600 hover:underline">
                    {isLogin ? `Register` : `Login`}
                  </Link>
                </button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
