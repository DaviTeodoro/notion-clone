export default function (request) {
  const cookies = request.headers.cookie;
  const list = {};

  if (cookies) {
    cookies.split(';').forEach((cookie) => {
      const parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
  }

  return list;
}
