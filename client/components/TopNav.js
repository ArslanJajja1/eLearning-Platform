import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import { Context } from "../context";
import {
    AppstoreOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserAddOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const { Item } = Menu;
const TopNav = () => {
    const [current, setCurrent] = useState("");
    const { state, dispatch } = useContext(Context);
    const { user } = state;
    const router = useRouter();
    const logout = async () => {
        dispatch({
            type: "LOGOUT",
        });
        window.localStorage.removeItem("user");
        const res = await axios.get("/api/logout");
        console.log("resss", res);
        toast.success(res.data.message);
        router.push("/login");
    };
    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);
    return (
        <Menu mode="horizontal" selectedKeys={[current]}>
            <Item
                className="d-inline-flex align-items-center"
                key="/"
                icon={<AppstoreOutlined />}
                onClick={(e) => setCurrent(e.key)}
            >
                <Link href="/">
                    <a>Home</a>
                </Link>
            </Item>
            {user === null && (
                <>
                    <Item
                        className="d-inline-flex align-items-center"
                        key="/login"
                        icon={<LoginOutlined />}
                        onClick={(e) => setCurrent(e.key)}
                    >
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    </Item>
                    <Item
                        className="d-inline-flex align-items-center"
                        key="/register"
                        icon={<UserAddOutlined />}
                        onClick={(e) => setCurrent(e.key)}
                    >
                        <Link href="/register">
                            <a>Register</a>
                        </Link>
                    </Item>
                </>
            )}
            {user !== null && (
                <Item
                    className="d-inline-flex align-items-center ms-auto"
                    icon={<LogoutOutlined />}
                    onClick={logout}
                >
                    Logout
                </Item>
            )}
        </Menu>
    );
};

export default TopNav;
