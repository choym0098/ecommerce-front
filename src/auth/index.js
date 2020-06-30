import { API } from "../config"

// user = (name, email, password)
export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}
