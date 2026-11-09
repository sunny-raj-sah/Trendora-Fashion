// import { useState } from "react";
// import { Link,  useNavigate } from "react-router-dom";

// import Navbar from "../../components/Navbar/Navbar";
// import { useAuth } from "../../context/AuthContext";

// const Login = () => {
//     const navigate = useNavigate();

// const {
//   login,
//   state: authState,
// } = useAuth();

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setLoginData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//    const handleSubmit = async (e) => {

//   e.preventDefault();

//   const result = await login(loginData);

//   if (result.success) {

//     navigate("/");

//   } else {

//     alert(result.message);

//   }

// };

//   return (
//     <>
//       <Navbar />

//       <div className="container py-5">

//         <div className="row justify-content-center">

//           <div className="col-md-6 col-lg-5">

//             <div className="card shadow">

//               <div className="card-body p-4">

//                 <h2 className="text-center mb-4">

//                   Login

//                 </h2>

//                 <form onSubmit={handleSubmit}>

//                   <div className="mb-3">

//                     <label className="form-label">

//                       Email

//                     </label>

//                     <input
//                       type="email"
//                       name="email"
//                       className="form-control"
//                       placeholder="Enter your email"
//                       value={loginData.email}
//                       onChange={handleChange}
//                       required
//                     />

//                   </div>

//                   <div className="mb-3">

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
//                         value={loginData.password}
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


//                        {
//   authState.error && (

//     <div className="alert alert-danger">

//       {authState.error}

//     </div>

//   )
// }

//                   <button
//   className="btn btn-dark w-100"
//   type="submit"
//   disabled={authState.loading}
// >

//   {
//     authState.loading
//       ? "Logging In..."
//       : "Login"
//   }

// </button>

//                 </form>

//                 <p className="text-center mt-4 mb-0">

//                   Don't have an account?

//                   {" "}

//                   <Link to="/register">

//                     Register

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

// export default Login;

// ------------------------------------------------


import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const {
    login,
    state: authState,
  } = useAuth();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const passwordRef = useRef(null);

  // Validate email format and require .com
  const validateEmail = (email) => {
    const emailRegex =
      /^[A-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?\.)+com$/i;

    return emailRegex.test(email.trim());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(loginData.email)) {
      const emailInput = e.currentTarget.querySelector(
        'input[name="email"]'
      );

      emailInput.setCustomValidity(
        emailInput.value.includes("@")
          ? "Please enter a valid email address ending with .com"
          : ""
      );

      emailInput.reportValidity();
      return;
    }

    const result = await login({
      ...loginData,
      email: loginData.email.trim(),
    });

    if (result.success) {
      navigate("/");
    } else {
      alert(result.message);
    }
  };

  // Handle Enter key in the email field
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

      // Move focus only when email is valid
      passwordRef.current?.focus();
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
                  Login
                </h2>

                <form onSubmit={handleSubmit}>

                  {/* Email Field */}
                  <div className="mb-3">
                    <label className="form-label">
                      Email<span className="text-danger">*</span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={loginData.email}
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
                  <div className="mb-3">
                    <label className="form-label">
                      Password<span className="text-danger">*</span>
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
                        value={loginData.password}
                        onChange={handleChange}
                        required
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

                  {/* Authentication Error */}
                  {authState.error && (
                    <div className="alert alert-danger">
                      {authState.error}
                    </div>
                  )}

                  {/* Login Button */}
                  <button
                    className="btn btn-dark w-100"
                    type="submit"
                    disabled={authState.loading}
                  >
                    {authState.loading
                      ? "Logging In..."
                      : "Login"}
                  </button>

                </form>

                <p className="text-center mt-4 mb-0">
                  Don't have an account?{" "}
                  <Link to="/register">
                    Register
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

export default Login;
