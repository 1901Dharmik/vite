import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { states } from "../../constant/mock";

const shippingSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  landmark: yup.string().required("Landmark is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  pincode: yup
    .string()
    .matches(/^\d{6}$/, "Must be exactly 6 digits")
    .required("Pincode is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Must be exactly 10 digits")
    .required("Phone number is required"),
});

const DeliveryDetailsForm = ({ user, formik }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Delivery Details
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="first_name"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {" "}
            First name{" "}
          </label>
          <input
            type="text"
            placeholder={user?.firstname}
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            defaultValue={user?.firstname}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            required
          />
          <div className="error">
            {formik.touched.firstName && formik.errors.firstName}
          </div>
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {" "}
            Last name{" "}
          </label>
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            defaultValue={user?.lastname}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            required
          />
          <div className="error">
            {formik.touched.lastName && formik.errors.lastName}
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="street-people"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Address (Area and Street)
          </label>
          <div className="mt-2">
            <input
              placeholder="Address(Area and Street)"
              name="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              autoComplete="street-people"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            />
            <div className="error">
              {formik.touched.address && formik.errors.address}
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="landmark"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {" "}
            Landmark *{" "}
          </label>
          <input
            type="text"
            placeholder="Landmark"
            name="landmark"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.landmark}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            required
          />
          <div className="error">
            {formik.touched.landmark && formik.errors.landmark}
          </div>
        </div>
        <div>
          <label
            htmlFor="City"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {" "}
            City *{" "}
          </label>
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            required
          />
          <div className="error">
            {formik.touched.city && formik.errors.city}
          </div>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2">
            <label
              htmlFor="select-country-input-3"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              {" "}
              Country *{" "}
            </label>
          </div>
          <select
            name="country"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          >
            <option value="" isabled selected>
              Select Country
            </option>
            <option value="IN">India</option>
          </select>
          <div className="error">
            {formik.touched.country && formik.errors.country}
          </div>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              {" "}
              State / Province *{" "}
            </label>
          </div>
          <select
            name="state"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.state}
            id="state"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          >
            <option value="" disabled selected>
              Select state
            </option>
            {states.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>

          <div className="error">
            {formik.touched.state && formik.errors.state}
          </div>
        </div>

        <div>
          <label
            htmlFor="Pincode"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {" "}
            Pincode{" "}
          </label>
          <input
            type="number"
            minLength={6}
            name="pincode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pincode}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="Pincode"
            required
          />
          <div className="error">
            {formik.touched.pincode && formik.errors.pincode}
          </div>
        </div>

        <div>
          <label
            htmlFor="Phone"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {" "}
            Phone No{" "}
          </label>
          <input
            type="number"
            name="phone"
            minLength={10}
            maxLength={10}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="phone no"
            required
          />
          <div className="error">
            {formik.touched.phone && formik.errors.phone}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetailsForm;
