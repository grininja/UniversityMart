import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik, useField } from "formik";
import * as Yup from "yup";



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

const SignUpUniversity = () => {
  return (
    <>
      <Formik
        initialValues={{
          UniversityName: "",
          email: "",
          password: "",
          confirmPassword: "",
          universityWebUrl: "",
          AffliationCode: "",
        }}
        validationSchema={Yup.object({
          University: Yup.string().required("Required"),
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
          universityWebUrl: Yup.string()
            .matches(
              "((https?)://)?(www.)?[a-z0-9]+(.[a-z]{2,}){1,3}(#?/?[a-zA-Z0-9#]+)*/?(?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$",
              "Enter correct url!"
            )
            .required("Please enter website"),
          AffliationCode: Yup.string().required(
            "Please enter university affliation code"
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
            label="UniversityName"
            name="UniversityName"
            type="text"
            placeholder="MNIT JAIPUR"
          />

          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />

          <MyTextInput
            label="University Website"
            name="universityWebUrl"
            type="url"
            placeholder="enter your website url"
          />

          <MyTextInput
            labeel="Address"
            name="Address"
            type="text"
            placeholder="Enter your Address"
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
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default SignUpUniversity;
