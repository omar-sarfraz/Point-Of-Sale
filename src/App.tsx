import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import { ConfigProvider } from "antd";
import { emerald } from "tailwindcss/colors";

const App = () => {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: emerald[500] } }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="home" element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
};

export default App;
