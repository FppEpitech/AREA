import React from 'react';
import { Navigate, useLocation, RouteProps } from "react-router-dom";
import { isLogged } from '../services/auth/auth';

interface GuardedRouteProps extends Omit<RouteProps, 'element'> {
    element: React.ReactElement;
}

const GuardedRoute: React.FC<GuardedRouteProps> = ({ element, ...rest }) => {
    const location = useLocation();

    if (!isLogged()) {
        return <Navigate to="/welcome" state={{ from: location }} replace />;
    }

    return React.cloneElement(element, rest);
};

export default GuardedRoute;
