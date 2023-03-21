import { Route, Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const auth = localStorage.getItem('userToken')
    return localStorage.getItem('userToken') !== null ? <Outlet /> : <Navigate to="/account/login" />;
};  

  export default ProtectedRoute