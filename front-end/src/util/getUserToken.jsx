const getUserToken = () => {
  // Replace 'your_cookie_name' with the actual name of your cookie
  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwt"));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

export default getUserToken;
