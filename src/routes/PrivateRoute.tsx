import { useAuth } from 'hooks';
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps {
  component: (props: any) => JSX.Element;
  path: string;
  exact?: boolean;
}

const PrivateRoute = ({ component: RouteComponent, ...rest }: PrivateRouteProps) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        user ? <RouteComponent {...routeProps} /> : <Redirect to={'/login'} />
      }
    />
  );
};

export default PrivateRoute;
