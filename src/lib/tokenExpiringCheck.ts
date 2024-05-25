export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split(".")[1]));
  const exp = payload.exp * 1000;
  const now = Date.now();

  return now > exp;
};
