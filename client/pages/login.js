const login = () => {
    return (
        <div className="auth-form-wrapper">
            {/* <h2 className="jumbotron">Login</h2> */}
            <div className="w-25 m-auto auth-form">
                <form className="w-100">
                    <h3>Sign In</h3>
                    <div className="mb-3 mt-3">
                        <label className="mb-1">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="mb-1">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                        />
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="mt-4 text-center">
                        Don't have an account <a href="/register">Sign up</a>
                    </p>
                    <p className="text-center">
                        <a href="#">Forgot password?</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default login;
