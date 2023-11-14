import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./../authentication.module.css"; // Import styles from the CSS module
import validateEmail from "../../../util/emailValidator";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async (user, setError) => {
    try {
      const res = await fetch("http://localhost:7000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json(); // Log the response body
        // throw new Error(`${errorData.message}`);
        console.log(errorData);
        throw new Error(`${errorData.message}`);
      }

      const data = await res.json();
      console.log(data);
      if (data.status === "success") return data;
      else throw new Error(`${data}`);
    } catch (err) {
      // console.log(err);
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (!isTermsAccepted) {
      setError("Please accept terms and conditions");
      return;
    }
    if (!validateEmail(username)) {
      setError("Enter a valid Email");
      return;
    }
    if (password.length < 6) {
      setError("Password length should be at least 6");
      return;
    }

    const user = {
      email: username,
      password,
    };

    // Send data to the backend
    const data = await handleLogin(user, setError);
    if (data) {
      setError("");
      setPassword("");
      setUsername("");
      setIsTermsAccepted(false);
      navigate("/done"); //Dummy redirection
    }

    // If error received, set error again
  };

  // Function to handle redirection to signup page
  const redirectToSignup = () => {
    navigate("/signup"); // Use navigate to redirect
  };
  // const redirectToSignup = () => {
  //   props.toggle((prev) => {
  //     return !prev;
  //   });
  // };

  const redirecToForgotPassword = () => {
    navigate("/forgotpassword");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.background}>
        <div className={styles.shape} />
        <div className={styles.shape} />
      </div>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        style={{ top: "50%" }}
      >
        <h3>Login Here</h3>

        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          type="text"
          placeholder="Email"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />

        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <p style={{ marginTop: "10px" }}>
          {" "}
          <span onClick={redirecToForgotPassword} className={styles.signupLink}>
            Forgot Password?
          </span>
        </p>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="termsCheckbox"
            checked={isTermsAccepted}
            className={styles.checkboxContainerInput}
            onChange={() => setIsTermsAccepted(!isTermsAccepted)}
          />
          <label htmlFor="termsCheckbox" className={styles.checkBoxLabel}>
            Accept terms and conditions
          </label>
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <button type="submit" className={styles.button}>
          Log In
        </button>

        <p style={{ marginTop: "10px" }}>
          Don't have an account?{" "}
          <span onClick={redirectToSignup} className={styles.signupLink}>
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
