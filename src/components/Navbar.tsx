import {
    HomeOutlined,
    PlusCircleOutlined,
    ShopOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="w-full flex justify-between px-6 py-4 border-emerald-300 border-b-2 mb-10">
            <Link to="/home" className="flex gap-2 items-center">
                <ShopOutlined className="text-2xl" />
                <h2 className="text-2xl font-medium">Point of Sale</h2>
            </Link>
            <ul className="flex gap-4">
                <Link to="/home" className="flex gap-2 items-center">
                    <HomeOutlined className="text-xl" />
                    <li className="text-xl font-medium">Home</li>
                </Link>
                <Link to="/categories" className="flex gap-2 items-center">
                    <UnorderedListOutlined className="text-xl" />
                    <li className="text-xl font-medium">Categories</li>
                </Link>
            </ul>
            <ul>
                <li>
                    <Button type="primary" size="large" icon={<PlusCircleOutlined />}>
                        Add
                    </Button>
                </li>
            </ul>
        </div>
    );
}
