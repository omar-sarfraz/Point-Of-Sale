import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { emerald } from "tailwindcss/colors";
import MainNavigation from "./navigators/MainNavigation";

const App = () => {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: emerald[500] } }}>
            <BrowserRouter>
                <MainNavigation />
            </BrowserRouter>
        </ConfigProvider>
    );
};

export default App;
