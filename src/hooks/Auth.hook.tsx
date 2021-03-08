import { Auth, Hub } from 'aws-amplify';
import { createContext, useContext, useEffect, useState } from 'react';
import { CognitoUserSession, CognitoAccessToken } from 'amazon-cognito-identity-js';
import { HubCallback } from '@aws-amplify/core/lib/Hub';
import { CognitoUser } from '@aws-amplify/auth';

interface IUser {
  username: string;
  token: CognitoAccessToken;
}

export enum STATUS {
  PENDING,
  DONE,
  ERROR,
}

interface IAuthContext {
  user: IUser | null;
  login(username: string, password: string): Promise<CognitoUser>;
  logout(): Promise<any>;
  status: STATUS;
}
const login = async (username: string, password: string): Promise<CognitoUser | any> => {
  try {
    await Auth.signIn({ username, password });
  } catch (error) {
    console.log(error);
  }
};

const logout = (): Promise<any> => Auth.signOut();

export const useCognito = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [status, setStatus] = useState(STATUS.PENDING);
  const authListener: HubCallback = ({ payload: { event, data } }) => {
    const newData = data as {
      username: string;
      signInUserSession: { accessToken: CognitoAccessToken };
    };
    switch (event) {
      case 'signIn':
        setUser({ username: newData.username, token: newData.signInUserSession.accessToken });
        break;
      case 'signOut':
        setUser(null);
        break;
    }
  };

  useEffect(() => {
    getSession()
      .then((session) => {
        if (session && session.isValid()) {
          Auth.currentUserInfo().then((user: IUser) => {
            setUser({
              username: user.username,
              token: session.getAccessToken(),
            });
            setStatus(STATUS.DONE);
          });
        }
      })
      .catch((error) => {
        setStatus(STATUS.ERROR);
      });
  }, []);

  useEffect(() => {
    Hub.listen('auth', authListener);
    return () => Hub.remove('auth', authListener);
  }, []);

  return { user, login, logout, status };
};

const getSession = (): Promise<CognitoUserSession | null> => Auth.currentSession();

export const AuthContext = createContext<IAuthContext>({
  user: null,
  login,
  logout,
  status: STATUS.PENDING,
});

export const useAuth = () => {
  return useContext(AuthContext);
};
