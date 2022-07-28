import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
// Initial State
const initialState = {
    user: null,
};

// create context
const Context = createContext();
// root reducer
const rootReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        default:
            return state;
    }
};

// Context Provider

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    const router = useRouter();
    useEffect(() => {
        dispatch({
            type: "LOGIN",
            payload: JSON.parse(window.localStorage.getItem("user")),
        });
    }, []);
    axios.interceptors.response.use(
        (response) => {
            // any status code that lie in range 2xx cause this function to trigger
            return response;
        },
        (error) => {
            // any status code that lie in range out of 2xx cause this function to trigger
            let res = error.reponse;
            if (
                res.status === 401 &&
                res.config &&
                !res.config.__isRetryRequest
            ) {
                return new Promise((resolve, reject) => {
                    axios
                        .get("/api/logout")
                        .then((data) => {
                            console.log("res data", data);
                            console.log("401 error - logout");
                            dispatch({
                                type: "LOGOUT",
                            });
                            window.localStorage.removeItem("user");
                            router.push("/login");
                        })
                        .catch((error) => {
                            reject(error);
                            console.log(error);
                        });
                });
            }
            return Promise.reject(error);
        }
    );
    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
};
export { Context, Provider };
