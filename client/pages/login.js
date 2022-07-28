import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../context";
import { useRouter } from "next/router";
const login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    // Context api state
    const { state, dispatch } = useContext(Context);
    const { user } = state;
    useEffect(() => {
        if (user !== null) router.push("/");
    }, [user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`/api/login`, {
                email,
                password,
            });
            setLoading(false);
            // user = res.data.data
            dispatch({ type: "LOGIN", payload: res.data.data });
            // save user in local storage
            window.localStorage.setItem("user", JSON.stringify(res.data.data));
            // redirect user to homepage
            router.push("/");
            toast.success("Logged in successfully");
        } catch (error) {
            console.log("Login error", error);
            const errorMessage = error.response.data.message;
            toast.error(errorMessage);
            setLoading(false);
        }
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
                            {loading ? "Loading..." : "Submit"}
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
