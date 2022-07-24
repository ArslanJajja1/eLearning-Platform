import { useState } from "react";
import Link from "next/link";
import axios from "axios";

const initialFieldsValue = {
    nameError: null,
    passwordError: null,
};
const register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fieldsError, setFieldsError] = useState(initialFieldsValue);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Name", name, "email", email, "password", password);
        const { data } = await axios.post(
            `http://localhost:8000/api/register`,
            { name, email, password }
        );
        console.log("Register response " + data);
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
                                password.length > 16
                            }
                        >
                            Submit
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
