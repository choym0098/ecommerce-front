import React, {useState, useEffect} from "react";
import Layout from './Layout';
import Card from './Card';
import {getCategories} from "./apiCore";
import Checkbox from "./Checkbox";
import { prices } from "./fixedPrices"
import RadioBox from "./RadioBox"

const Shop= () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category : [], price: [] }
    })
    const [categoreis, setCategories] = useState([])
    const [error, setError] = useState(false)

    const init = () => {
        getCategories()
        .then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }

    useEffect(() => {
        init()
    }, [])

    const handleFilters = (filters, filterBy) => {
        // console.log('SHOP', filters, filterBy)
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters

        if (filterBy == "price") {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }

        setMyFilters(newFilters)
    }

    const handlePrice = value => {
        const data = prices
        let array = []

        for(let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array
    }

    return (
        <Layout
            title="Shop Page"
            description="Search and find books of your choice"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-4">
                    <h4>Filter By Category</h4>
                        <ul>
                            <Checkbox categories={categoreis} handleFilters={filters => handleFilters(filters, "category")} />
                        </ul>
                    <h4>Filter By Price Range</h4>
                        <div>
                            <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, "price")} />
                        </div>
                </div>
                <div className="col-v8">
                    {JSON.stringify(myFilters)}
                </div>
            </div>

        </Layout>
    )
}


export default Shop