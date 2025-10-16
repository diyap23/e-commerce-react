import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header.jsx'
import { ProductsGrid } from './ProductsGrid.jsx';
import './HomePage.css'

export function HomePage({ cart }) {
    const [products, setProducts] = useState([]);

    useEffect( () => {
        const getHomeData = async () => {
            const response = await axios.get('/api/products')
            setProducts(response.data);
        };

        getHomeData();
    }, []); // Dependency array

    return (
        <>
            <Header cart={cart} />

            <div className="home-page">
                < ProductsGrid products={products} />
            </div>
        </>
    );
}