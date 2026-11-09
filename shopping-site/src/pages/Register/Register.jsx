//  import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import Navbar from "../../components/Navbar/Navbar";
// import { useAuth } from "../../context/AuthContext";

// const Register = () => {
//   const navigate = useNavigate();

//   const { register } = useAuth();

//   const [showPassword, setShowPassword] = useState(false);

//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setUserData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await register(userData);

//       alert("Registration Successful");

//       navigate("/login");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="container py-5">
//         <div className="row justify-content-center">
//           <div className="col-md-6 col-lg-5">
//             <div className="card shadow">

//               <div className="card-body p-4">

//                 <h2 className="text-center mb-4">

//                   Register

//                 </h2>

//                 <form onSubmit={handleSubmit}>

//                   <div className="mb-3">

//                     <label className="form-label">

//                       Name

//                     </label>

//                     <input
//                       type="text"
//                       name="name"
//                       className="form-control"
//                       placeholder="Enter your name"
//                       value={userData.name}
//                       onChange={handleChange}
//                       required
//                     />

//                   </div>

//                   <div className="mb-3">

//                     <label className="form-label">

//                       Email

//                     </label>

//                     <input
//                       type="email"
//                       name="email"
//                       className="form-control"
//                       placeholder="Enter your email"
//                       value={userData.email}
//                       onChange={handleChange}
//                       required
//                     />

//                   </div>

//                   <div className="mb-4">

//                     <label className="form-label">

//                       Password

//                     </label>

//                     <div className="input-group">

//                       <input
//                         type={
//                           showPassword
//                             ? "text"
//                             : "password"
//                         }
//                         name="password"
//                         className="form-control"
//                         placeholder="Enter password"
//                         value={userData.password}
//                         onChange={handleChange}
//                         required
//                       />

//                       <button
//                         type="button"
//                         className="btn btn-outline-secondary"
//                         onClick={() =>
//                           setShowPassword(!showPassword)
//                         }
//                       >
//                         <i
//                           className={`bi ${
//                             showPassword
//                               ? "bi-eye-slash"
//                               : "bi-eye"
//                           }`}
//                         ></i>
//                       </button>

//                     </div>

//                   </div>

//                   <button
//                     className="btn btn-dark w-100"
//                     type="submit"
//                   >
//                     Register
//                   </button>

//                 </form>

//                 <p className="text-center mt-4 mb-0">

//                   Already have an account?

//                   {" "}

//                   <Link to="/login">

//                     Login

//                   </Link>

//                 </p>

//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;
// -----------------------------------------------------


import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Validate email format and require .com
  const validateEmail = (email) => {
    const emailRegex =
      /^[A-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?\.)+com$/i;

    return emailRegex.test(email.trim());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Enter key for Name field
  const handleNameKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!e.currentTarget.checkValidity()) {
        e.currentTarget.reportValidity();
        return;
      }

      emailRef.current?.focus();
    }
  };

  // Handle Enter key for Email field
  const handleEmailKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const emailInput = e.currentTarget;

      if (!emailInput.value.trim()) {
        emailInput.reportValidity();
        return;
      }

      if (!emailInput.checkValidity()) {
        emailInput.reportValidity();
        return;
      }

      if (!validateEmail(emailInput.value)) {
        emailInput.setCustomValidity(
          "Please enter a valid email address ending with .com"
        );

        emailInput.reportValidity();
        return;
      }

      emailInput.setCustomValidity("");

      passwordRef.current?.focus();
    }
  };

  // Handle Enter key for Password field
  const handlePasswordKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!e.currentTarget.checkValidity()) {
        e.currentTarget.reportValidity();
        return;
      }

      e.currentTarget.form.requestSubmit();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailInput = emailRef.current;

    if (!validateEmail(userData.email)) {
      emailInput.setCustomValidity(
        "Please enter a valid email address ending with .com"
      );

      emailInput.reportValidity();
      return;
    }

    emailInput.setCustomValidity("");

    try {
      await register({
        ...userData,
        name: userData.name.trim(),
        email: userData.email.trim(),
      });

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow">
              <div className="card-body p-4">

                <h2 className="text-center mb-4">
                  Register
                </h2>

                <form onSubmit={handleSubmit}>

                  {/* Name Field */}
                  <div className="mb-3">
                    <label className="form-label">
                      Name  <span className="text-danger">*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name"
                      value={userData.name}
                      onChange={handleChange}
                      onKeyDown={handleNameKeyDown}
                      required
                      minLength={2}
                      pattern=".*\S.*"
                      title="Please enter a valid name with at least 2 characters."
                    />
                  </div>

                  {/* Email Field */}
                  <div className="mb-3">
                    <label className="form-label">
                      Email<span className="text-danger">*</span>
                    </label>

                    <input
                      ref={emailRef}
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={userData.email}
                      onChange={(e) => {
                        e.target.setCustomValidity("");
                        handleChange(e);
                      }}
                      onKeyDown={handleEmailKeyDown}
                      required
                      pattern=".+@.+\.com"
                      title="Please enter a valid email address ending with .com"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <label className="form-label">
                      Password <span className="text-danger">*</span>
                    </label>

                    <div className="input-group">
                      <input
                        ref={passwordRef}
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={userData.password}
                        onChange={handleChange}
                        onKeyDown={handlePasswordKeyDown}
                        required
                        minLength={8}
                        title="Password must contain at least 8 characters."
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        <i
                          className={`bi ${
                            showPassword
                              ? "bi-eye-slash"
                              : "bi-eye"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>

                  {/* Register Button */}
                  <button
                    className="btn btn-dark w-100"
                    type="submit"
                  >
                    Register
                  </button>

                </form>

                <p className="text-center mt-4 mb-0">
                  Already have an account?{" "}
                  <Link to="/login">
                    Login
                  </Link>
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
