import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import MainNavigation from "./navigators/MainNavigation";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

const App = () => {
    return (
        <ThemeProvider>
            <Router />
        </ThemeProvider>
    );
};

export default App;

const Router = () => {
    const { primaryColor } = useTheme();

    return (
        <ConfigProvider theme={{ token: { colorPrimary: primaryColor } }}>
            <BrowserRouter>
                <MainNavigation />
            </BrowserRouter>
        </ConfigProvider>
    );
};
