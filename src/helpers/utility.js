const getUser = () => {
  let user = JSON.parse(localStorage.getItem("authUser"));
  return user || {};
};

const getCurrentUrlPrefix = () => {
  let prefix = window.env.REACT_APP_NGINX_URL_PRE_FIX || "";
  return prefix;
};

const numToPercentage = (number, value) => {
  let x = (value / number) * 100;
  return x;
};

const PercentageToNum_Px = (number, value) => {
  // let x = value / number * 100
  let x = (value * number) / 100;
  return x;
};

const extractBaseUrl = (url) => {
  const urlObj = new URL(url);
  const pathSegments = urlObj.pathname.split("/").filter((segment) => segment);
  return pathSegments[0] || null;
};

export {
  getUser,
  getCurrentUrlPrefix,
  numToPercentage,
  PercentageToNum_Px,
  extractBaseUrl,
};
