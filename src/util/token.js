export const storeToken = (token) => {
  localStorage.setItem('jwtToken', token);
}

export const getToken = () => {
  return localStorage.getItem('jwtToken');
}

export const removeToken = () => {
  localStorage.removeItem('jwtToken');
}

export const getAuthConfig = () => {
  return {
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  }
}