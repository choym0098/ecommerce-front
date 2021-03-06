import React, {useState, useEffect} from "react";
import { getCategories, list } from './apiCore'
import Card from './Card'

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    })

    const {categories, category, search, results, searched} = data

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setData({...data, categories: data})
            }
        })
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const searchData = () => {
        // console.log(search, category)
        if (search) {
            list({search: search || undefined, category: category})
            .then(res => {
                if (res.error) {
                    console.log(res.error)
                } else {
                    setData({...data, results: res, searched: true})
                }
            })
        }
    }

    const serachSubmit = (event) => {
        event.preventDefault()
        searchData()
    }

    const handleChange = (name) => event => {
        setData({...data, [name]: event.target.value, serached: false})
    }

    const searchForm = () => (
        <form onSubmit={serachSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange('category')}>
                            <option value="All">Pick Cateogry</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input 
                        type="search" 
                        className="form-control" 
                        onChange={handleChange('search')}
                        placeholder="Search by name"
                    />
                </div>
                <div className="btn input-group-append" style={{border: 'none'}}>
                    <button className="input-group-text">
                        Search
                    </button>
                </div>
            </span>
        </form>
    )

    return (
        <div className="row">
            <div className="container mb-3">
                {searchForm()}
                {JSON.stringify(results)}
            </div>
        </div>
    )
}

export default Search