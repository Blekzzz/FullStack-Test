import { createBrowserRouter, redirect, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import App from '../App';
import CompanyHrAdminDashboard from '../pages/CompanyHrAdminDashboard';
import VendorAdminDashboard from '../pages/VendorAdminDashboard';
import PostEvent from '../pages/PostEvent';

export default createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
        loader: () => {
            return !localStorage.access_token ? null : redirect('/');
        },
    },
    {
        path: '/',
        element: <App />,
        loader: () => {
            return localStorage.access_token ? null : redirect('/login');
        },
        children: [
            {
                index: true,
                loader: () => {
                    if (localStorage.role === "company_hr") {
                        return redirect('/company');
                    } else if (localStorage.role === "vendor_admin") {
                        return redirect('/vendor');
                    }
                },
            },
            {
                path: '/company',
                element: <CompanyHrAdminDashboard />,
                loader: () => {
                    return localStorage.role === "company_hr" ? null : redirect('/');
                },
            },
            {
                path: '/company/post',
                element: <PostEvent />,
                loader: () => {
                    return localStorage.role === "company_hr" ? null : redirect('/');
                },
            },
            {
                path: '/vendor',
                element: <VendorAdminDashboard />,
                loader: () => {
                    return localStorage.role === "vendor_admin" ? null : redirect('/');
                }
            }
        ]
    },
    {
        path: '*',
        element: <LoginPage />
    }
]);
