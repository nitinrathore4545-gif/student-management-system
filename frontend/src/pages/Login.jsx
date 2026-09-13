import { AuthContext } from "../context/AuthContext.jsx";
import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setError("");

            const user = await login(email, password);

            if (user.role === "teacher") {
                navigate("/campus");
            } else {
                navigate("/campus");
            }

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="login-page">
            <form className="login-card" onSubmit={handleLogin}>
                <span className="login-label">SECURE ACCESS</span>

                <h1>Welcome Back</h1>
                <p>Login to Student Management System</p>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <div className="login-error">
                        {error}
                    </div>
                )}

                <button type="submit">
                    Login
                </button>

                <span className="register-link">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>
                </span>
            </form>
        </div>
    );
}

export default Login;