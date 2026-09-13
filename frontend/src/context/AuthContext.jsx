
import {
    createContext,
    useEffect,
    useState
} from "react";

import api from "../services/api";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const savedToken =
            localStorage.getItem("token");

        const savedUser =
            localStorage.getItem("user");

        if (savedToken && savedUser) {

            try {

                setToken(savedToken);

                setUser(
                    JSON.parse(savedUser)
                );

            } catch (error) {

                localStorage.removeItem("token");
                localStorage.removeItem("user");

            }
        }

        setLoading(false);

    }, []);

    const login = async (
        email,
        password
    ) => {

        const response = await api.post(
            "/auth/login",
            {
                email,
                password
            }
        );

        const {
            token,
            user
        } = response.data;

        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        setToken(token);
        setUser(user);

        return user;
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;