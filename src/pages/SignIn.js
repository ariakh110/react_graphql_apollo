import React, { useEffect, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
// import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
// import { SIGNIN_USER } from '../gql/mutation';

const SIGNIN_USER = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password)
  }
`;

const SignIn = () => {
  // const { setLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    // update the document title
    document.title = 'Sign In — Notedly';
  });

  //const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      // store the token
      localStorage.setItem('token', data.signIn);
      // update the local cache
      setLoggedIn(true);
      if (redirectBack) {
        setRedirectBack(false);
        navigate(-1);
      } else navigate('/');
    },
    onError: error => {
      console.log(error);
    }
  });
  /* if the data is loading, display a loading message*/
  loading && <p>Loading...</p>;
  /* if there is an error, display a error message*/
  error && <p>Error signing in!</p>;
  return <UserForm action={signIn} formType="signIn" />;
};

export default SignIn;
