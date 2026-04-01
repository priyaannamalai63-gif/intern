
export const validateEmail = (email) => {
  if (!email) return false;
  return /\S+@\S+\.\S+/.test(email);
};

export const validatePassword = (password) => {
  if (!password) return false;
  return password.length >= 6;
};

