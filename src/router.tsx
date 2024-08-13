import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/dashboard",
        element: <h1>Dashboard</h1>
    }
]);

export default routes;