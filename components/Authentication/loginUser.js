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

const LoginFormUser = () => {
  const [universityList, setUniversityList] = useState([
    "Mnit jaipur",
    "NIT TRICHY",
  ]);

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          university: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum."),
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
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />
          <MyUniversityDropdown
            label="University"
            name="University"
            universityList={universityList}
          />
          <MyTextInput
            label="Password"
            name="password"
            type="password"
            placeholder="enter your password"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default LoginFormUser;
