export const isValidEmailType = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidName = (name: string) => {
  return name.length > 1 && name.length < 10;
};

export const isValidPassword = (password: string) => {
  return password.length >= 8;
};

export const isEnteredSamePassword = (
  password: string,
  confirmPassword: string
) => {
  return password === confirmPassword;
};
