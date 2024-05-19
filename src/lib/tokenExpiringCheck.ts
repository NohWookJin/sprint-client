export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split(".")[1]));
  const exp = payload.exp * 1000;
  const now = Date.now();

  if (now < exp) {
    console.log("exp", exp);
    console.log("now", now);
    console.log("now < exp, not expired yet.");
  }

  return now > exp;
};
