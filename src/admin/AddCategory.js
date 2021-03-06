import React, {useState} from "react"
import Layout from "../core/Layout"
import { isAuthenticated } from '../auth'
import { createCategory } from './apiAdmin'
import {Link} from 'react-router-dom'


const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user, token} = isAuthenticated()

    const handleChange = (event) => {
        setError('')
        setName(event.target.value)
    }

    const clickSubmit = (event) => {
        event.preventDefault() // prevent default behaviour of a browser, reload
        setError('')
        setSuccess(false)

        // make request to api to create category
        createCategory(user._id, token, {name})
        .then(data => {
            if (data.error) {
                setError(true)
            } else {
                setError('')
                setSuccess(true)
            }
        })
    }

    const newCategoryFrom = () => {
        return (
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input 
                        type="text" 
                        className="form-control"
                        onChange={handleChange} 
                        value={name}
                        autoFocus
                        required
                    />
                </div>
                <button className="btn btn-outline-primary">
                        Create Category
                    </button>
            </form>
        )
    }

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} is created</h3>
        }
    }

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category should be unique</h3>
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    )

    return (
        <Layout
            title="Add a new category"
            description={`Hello, ${name}, ready to add a new category?`}
            className="container"
        >
            <div className="row">
                <div className="col-md-9 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryFrom()}
                    {goBack()}
                </div>
            </div>

        </Layout>
    )
}


export default AddCategory;
