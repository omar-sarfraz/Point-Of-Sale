import { ProductType } from "../pages/Home/Home";
import { CaretRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Card, Badge, Input } from "antd";
import { useEffect, useRef, useState } from "react";
const { Meta } = Card;
const { Search } = Input;

export default function ProductsList({ products }: { products: ProductType[] }) {
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(products);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleOnSearch();
        }, 1000);

        return () => clearTimeout(timeout);
    }, [searchTerm]);

    const handleOnSearch = () => {
        const filteredData = products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filteredData);
    };

    return (
        <>
            <Search
                placeholder="Search Products"
                style={{ width: "100%" }}
                allowClear
                size="large"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSearch={handleOnSearch}
            />
            <div className="flex flex-wrap justify-center gap-4 mt-6">
                {filteredProducts.map(({ id, title, image, price, description, category }) => (
                    <Link to={`/products/${id}`} key={id}>
                        <Badge.Ribbon text={category}>
                            <Card
                                hoverable
                                style={{ width: 340 }}
                                className="flex-grow"
                                cover={
                                    <img
                                        alt={title}
                                        src={image}
                                        className="w-60 h-60 object-contain p-6"
                                    />
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
                        </Badge.Ribbon>
                    </Link>
                ))}
            </div>
        </>
    );
}
