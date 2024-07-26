import { useEffect, useState } from "react";

import { Card } from "antd";
const { Meta } = Card;

import { BASE_URL } from "../../utils/urls";
const productsUrl = BASE_URL + "products";

export type Product = {
    id: string;
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
};

export default function Home() {
    const [products, setProducts] = useState<Product[]>();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        let response = await fetch(productsUrl);
        let products = await response.json();
        setProducts(products);
    };

    if (!products) return <div>Loading</div>;

    return (
        <div>
            <div className="flex flex-wrap gap-4">
                {products.map((product) => (
                    <Card
                        key={product.id}
                        hoverable
                        style={{ width: 340 }}
                        className="flex-grow"
                        cover={
                            <img
                                alt={product.title}
                                src={product.image}
                                className="w-60 h-60 object-contain p-6"
                            />
                        }
                    >
                        <Meta title={product.title} description={product.description} />
                    </Card>
                ))}
            </div>
        </div>
    );
}
