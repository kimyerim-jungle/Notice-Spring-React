import logo from './logo.svg';
import './style/App.css';
import React from 'react';
import axios from 'axios';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Main from './Main';
import Login from './Login';
import Signup from "./Signup";
import Write from "./Write";
import Detail from "./Detail";
import "bulma/css/bulma.css";

import { UserProvider } from "./auth/UserContext";


function App() {
  return (
    <div className="App">
        <UserProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/main"/>}></Route>
                <Route path="/main" element={<Main />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/write" element={<Write />}></Route>

                <Route path="/:idx" element={<Detail />}></Route>
            </Routes>
        </BrowserRouter>
        </UserProvider>
    </div>
  );
}

export default App;
