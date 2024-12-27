import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import triggerNotification from "../components/Toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/users/userSlice";
const loginSchema = yup.object({
  email: yup.string().required().email(" Email Should Be req"),
  password: yup.string().required("Required Password"),
});
export default function Login() {
  const despatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, isError, isSuccess } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isSuccess) {
      navigate(location.state?.from || "/");
      window.location.reload();
      triggerNotification("success", "Login Successfully");
    }
  }, [isSuccess, navigate, location]);

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      despatch(loginUser(values));

      // navigate("/");

      // setTimeout(() => {
      //   window.location.reload();
      //   // triggerNotification("success", "User Logged in Successfully");
      // },300)
    },
  });
  useEffect(() => {
    if (isSuccess) {
      navigate(location.state?.from || "/");
    }
  }, [isSuccess]);

  // const handleGoogleLogin = () => {
  //   // Encode current path for redirect
  //   const currentPath = window.location.pathname;
  //   const encodedRedirect = encodeURIComponent(currentPath);

  //   // Redirect to Google OAuth
  //   window.location.href = `http://localhost:8000/api/auth/google?redirect=${encodedRedirect}`;
  // };
  const handleLogin = () => {
    window.location.href = 'http://localhost:8000/auth/google';
  };
  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Flowbite
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action=""
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <CustomInput
                    type="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Email"
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    value={formik.values.email}
                    required
                  />
                  <div className="text-red-600">
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <CustomInput
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    value={formik.values.password}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                  <div className="text-red-600">
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-danger">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <CustomInput
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                {isError && (
                  <div className="text-red-600 bg-red-100 border border-red-400 rounded p-2">
                    Login failed. Please check your credentials and try again.
                  </div>
                )}
                <button
                  type="submit"
                  //  disabled={isLoading}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login {/* {isLoading ? 'Login in...' : 'Login in'} */}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
       
           
          </div>
        </div>
             <button onClick={handleLogin}>Login with Google</button>
        {/* <div class="section">
              <a href="/auth/google" class="btn red darken-1">
                <i class="fab fa-google left"></i> Log In With Google
              </a>
            </div> */}
      </section>
    </>
  );
}
