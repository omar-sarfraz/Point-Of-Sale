import { useEffect, useState } from "react";

import { BASE_URL } from "../../utils/urls";
import ProductsList from "../../components/ProductsList";
import H2 from "../../components/H2";
const productsUrl = BASE_URL + "products";

export type ProductType = {
    id: string;
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
};

export default function Home() {
    const [products, setProducts] = useState<ProductType[]>();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            let response = await fetch(productsUrl);
            let products = await response.json();
            setProducts(products);
        } catch (e) {
            console.log(e);
        }
    };

    if (!products) return <div>Loading</div>;

    return (
        <div>
            <H2>Our Amazing Products</H2>
            <ProductsList products={products} />
        </div>
    );
}
