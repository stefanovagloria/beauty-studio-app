import { useEffect, useState } from 'react';
import axios from "axios";

import styles from './ProductsList.module.css';

const ProductsList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () =>{
            const response = await axios.get('http://localhost:4000/products');
            setProducts(response.data);
        }

        getProducts();
    }, [])

    return(
        <>
          <h1>Products</h1>
          {products && products.map((p) => (
            <p key={p._id}>{p.name}</p>
          ))}
        </>
      
    )
}

export default ProductsList;