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
    });
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
     });
 }

// export const tokenValidity = (jwt) => {
//     return fetch(`${BASE_URL}/users/me`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': "application/json",
//             "Authorization" : `Bearer ${jwt}`
//         }
//     }).then((response) => {
//         try {
//             if (response.ok){
//                 return response.json();
//             }
//         } catch(e){
//             return (e)
//         }
//     })
//       .then((res) => {
//           return res;
//       })
//       .catch((err) => console.log(err));
// }