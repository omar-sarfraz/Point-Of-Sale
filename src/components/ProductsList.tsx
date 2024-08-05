import { ProductType } from "../pages/Home/Home";
import { CaretRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Card, Badge } from "antd";
const { Meta } = Card;

export default function ProductsList({ products }: { products: ProductType[] }) {
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {products.map(({ id, title, image, price, description, category }) => (
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
    );
}
