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
import Modify from "./Modify";

import "bulma/css/bulma.css";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/main"/>}></Route>
                <Route path="/main" element={<Main />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/write" element={<Write />}></Route>

                <Route path="/:idx" element={<Detail />}></Route>
                <Route path="/:idx/modify" element={<Modify />}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
