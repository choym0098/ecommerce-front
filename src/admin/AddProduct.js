import React, {useState, useEffect} from "react"
import Layout from "../core/Layout"
import { isAuthenticated } from '../auth'
import { createProduct } from './apiAdmin'
import {Link} from 'react-router-dom'


const AddProduct = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })

    const {
        name, description, price, categories, category,
        shipping, quantity, loading, error, createdProduct,
        redirectToProfile, formData
    } = values
    const {user, token} = isAuthenticated()
    
    useEffect(() => {
        setValues({...values, formData: new FormData()})
    }, []) 

    const handleChange = name => event => {
        const value = name ==='photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name]: value})
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: '', loading: true})
        
        createProduct(user._id, token, formData)
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values,
                    name: '', 
                    description: '', 
                    photo: '', 
                    price: '', 
                    quantity: '', 
                    loading: false,
                    createdProduct: data.name
                })
            }
        })
    }

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label>Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea onChange={handleChange('description')} type="text" className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label>Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label>Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option value="5ef34611ae99d8a22766df7d">Python</option>
                    <option value="5ef34611ae99d8a22766df7d">PHP</option>
                </select>
            </div>

            <div className="form-group">
                <label>Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <div className="form-group">
                <label>Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <button className="btn btn-outline-primary">Create Product</button>

        </form>
    )

    return (
        <Layout
            title="Add a new product"
            description={`Hello, ${user.name}, ready to add a new product?`}
            className="container"
        >
            <div className="row">
                <div className="col-md-9 offset-md-2">
                    {newPostForm()}
                </div>
            </div>

        </Layout>
    )
}

export default AddProduct;