import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);

            await api.post("/auth/register", formData);

            navigate("/login");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page register-page">

            <div className="login-bg-grid"></div>

            <div className="login-glow register-glow"></div>

            <form
                className="login-card register-card"
                onSubmit={handleRegister}
            >

                <div className="card-top-line"></div>

                <div className="login-header">

                    <span className="login-label">
                        SYSTEM // STUDENT REGISTRATION
                    </span>

                    <div className="access-indicator">
                        <span></span>
                        NEW USER
                    </div>

                </div>

                <h1>Create Account</h1>

                <p className="login-description">
                    Create your student account to access the campus.
                </p>

                <div className="input-group">
                    <label>Full Name</label>

                    <input
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value
                            })
                        }
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Email Address</label>

                    <input
                        type="email"
                        placeholder="student@example.com"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>

                    <div className="password-wrapper">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Minimum 6 characters"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value
                                })
                            }
                            required
                            minLength={6}
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
                            CREATING ACCOUNT...
                        </>
                    ) : (
                        "CREATE ACCOUNT"
                    )}
                </button>

                <div className="register-link">
                    <span>Already registered?</span>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        ← BACK TO LOGIN
                    </button>
                </div>

                <div className="security-footer">
                    <span>●</span>
                    STUDENT ACCESS
                    <span className="footer-divider">|</span>
                    SECURE REGISTRATION
                </div>

            </form>
        </div>
    );
}

export default Register;