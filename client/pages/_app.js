import TopNav from "../components/TopNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <ToastContainer position="bottom-left" />
            <TopNav />
            <Component {...pageProps} />;
        </>
    );
}

export default MyApp;
