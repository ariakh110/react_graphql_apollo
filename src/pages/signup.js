import React, { useEffect, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';

import { useMutation, gql, useApolloClient } from '@apollo/client';

import styled from 'styled-components';
import Button from '../components/Button';

import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
  mutation SignUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const From = styled.form`
  lable,
  input {
    display: block;
    line-height: 2em;
  }
  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

// include the props passed to the component for later use
const SignUp = () => {
  // set the default state of the form
  const [values, setValues] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const client = useApolloClient();

  //add the mutation hook
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      //store the JWT in localStorage
      localStorage.setItem('token', data.signUp);
      // update the local cache
      // client.writeData({ data: { isLoggedIn: true } });
      // redirect the user to the homepage
      // props.history.push('/');
      navigate('/');
    }
  });

  useEffect(() => {
    // update the document title
    document.title = 'Sign Up — Notedly';
  });
  useEffect(() => {
    if (isSuccess) {
      navigate('/');
      console.log(navigate);
      console.log('ok');
      setIsSuccess(false);
    }
  }, [isSuccess]);

  // update the state when a user types in the form
  const onChange = event => {
    console.log(event);
    setValues({
      ...values,
      [event.target.name]: event.target.values
    });
  };
  /* if the data is loading, display a loading message*/
  loading && <p>Loading...</p>;
  /* if there is an error, display a error message*/
  error && <p>Error signing in!</p>;
  return <UserForm action={signUp} formType="signUp" />;
  // render our form
  // return (
  //   <Wrapper>
  //     <h2>sign up </h2>
  //     <Form
  //       onsubmit={e => {
  //         e.preventDefault();
  //         props.action({
  //           variables: {
  //             ...values
  //           }
  //         });
  //       }}
  //     >
  //       <div>
  //         <label htmlFor="username">Username:</label>
  //         <input
  //           required
  //           type="text"
  //           id="username"
  //           name="username"
  //           placeholder="username"
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="email">Email:</label>
  //         <input
  //           required
  //           type="email"
  //           id="email"
  //           name="email"
  //           placeholder="Email..."
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="password">Password:</label>
  //         <input
  //           required
  //           type="password"
  //           id="password"
  //           name="password"
  //           placeholder="Password"
  //         />
  //       </div>
  //       <Button type="submit">Submit</Button>
  //     </Form>
  //   </Wrapper>
  // );
};

export default SignUp;
