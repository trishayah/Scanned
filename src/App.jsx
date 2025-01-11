import React from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './login.jsx';
import Registration from './Registration.jsx';
import UserProfile from './DisplayProfile.jsx';
import Scan from './scan';
import Capture from './capture';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
        {path:"/" ,element:<Login /> },
        {path:"/register", element:<Registration />},
        {path:"/profile", element:<UserProfile />} ,
        {path:"/scan", element:<Scan /> },
        {path:"/capture" ,element:<Capture /> },
  ])
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </>
  )
}


export default App;