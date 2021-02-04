import React from 'react';
import './App.css';
import { MainPage, Login } from './pages';
import { observer } from 'mobx-react';
import { AuthContext, useCognito, STATUS } from 'hooks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from 'routes/PrivateRoute';

function App() {
  const auth = useCognito();
  return (
    <>
      {auth.status !== STATUS.PENDING ? (
        <AuthContext.Provider value={auth}>
          <Router>
            <Switch>
              <PrivateRoute path="/main" component={() => <MainPage />} />
              <Route exact path="/login" component={() => <Login />} />
              <Route path="*" component={() => <div>404</div>} />
            </Switch>
          </Router>
        </AuthContext.Provider>
      ) : (
        // spinner should be
        <div>loading</div>
      )}
    </>
  );
}

export default observer(App);
