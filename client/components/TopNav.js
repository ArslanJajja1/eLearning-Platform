import { useState, useEffect } from "react";
import { Menu } from "antd";
import {
    AppstoreOutlined,
    LoginOutlined,
    UserAddOutlined,
} from "@ant-design/icons";
import Link from "next/link";
const { Item } = Menu;
const TopNav = () => {
    const [current, setCurrent] = useState("");
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
        </Menu>
    );
};

export default TopNav;
