import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
//import the required libraries to integrate our queries into our web application
import { useQuery, gql } from '@apollo/client';

// our GraphQL query, stored as a variable
const GET_NOTES = gql`
  query NoteFeed {
    noteFeed {
      notes {
        id
        content
        author {
          id
          username
          email
        }
        favoriteCount
        createdAt
        updatedAt
      }
    }
  }
`;

const Home = () => {
  // query hook
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;
  // if the data is successful, display the data in our UI
  return (
    <div>
      {/* <Header /> */}
      <Navigation />
      <p>This is the home page</p>
      <div>
        {data.noteFeed.notes.map(item => (
          <div>{item.id}</div>
        ))}
      </div>
      {/* <Outlet /> */}
    </div>
  );
};

export default Home;
