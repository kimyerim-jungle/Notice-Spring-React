import logo from './logo.svg';
import './style/App.css';
import React from 'react';
import axios from 'axios';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from './Main';
import Login from './Login';
import Signup from "./Signup";
import Write from "./Write";
import "bulma/css/bulma.css";

import { UserProvider } from "./auth/UserContext";

function selectData(){
  axios.post('/startData', ['체리', '바나나', '딸기', '감']) // post
      .then(function(res){ // 이후 응답
        console.log(res)
      });
}

function Nav(){
    return (
        <nav>
            <div>
                <button onClick={() => selectData()}>과일</button>
            </div>
        </nav>
    );
}

function App() {
  return (
    <div className="App">
        <UserProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/write" element={<Write />}></Route>
            </Routes>
        </BrowserRouter>
        </UserProvider>
    </div>
  );
}

export default App;
