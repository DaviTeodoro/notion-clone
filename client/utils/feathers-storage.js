import cookie from 'js-cookie';

export default {
  getItem: key => cookie.get(key),
  removeItem: key => cookie.remove(key),
  setItem: (key, value) => cookie.set(key, value),
};
