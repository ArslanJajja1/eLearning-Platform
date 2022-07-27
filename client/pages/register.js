import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
const register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Name", name, "email", email, "password", password);
        try {
            const res = await axios.post(`/api/register`, {
                name,
                email,
                password,
            });
            setLoading(false);
            console.log("Register response ", res);
            toast.success(res.data.message);
        } catch (error) {
            console.log("Register error", error);
            const errorMessage = error.response.data.message;
            toast.error(errorMessage);
            setLoading(false);
        }
    };

    return (
        <div className="auth-form-wrapper">
            <div className="m-auto auth-form">
                <form onSubmit={handleSubmit}>
                    <h3 className="text-center">Register</h3>
                    <div className="mb-3">
                        <label className="mb-1 fw-bold">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <p className="input-fields-info text-info">
                            Name must be b/w 3 to 15 chars
                        </p>
                    </div>

                    <div className="mb-3">
                        <label className="mb-1 fw-bold">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <p className="input-fields-info text-info">
                            Email must be valid
                        </p>
                    </div>
                    <div className="mb-3">
                        <label className="mb-1 fw-bold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <p className="input-fields-info text-info">
                            Password must be b/w 8 to 16 char
                        </p>
                    </div>
                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={
                                name.length < 3 ||
                                name.length > 12 ||
                                !email ||
                                password.length < 8 ||
                                password.length > 16 ||
                                loading
                            }
                        >
                            {loading ? <SyncOutlined spin /> : "Submit"}
                        </button>
                    </div>
                    <p className="text-center mt-4">
                        Already registered ?{" "}
                        <Link href="/login">
                            <a className="text-primary">Login</a>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default register;
