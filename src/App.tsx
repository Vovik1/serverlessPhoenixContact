import React from 'react';
import './App.css';
import { Dashboard, Login } from './pages';
import { observer } from 'mobx-react';
import { AuthContext, useCognito, STATUS } from 'hooks';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from 'routes/PrivateRoute';
import { withAuthenticator } from '@aws-amplify/ui-react';

const redirects = ['/', '/dashboard'];

function App() {
  const auth = useCognito();
  return (
    <div className="wrapApp">
      {auth.status !== STATUS.PENDING ? (
        <AuthContext.Provider value={auth}>
          <Router>
            <Switch>
              {redirects.map((item) => (
                <PrivateRoute
                  key={item}
                  exact
                  path={item}
                  component={() => <Redirect to="/dashboard/monitoring" />}
                />
              ))}
              <PrivateRoute path="/dashboard" component={() => <Dashboard />} />
              <Route exact path="/login" component={() => <Login />} />
              <Route path="*" component={() => <div>404</div>} />
            </Switch>
          </Router>
        </AuthContext.Provider>
      ) : (
        // spinner should be
        <div>loading</div>
      )}
    </div>
  );
}
// withAuthenticator temporary before we will use custom login form
export default withAuthenticator(observer(App));
