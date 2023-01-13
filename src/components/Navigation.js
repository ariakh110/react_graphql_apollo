import React from 'react';
import { Link } from 'react-router-dom';
import { IS_LOGGED_IN } from '../gql/query';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <span aria-hidden="true" role="img">
              🏠
            </span>
            Home
          </Link>
        </li>
        <li>
          <Link to="mynotes">
            <span aria-hidden="true" role="img">
              📓
            </span>
            My Notes
          </Link>
        </li>
        <li>
          <Link to="favorites">
            <span aria-hidden="true" role="img">
              🌟
            </span>
            Favorites
          </Link>
        </li>
        {IS_LOGGED_IN && (
          <li>
            <Link to="signup">
              <span aria-hidden="true" role="img">
                🌟
              </span>
              Sign Up
            </Link>
          </li>
        )}
        {IS_LOGGED_IN && (
          <li>
            <Link to="signin">
              <span aria-hidden="true" role="img">
                🌟
              </span>
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
