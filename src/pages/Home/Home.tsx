import { useEffect, useState } from "react";

import { Card } from "antd";
const { Meta } = Card;

import { BASE_URL } from "../../utils/urls";
import { CaretRightOutlined } from "@ant-design/icons";
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
            <h2 className="text-2xl mb-6 text-center">Our Amazing Products</h2>
            <div className="flex flex-wrap gap-4">
                {products.map(({ id, title, image, price, description }) => (
                    <Card
                        key={id}
                        hoverable
                        style={{ width: 340 }}
                        className="flex-grow"
                        cover={
                            <img alt={title} src={image} className="w-60 h-60 object-contain p-6" />
                        }
                        actions={[
                            <div className="text-lg font-semibold">{price} $</div>,
                            <div className="text-lg font-semibold flex justify-center gap-2 items-center w-full">
                                <div>View More</div>
                                <CaretRightOutlined />
                            </div>,
                        ]}
                    >
                        <Meta
                            title={title}
                            description={
                                description.length > 200
                                    ? description.slice(0, 200) + "..."
                                    : description
                            }
                            className="h-48 overflow-hidden text-ellipsis"
                        />
                    </Card>
                ))}
            </div>
        </div>
    );
}
