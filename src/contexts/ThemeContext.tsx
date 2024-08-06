import { useContext, useState } from "react";
import { createContext } from "react";
import { emerald } from "tailwindcss/colors";

const ThemeContext = createContext<{ primaryColor: string; setPrimaryColor: Function }>({
    primaryColor: emerald[500],
    setPrimaryColor: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [primaryColor, setPrimaryColor] = useState<string>(emerald[500]);

    return (
        <ThemeContext.Provider value={{ primaryColor, setPrimaryColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const { primaryColor, setPrimaryColor } = useContext(ThemeContext);

    return { primaryColor, setPrimaryColor };
};
