import logo from './logo.svg';
import './style/Main.css';
import axios from 'axios';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from "react-router-dom";

import Login from './Login';
import {UserContext} from "./auth/UserContext";


function Header() {
    const navigate = useNavigate();
    const {user, updateUser} = useContext(UserContext);

    const handleLogout = () => {
        alert("logout 되었습니다");
        updateUser(null);
    };

    return (
        <header className="title">
            <h1>게시판</h1>
            <div className="header">
                <button className="button is-info is-outlined" onClick={() => {
                    navigate("/write");
                }}>글쓰기
                </button>
                { user ? (<button className="button is-info" onClick={handleLogout}>로그아웃</button>)
                    :(<button className="button is-info" onClick={() => {
                        navigate("/login");
                    }}>로그인</button>)
                }
            </div>
        </header>
    );
};


function Article() {
    return (
        <>
            <div>

            </div>
        </>
    );
}

function Table() {
    return (
        <div className={"post-list"}>
            <table className="table is-striped">
                <thead>
                <tr>
                    <th className="post-title">글제목</th>
                    <th className="post-user">글쓴이</th>
                    <th>작성일</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><a href={"www"}>월요일 맛집</a></td>
                    <td>예림</td>
                    <td>04-08</td>
                </tr>

                <tr>
                    <td><a href={"www"}>화요일 맛집</a></td>
                    <td>예림</td>
                    <td>04-08</td>
                </tr>

                <tr>
                    <td><a href={"www"}>월수금요일 맛집</a></td>
                    <td>예림</td>
                    <td>04-08</td>
                </tr>
                </tbody>

            </table>
        </div>
    );
}


const Main = (props) => {


    return (
        <>
            <Header props={props}></Header>
            <Table></Table>

        </>
    );
};

export default Main;