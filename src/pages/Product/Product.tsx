import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ProductType } from "../Home/Home";
import { BASE_URL } from "../../utils/urls";

import { Typography, Image, Tag, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { Title, Paragraph } = Typography;

export default function Product() {
    const [product, setProduct] = useState<ProductType | undefined>();

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        fetchProduct(id), [];
    });

    const fetchProduct = async (id: string) => {
        try {
            const productUrl = `${BASE_URL}products/${id}`;
            let response = await fetch(productUrl);
            let product = await response.json();
            setProduct(product);
        } catch (e) {
            console.log(e);
        }
    };

    const handleEditProduct = () => {
        navigate("/products/submit", { state: product });
    };

    const handleDeleteProduct = () => {};

    if (!product) return <div>Loading</div>;

    return (
        <>
            <div className="flex w-full justify-center gap-10 mt-24">
                <div className="w-72">
                    <Image src={product.image} className="object-contain" />
                </div>
                <div className="w-1/2">
                    <Title>{product.title}</Title>
                    <div className="my-8">
                        <Title level={2}>Description</Title>
                        <Paragraph>{product.description}</Paragraph>
                    </div>
                    <div className="flex w-full justify-between items-start">
                        <Title level={2}>Price: {product.price} $</Title>
                        <div>
                            <Title level={3}>Category</Title>
                            <Link to={`/categories/${product.category}`}>
                                <Tag>{product.category}</Tag>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full flex justify-end gap-4 mt-6">
                        <Button
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={handleDeleteProduct}
                        />
                        <Button
                            type="primary"
                            shape="round"
                            icon={<EditOutlined />}
                            onClick={handleEditProduct}
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
