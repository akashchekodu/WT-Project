import { useState } from "react";
import styles from "./../authentication.module.css";
import { useNavigate } from "react-router-dom";
import validateEmail from "../../../util/emailValidator";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
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
    const user = {
      email: username,
    };

    // Send data to the backend

    // If error received, set error again

    console.log(user);
    setError("");
    setUsername("");
    setIsTermsAccepted(false);
  };

  // Function to handle redirection to signup page
  const redirectToLogin = () => {
    navigate("/login"); // Use navigate to redirect
  };
  // const redirectToSignup = () => {
  //   props.toggle((prev) => {
  //     return !prev;
  //   });
  // };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.background}>
        <div className={styles.shape} />
        <div className={styles.shape} />
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>Forgot Password</h3>

        <label htmlFor="username" className={styles.label}>
          Email
        </label>
        <input
          type="text"
          placeholder="Email"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          Submit
        </button>

        <p style={{ marginTop: "10px" }}>
          Back to{" "}
          <span onClick={redirectToLogin} className={styles.signupLink}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
