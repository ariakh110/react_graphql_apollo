import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom';

import {
  ApolloClient,
  ApolloProvider,
  // createHttpLink,
  httpLink,
  from,
  InMemoryCache,
  HttpLink
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { onError } from '@apollo/client/link/error';
/********************************************************** */
import GlobalStyle from './components/GlobalStyle';
import Pages from './pages';
import NotePage from './pages/note';
import SignUp from './pages/signup';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
/********************************************************** */
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      console.log({ message });
    });
  }
});
const link = from([errorLink, new HttpLink({ uri: process.env.API_URI })]);
const router = createBrowserRouter([
  {
    path: '/home',
    element: <Navigate replace to="/" />
  },
  {
    path: '/note/:id',
    element: <NotePage />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/signin',
    element: <SignIn />
  },
  {
    path: '/',
    element: <Home />
  }
]);
// import global styles---------->{ global style must be <GlobalStyle/> in jsx}

// import our routes
// import Pages from './pages/index';

// // configure our API URI & cache
// const uri = process.env.API_URI;
// const httpLink = createHttpLink({ uri });
// const cache = new InMemoryCache();

// // return the headers to the context
// const authLink = setContext((_, { headers }) => {
//   console.log(headers);
//   return {
//     headers,
//     authorization: Boolean(localStorage.getItem('token'))
//       ? localStorage.getItem('token')
//       : ''
//   };
// });

// // create the Apollo client
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
  // resolvers: {},
  // connectToDevTools: true
});

// // check for a local token
const data = {
  isLoggedIn: !!localStorage.getItem('token')
};
console.log(data);
// write the cache data on initial load
// cache.writeData({ data });
// // write the cache data after cache is reset
// client.onResetStore(() => cache.writeData({ data }));

{
  /* <ApolloProvider client={client}>
  <GlobalStyle />
      <Pages />
</ApolloProvider> */
}
console.log('Hiiii');
export default function App() {
  return <></>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
//ReactDOM.createRoot(document.getElementById('root')).render(<App />);
// ReactDOM.render(<App />, document.getElementById('root'));
