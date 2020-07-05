import { API } from "../config"

// user = (name, email, password)
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

// user = (name, email, password)
export const createProduct = (userId, token, product) => {
    console.log("it's product  : ", product)
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const getCategories = () => {
    return fetch(`${API}/categories/`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

