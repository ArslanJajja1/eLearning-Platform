import { useContext } from "react";
import { Context } from "../../context";
import globalStyles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import UserRoute from "../../components/routes/UserRoute";

const UserIndex = () => {
    const {
        state: { user },
    } = useContext(Context);

    return (
        <UserRoute>
            <h1 className={globalStyles.jumbotron}>User</h1>
            <h1>{JSON.stringify(user)}</h1>
        </UserRoute>
    );
};

export default UserIndex;
