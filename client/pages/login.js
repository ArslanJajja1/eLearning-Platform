import { useState } from "react";
import Link from "next/link";

const login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className="auth-form-wrapper">
            {/* <h2 className="jumbotron">Login</h2> */}
            <div className="m-auto auth-form">
                <form onSubmit={handleSubmit} className="w-100">
                    <h3 className="text-center">Login</h3>
                    <div className="mb-3 mt-3">
                        <label className="mb-1 fw-bold">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="mb-1 fw-bold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!email || !password}
                        >
                            Submit
                        </button>
                    </div>
                    <p className="mt-4 text-center">
                        Don't have an account ?{" "}
                        <Link href="/register">
                            <a className="text-primary">Register</a>
                        </Link>
                    </p>
                    <p className="text-center">
                        <Link href="#">
                            <a className="text-primary">Forgot password ?</a>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default login;
