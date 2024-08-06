import { useState, useEffect } from "react";
import ProductsList from "../../components/ProductsList";
import { ProductType } from "../Home/Home";
import { BASE_URL } from "../../utils/urls";
import { useParams } from "react-router-dom";
import H2 from "../../components/H2";

export default function Category() {
    const [categoryProducts, setCategoryProducts] = useState<ProductType[]>();

    const { category } = useParams();

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const fetchProducts = async () => {
        const productsUrl = `${BASE_URL}products/category/${category}`;
        try {
            let response = await fetch(productsUrl);
            let products = await response.json();
            setCategoryProducts(products);
        } catch (e) {
            console.log(e);
        }
    };

    if (!categoryProducts) return <div>Loading</div>;

    return (
        <div>
            <H2>{category?.toUpperCase()}</H2>
            <ProductsList products={categoryProducts} />
        </div>
    );
}
