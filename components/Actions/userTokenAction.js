export function setToken(token) {
  return {
    type: 'TOKEN',
    value: 'Bearer ' + token,
  };
}
