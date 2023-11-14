import { useState } from "react";
import styles from "./../authentication.module.css";
import { useNavigate } from "react-router-dom";
import validateEmail from "../../../util/emailValidator";

const handleForgotPassword = async (user, setNotification, setLoading) => {
  try {
    setLoading(true); // Set loading to true before making the request

    const res = await fetch("http://localhost:7000/api/v1/forgotpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      throw new Error(`${errorData.message}`);
    }

    const data = await res.json();
    console.log(data);
    if (data.status === "success")
      setNotification({ type: "success", message: data.message });
    else throw new Error(`${data}`);
  } catch (err) {
    setNotification({ type: "error", message: err.message });
  } finally {
    setLoading(false); // Set loading to false after the request is completed
  }
};

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [notification, setNotification] = useState(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // If already loading, do nothing

    setNotification(null); // Reset notification state
    if (!username) {
      setNotification({ type: "error", message: "Please fill in all fields" });
      return;
    }
    if (!isTermsAccepted) {
      setNotification({
        type: "error",
        message: "Please accept terms and conditions",
      });
      return;
    }
    if (!validateEmail(username)) {
      setNotification({ type: "error", message: "Enter a valid Email" });
      return;
    }
    const user = {
      email: username,
    };

    // Send data to the backend

    const data = await handleForgotPassword(user, setNotification, setLoading);
    if (data) {
      setUsername("");
      setIsTermsAccepted(false);
    }
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

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

        {loading && <p className={styles.loadingMessage}>Sending mail...</p>}

        {notification && notification.type === "success" && (
          <p className={styles.successMessage}>{notification.message}</p>
        )}

        {notification && notification.type === "error" && (
          <p className={styles.errorMessage}>{notification.message}</p>
        )}

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
