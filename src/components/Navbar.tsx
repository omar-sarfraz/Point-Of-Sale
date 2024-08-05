import { HomeOutlined, PlusCircleOutlined, ShopOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import { BASE_URL } from "./../utils/urls";
import { Spin } from "antd";

export default function Navbar() {
    const [categories, setCategoies] = useState<MenuProps["items"]>([{ label: "Loading", key: 1 }]);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}products/categories`);
            const categories: string[] = await response.json();
            if (categories?.length) {
                const data = categories.map((category, index) => ({
                    label: <Link to={`/categories/${category}`}>{category.toUpperCase()}</Link>,
                    key: index,
                }));
                setCategoies(data);
            }
        } catch (e: any) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex justify-between px-6 py-4 border-emerald-300 border-b-2 mb-10">
            <Link to="/home" className="flex gap-2 items-center">
                <ShopOutlined className="text-2xl" />
                <h2 className="text-2xl font-medium">Point of Sale</h2>
            </Link>
            <ul className="flex gap-4">
                <Link to="/home" className="flex gap-2 items-center hover:text-emerald-500">
                    <HomeOutlined className="text-xl" />
                    <li className="text-xl font-medium">Home</li>
                </Link>
                <div className="flex gap-2 items-center">
                    <Spin spinning={loading}>
                        <Dropdown
                            menu={{ items: categories }}
                            className="hover:text-emerald-500"
                            trigger={["click"]}
                        >
                            <div className="cursor-pointer">
                                <Space className="text-xl font-medium" color="red">
                                    Categories
                                    <DownOutlined />
                                </Space>
                            </div>
                        </Dropdown>
                    </Spin>
                </div>
            </ul>
            <ul>
                <li>
                    <Button
                        type="primary"
                        size="large"
                        icon={<PlusCircleOutlined />}
                        onClick={() => navigate("/products/submit")}
                    >
                        Add
                    </Button>
                </li>
            </ul>
        </div>
    );
}
