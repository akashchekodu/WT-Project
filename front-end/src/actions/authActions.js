// actions/authActions.js

export const loginUser = (user) => ({
  type: "LOGIN",
  payload: user,
});

export const signupUser = (user) => ({
  type: "SIGNUP",
  payload: user,
});

export const logoutUser = () => ({
  type: "LOGOUT",
});
