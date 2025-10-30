import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilEnvelopeOpen } from "@coreui/icons";

const EmailVerification = () => {
  const navigate = useNavigate();

  const handleResendEmail = async () => {
    const email = sessionStorage.getItem("email");

    if (!email) {
      toast.error("Email not found. Please register again.");
      navigate("/register");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Verification email resent successfully!");
      } else {
        toast.error(data.message || "Failed to resend verification email.");
      }
    } catch (error) {
      console.error("Error resending email:", error);
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4 shadow-sm border-0">
              <CCardBody className="p-4 text-center">
                {/* Email Verification Icon */}
                <div className="mb-3">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10 p-3">
                    <CIcon icon={cilEnvelopeOpen} size="xl" className="text-success" />
                  </div>
                </div>

                {/* Title */}
                <h4 className="mb-2">Please verify your email</h4>
                <p className="text-body-secondary mb-4">
                  You're almost there! We sent an email to <br />{" "}
                  <strong>{sessionStorage.getItem("email") || "your email"}</strong>.
                  <br /><br />
                  Just click on the link in that email to complete your signup. If you don't
                  <br />see it, you may need to <b>check your spam</b> folder.
                  <br /><br />
                  Still can't find the email? No problem.
                </p>

                {/* Resend Email Button */}
                <div className="d-grid mb-3">
                  <CButton color="primary" onClick={handleResendEmail}>
                    Resend Verification Email
                  </CButton>
                </div>
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

export default EmailVerification;
