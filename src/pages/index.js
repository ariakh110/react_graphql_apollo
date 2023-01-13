// import React and our routing dependencies
import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// import our routes
import Home from './Home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import Layout from '../components/Layout';
import NotePage from './note';
import SignUp from './signup';
import SignIn from './SignIn';

// define our routes
const Pages = () => {
  // const { loggedIn, setRedirectBack } = useContext(UserContext);

  // const privateRoute = (route, signInAddress) => {
  //   if (loggedIn) return route;
  //   else {
  //     setREdirecrBack(true);
  //     return <Navigate to={signInAddress} />;
  //   }
  // };
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
  return <RouterProvider router={router} />;
};

export default Pages;
// <Layout>

{
  /* <Route path="/home" element={<Navigate replace to="/" />} /> */
}
{
  /* <Route
            path="mynotes"
            element={privateRoute(<MyNotes />, '../signin')}
          /> */
}
{
  /* <Route
            path="favorites"
            element={privateRoute(<Favorites />, '../signin')}
          /> */
}
{
  /* <Route path="note/:id" element={<NotePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} /> */
}
// </Layout>
