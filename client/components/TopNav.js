import { Menu } from "antd";
import {
    AppstoreOutlined,
    LoginOutlined,
    UserAddOutlined,
} from "@ant-design/icons";
import Link from "next/link";
const { Item } = Menu;
const TopNav = () => {
    let keyId = 999;
    return (
        <Menu mode="horizontal">
            <Item
                className="d-inline-flex align-items-center"
                key={`${++keyId}#`}
                icon={<AppstoreOutlined />}
            >
                <Link href="/">
                    <a>Home</a>
                </Link>
            </Item>
            <Item
                className="d-inline-flex align-items-center"
                key={`${++keyId}#`}
                icon={<LoginOutlined />}
            >
                <Link href="/login">
                    <a>Login</a>
                </Link>
            </Item>
            <Item
                className="d-inline-flex align-items-center"
                key={`${++keyId}#`}
                icon={<UserAddOutlined />}
            >
                <Link href="/register">
                    <a>Register</a>
                </Link>
            </Item>
        </Menu>
    );
};

export default TopNav;
