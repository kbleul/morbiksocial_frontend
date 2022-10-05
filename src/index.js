import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import App from './App';

import  AuthContextProvider  from "./contex/authContext"
import  PostContextProvider  from "./contex/postContext"
import NewuserContextProvider from "./contex/newSignupContext"
import NotificContextProvider from "./contex/notificationContext"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider >
        <NewuserContextProvider>
           <PostContextProvider>
              <NotificContextProvider>
                 <App />
              </NotificContextProvider>
           </PostContextProvider>
        </NewuserContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
