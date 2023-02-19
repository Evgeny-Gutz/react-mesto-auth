export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = ({password, email}) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            'password': password,
            'email': email})
    }).then((res) => checkResponse(res));
}

 export const authorization = ({password, email}) => {
     return fetch(`${BASE_URL}/signin`, {
         method: 'POST',
         headers: {
             'Content-Type': "application/json",
         },
         body: JSON.stringify({
             'password': password,
             'email': email})
     }).then((res) => checkResponse(res));
 }

 export const tokenValidity = (JWT) => {
     return fetch(`${BASE_URL}/users/me`, {
         method: 'GET',
         headers: {
             'Content-Type': "application/json",
             "Authorization" : `Bearer ${JWT}`
         }
     }).then((res) => checkResponse(res));
 }

 function checkResponse(res) {
    return (res.ok) ? res.json(): Promise.reject(res.status);
 }