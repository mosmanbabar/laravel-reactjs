import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";

import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    if (!password) {
      toast.error("Please enter password.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!confirmPassword) {
      toast.error("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!isRegistering) {
      setIsRegistering(true);
      toast.success("registered successfully");
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        navigate("/login");
        const data = {
          email: email,
          password: password,
        };
        localStorage.setItem("userData", JSON.stringify(data));
      } catch (error) {
        setIsRegistering(false);
        console.error("Registration error:", error);
        toast.error("n error occurred during registration. Please try again.");
      }
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <div className="container">
        <div className="d-flex mt-lg-5 justify-content-center align-items-center">
          <div className="form p-5">
            <div className="text-center ">
              <div className="mt-3">
                <h2 className="">Register</h2>
              </div>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="mt-3">
                <div>
                  <label className="">Email</label>
                </div>

                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="w-100"
                />
              </div>

              <div className="mt-3">
                <div>
                  <label className="">Password</label>
                </div>
                <input
                  disabled={isRegistering}
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="w-100"
                />
              </div>

              <div className="mt-3">
                <div>
                  <label className="">Confirm Password</label>
                </div>
                <input
                  disabled={isRegistering}
                  type="password"
                  autoComplete="off"
                  value={confirmPassword}
                  onChange={(e) => {
                    setconfirmPassword(e.target.value);
                  }}
                  className="w-100"
                />
              </div>

              <div className="d-flex mt-3 justify-content-center align-items-center">
                <button type="submit" disabled={isRegistering} className="w-50">
                  {isRegistering ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
              <div className="text-sm text-center">
                Already have an account? {"   "}
                <Link
                  to={"/login"}
                  className="text-center text-sm hover:underline font-bold"
                >
                  Continue
                </Link>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
