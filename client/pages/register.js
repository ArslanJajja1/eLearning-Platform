const register = () => {
    return (
        <div className="auth-form-wrapper">
            <div className="w-25 m-auto auth-form">
                <form>
                    <h3>Sign Up</h3>
                    <div className="mb-3">
                        <label className="mb-1">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                        />
                    </div>

                    <div className="mb-3">
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
                            Sign Up
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        Already registered <a href="/login">Sign in?</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default register;
