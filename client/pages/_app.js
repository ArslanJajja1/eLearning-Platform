import TopNav from "../components/TopNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../styles/globals.css";
import { Provider } from "../context";

function MyApp({ Component, pageProps }) {
    return (
        <Provider>
            <ToastContainer position="bottom-left" />
            <TopNav />
            <Component {...pageProps} />;
        </Provider>
    );
}

export default MyApp;
