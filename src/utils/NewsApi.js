export const BASE_URL = 'https://api.teresanews.students.nomoredomainssbs.ru';

const customFetch = (url, headers) => {
  return fetch(url, headers).then((res) =>
    res.ok ? res.json() : Promise.reject(res.statusText)
  );
};

export const searchArticles = (question) => {
  return customFetch(`${BASE_URL}/articles/everything`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : "*",

    },
    body: JSON.stringify({ question }),
  });
};
