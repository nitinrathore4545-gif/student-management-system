import { AuthContext } from "../context/AuthContext.jsx";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);

            const user = await login(email, password);

            navigate("/campus");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            <div className="login-bg-grid"></div>

            <div className="login-glow"></div>

            <form className="login-card" onSubmit={handleLogin}>

                <div className="card-top-line"></div>

                <div className="login-header">
                    <span className="login-label">
                        SYSTEM // SECURE ACCESS
                    </span>

                    <div className="access-indicator">
                        <span></span>
                        AUTHORIZED ACCESS
                    </div>
                </div>

                <h1>Welcome Back</h1>

                <p className="login-description">
                    Sign in to access the Student Management System.
                </p>

                <div className="input-group">
                    <label>Email Address</label>

                    <input
                        type="email"
                        placeholder="student@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>

                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            {showPassword ? "HIDE" : "SHOW"}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="login-error">
                        <span>!</span>
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="login-submit"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="button-loader"></span>
                            AUTHENTICATING...
                        </>
                    ) : (
                        "ENTER SYSTEM"
                    )}
                </button>

                <div className="register-link">
                    <span>New student?</span>

                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                    >
                        CREATE ACCOUNT →
                    </button>
                </div>

                <div className="security-footer">
                    <span>●</span>
                    SECURE SESSION
                    <span className="footer-divider">|</span>
                    JWT AUTHENTICATION
                </div>

            </form>
        </div>
    );
}

export default Login;