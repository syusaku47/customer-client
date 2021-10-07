export const deleteCookie = () => {
  if (!document.cookie) return;
  console.groupCollapsed('Delete Cookie');
  console.log('before >>> ', document.cookie);
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;max-age=0`;
  }
  console.log('after  >>> ', document.cookie);
  console.groupEnd();
};
