import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Measurer from'./pages/currentMeter/table';
import ErrorPage from "./pages/errorPage";
import Dashboard from './pages/dashboard';
import Customer from './pages/customer/table';
import Layout from './layout/Index';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: (<Dashboard />),
            },
            {
                path: "/Cliente",
                element: (<Customer />),
            },
            {
              path: "/Medidor",
              element: (<Measurer />),
          },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router}></RouterProvider>;
};

export default App;
