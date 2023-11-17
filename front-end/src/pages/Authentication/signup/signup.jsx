import React, { useState } from "react";
import styles from "./../authentication.module.css";
import validateEmail from "../../../util/emailValidator";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { signupUser } from "../../../actions/authActions";

const handleSignup = async (user, setError, dispatchSignup, navigate) => {
  try {
    const res = await fetch("http://localhost:7000/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`${errorData.message}`);
    }

    const data = await res.json();
    if (data.status === "success") {
      // Dispatch the signup action to update the Redux state
      dispatchSignup(data.user);
      // Navigate to the dashboard or any other page
      navigate("/goals");
    } else {
      throw new Error(`${data.message}`);
    }
  } catch (err) {
    setError(err.message);
  }
};

const SignUp = ({ dispatchSignup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const naviigateToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (!isTermsAccepted) {
      setError("Please accept terms and conditions");
      return;
    }
    if (!validateEmail(email)) {
      setError("Enter a valid Email");
      return;
    }
    if (password.length < 6) {
      setError("Password length should be at least 6");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const user = {
      name,
      email,
      password,
      passwordConfirm: confirmPassword,
    };

    // Send data to the backend
    await handleSignup(user, setError, dispatchSignup, navigate);

    // Reset error state after successful submission
    setConfirmPassword("");
    setEmail("");
    setPassword("");
    setIsTermsAccepted("");
    setName("");
    setError("");
  };

  return (
    <div>
      <div className={styles.background}>
        <div className={styles.shape} />
        <div className={styles.shape} />
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.heading}>Sign Up</h3>

        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          type="text"
          placeholder="Your Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />

        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          placeholder="Your Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <label htmlFor="confirmPassword" className={styles.label}>
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
        />
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
          Sign Up
        </button>
        <p style={{ marginTop: "10px" }}>
          Have an account?{" "}
          <span onClick={naviigateToLogin} className={styles.signupLink}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

// Connect the component to Redux
const mapDispatchToProps = (dispatch) => ({
  dispatchSignup: (user) => dispatch(signupUser(user)),
});

export default connect(null, mapDispatchToProps)(SignUp);
