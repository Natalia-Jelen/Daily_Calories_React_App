import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import axios from 'axios';

export const ProductItem = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {//pobieranie produktow z bazy
            try {
                const response = await axios.get("api/Products");
                setProducts(response.data);
            } catch (error) {
                console.log('No products data:', error);
            }
        }

        getProducts();
    }, []);
    //obsluga pola wyboru produktow z bazy 
    return (
        <Input type="select" name="product" value={props.value} onChange={(event) => props.onChange(props.index, { productId: parseInt(event.target.value, 10) })} required>
            <option value="">choose your product</option>
            {products.map(product => (<option key={product.productId} value={product.productId}>{product.description}</option>))}
        </Input>
    )
}
