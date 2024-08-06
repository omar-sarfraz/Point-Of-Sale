import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound";
import Product from "../pages/Product/Product";
import { useEffect } from "react";
import Category from "../pages/Category/Category";
import AddProduct from "../pages/SubmitProduct/SubmitProduct";

export default function MainNavigation() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/") {
            navigate("/home");
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="home" element={<Home />} />
                <Route path="products/submit" element={<AddProduct />} />
                <Route path="products/:id" element={<Product />} />
                <Route path="categories/:category" element={<Category />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
