import React, { useCallback, useState } from 'react';
import { withRouter, Redirect } from 'react-router';
import { useAuth } from 'hooks';

const initialFormState = {
  email: '',
  password: '',
};

const Login = () => {
  const [formState, updateFormState] = useState(initialFormState);
  const auth = useAuth();

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.persist();
      updateFormState(() => ({ ...formState, [event.target.name]: event.target.value }));
    },
    [formState]
  );

  const handleLogin = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      auth.login(formState.email, formState.password);
    },
    [auth, formState]
  );

  const { user } = useAuth();

  if (user) {
    return <Redirect to="/main" />;
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input onChange={onChange} name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input onChange={onChange} name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default withRouter(Login);
