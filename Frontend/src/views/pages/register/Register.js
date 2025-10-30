import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormLabel,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { RegistrationSchema } from "../../../schema";
import logo from "../../../assets/images/logo.png"
import { useFormik } from "formik";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const formData = {
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: RegistrationSchema,
    onSubmit: async (values, { resetForm }) => {

      try {
        const response = await fetch("http://localhost:5000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyName: values.companyName,
            email: values.email,
            password: values.password,
          }),
        });
        const data = await response.json();

        if (response.ok) {
          toast.success("Registration successful!");
          setTimeout(() => navigate("/verify-email"), 2000);
        } else {
          if (data.message === "User already exists" ||
            data.message === "Email already registered") {
            toast.error(
              <>
                Users already exist, use another email or{" "}
                <span
                  onClick={() => navigate("/")}
                  style={{
                    color: "#007bff",
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  log in
                </span>.
              </>,
              { autoClose: false } // Keeps toast visible until user closes
            );
          } else {
            toast.error(data.message || "Registration failed!");
          }
          resetForm({ values: formData });
        }
      } catch (error) {
        toast.error("Server error. Please try again later.");
        setTimeout(() => navigate("/verify-email"), 2000);
        console.error("Registration error:", error);
      }
    },
  });

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4 shadow-sm">
              <CCardBody className="p-4">
                <CForm onSubmit={formik.handleSubmit}>

                  <div className="text-center mb-3">
                    <img
                      src="/images/logo.png"
                      alt="logo"
                      width="90"
                      className="d-block mx-auto mb-2"
                      style={{ objectFit: "contain" }}
                    />
                    <p className="text-body-secondary mb-0">Loan Management System</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mb-4">
                    <div style={{ flex: 1, height: "1px", backgroundColor: "#000" }}></div>
                    <h5 className="text-center mx-3 mb-0" style={{ whiteSpace: "nowrap" }}>
                      Register
                    </h5>
                    <div style={{ flex: 1, height: "1px", backgroundColor: "#000" }}></div>
                  </div>

                  <CInputGroup className="mb-3 flex-column align-items-start">
                    <CFormLabel>Enter company name</CFormLabel>
                    <div className="d-flex w-100">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Enter companyname"
                        name="companyName"
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        autoComplete="companyName"
                      />
                    </div>
                    {formik.errors.companyName && <div className="text-danger">{formik.errors.companyName}</div>}
                  </CInputGroup>

                  <CInputGroup className="mb-3 flex-column align-items-start">
                    <CFormLabel>Enter email address</CFormLabel>
                    <div className="d-flex w-100">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        autoComplete="email"
                      />
                    </div>
                    {formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
                  </CInputGroup>

                  <CInputGroup className="mb-3 flex-column align-items-start">
                    <CFormLabel>Enter password</CFormLabel>
                    <div className="d-flex w-100">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        autoComplete="new-password"
                      />
                    </div>
                    <i
                      className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute`}
                      style={{ top: "38px", right: "10px", cursor: "pointer", fontSize: "1.1rem" }}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                    {formik.errors.password && <div className="text-danger">{formik.errors.password}</div>}
                  </CInputGroup>

                  <CInputGroup className="mb-4 flex-column align-items-start">
                    <CFormLabel>Confirm password</CFormLabel>
                    <div className="d-flex w-100">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        autoComplete="new-password"
                      />
                    </div>
                    <i
                      className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"} position-absolute`}
                      style={{ top: "38px", right: "10px", cursor: "pointer", fontSize: "1.1rem" }}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    ></i>
                    {formik.errors.confirmPassword && <div className="text-danger">{formik.errors.confirmPassword}</div>}
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton color="dark" type="submit">
                      Create an account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Register;
