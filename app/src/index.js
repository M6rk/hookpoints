import React from 'react';
import ReactDOM from 'react-dom/client';
import './firebase.js';
import './global.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InvalidRoute from './pages/InvalidRoute';
import Photos from './pages/Photos';
import Settings from './pages/Settings';
import FishSpot from './pages/FishSpot';

const router = createBrowserRouter([
  {
    // '/' path -> homepage
    path : '/',
    element : <HomePage />
  },
  {
    path: '*',
    element: <InvalidRoute />, // Replace with your 404 component
  },
  {
    path: '/photos',
    element : <Photos />
  },
  {
    path: '/spots',
    element : <FishSpot />
  },
  {
   path: '/settings',
   element : <Settings />
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
