export const utf8_to_b64 = (str) => {
  return btoa(unescape(encodeURIComponent(str)));
};

export const b64_to_utf8 = (str) => {
  return decodeURIComponent(escape(atob(str)));
};

export const setSessionStorage = (key, str, isEncrypt) => {
  const value = JSON.stringify(str);
  const code = isEncrypt ? utf8_to_b64(value) : value;
  const encode = code;
  sessionStorage.setItem(key, encode);
};

export const getSessionStorage = (key, isEncrypt) => {
  const code = isEncrypt
    ? b64_to_utf8(sessionStorage.getItem(key))
    : sessionStorage.getItem(key);
  if (sessionStorage.getItem(key)) {
    const decode = code;
    return JSON.parse(decode);
  }
  return "";
};

export const deleteSessionStorage = (key) => {
  sessionStorage.removeItem(key);
};
