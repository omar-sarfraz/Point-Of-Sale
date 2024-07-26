import {
    HomeOutlined,
    PlusCircleOutlined,
    ShopOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

export default function Navbar() {
    return (
        <div className="w-full flex justify-between px-6 py-4 border-emerald-300 border-b-2 mb-10">
            <div className="flex gap-2 items-center">
                <ShopOutlined className="text-2xl" />
                <h2 className="text-2xl font-medium">Point of Sale</h2>
            </div>
            <ul className="flex gap-4">
                <div className="flex gap-2 items-center">
                    <HomeOutlined className="text-xl" />
                    <li className="text-xl font-medium">Home</li>
                </div>
                <div className="flex gap-2 items-center">
                    <UnorderedListOutlined className="text-xl" />
                    <li className="text-xl font-medium">Categories</li>
                </div>
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
