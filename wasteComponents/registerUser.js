import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik, useField } from "formik";
import * as Yup from "yup";
import dbConnect from "@/lib/mongoDb";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyUniversityDropdown = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [universityList, setUniversityList] = useState(props.universityList);
  return (
    <>
      {/* {universityList}
       */}
      <label htmlFor={props.id || props.name}>{label}</label>
      <select className="option-select" name={props.name} {...field}>
        {universityList.map((university) => {
          <div>
            {/* {university} */}
            <option value="MNIT" label="MNIT">
              MNIT
            </option>
          </div>;
        })}
      </select>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const SignUpFormUser = () => {
  const [universityList, setUniversityList] = useState([
    "Mnit jaipur",
    "NIT TRICHY",
  ]);

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          university: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum."),

          confirmPassword: Yup.string().when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              "Both password need to be the same"
            ),
          }),
          University: Yup.string("University").required(
            "Please select a University"
          ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Jane"
          />

          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
          />

          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />
          <MyTextInput
            label="Password"
            name="password"
            type="password"
            placeholder="enter your password"
          />

          <MyTextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="confirm your password"
          />

          <MyUniversityDropdown
            label="University"
            name="University"
            universityList={universityList}
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default SignUpFormUser;
