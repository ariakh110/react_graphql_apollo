import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.svg';

//new dependencies
import { useQuery, gql } from '@apollo/client';

// import both Link and withRouter from React Router
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
// import the ButtonAsLink component
import ButtonAsLink from './ButtonAsLink';
import { UserContext } from './UserContext';
import styled from 'styled-components';

//local query
const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const UserState = styled.div`
  margin-left: auto;
`;

const Header = () => {
  //   // query hook for user logged in state
  //   // including the client for referencing the Apollo store
  // const { data, client } = useQuery(IS_LOGGED_IN);

  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <HeaderBar>
      <img src={logo} alt="Notedly Logo" height="40" />
      <LogoText>Notedly</LogoText>
      {/* If logged in display a logout link, else display sign-in options */}
      <UserState>
        {loggedIn ? (
          <ButtonAsLink
            onClick={() => {
              localStorage.removeItem('token');
              // clear the application's cache
              client.resetStore();
              // update local state
              client.writeData({ data: { isLoggedIn: false } });
              // redirect the user to the homepage
              props.history.push('/');
            }}
          >
            Log Out
          </ButtonAsLink>
        ) : (
          <p>
            <Link to={'/signin'}>Sign In</Link> or{' '}
            <Link to={'/signup'}>Sign Up</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  );
};

// we wrap our component in the withRouter higher-order component
export default Header;
