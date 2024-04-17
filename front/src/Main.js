import './style/Main.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";


function Header() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    const handleLogout = () => {
        alert("logout 되었습니다");
        sessionStorage.clear();
        setIsLogin(false);
    };

    useEffect(() => {
        if(sessionStorage.getItem("name")){
            setIsLogin(true);
            console.log("Loing 상태입니다");
        }
    }, []);

    return (
        <header className="title">
            <h1>게시판</h1>
            <div className="header">
                <button className="button is-info is-outlined" onClick={() => {
                    navigate("/write");
                }}>글쓰기
                </button>
                { isLogin ? (<><p>{sessionStorage.getItem("name")}님</p><button className="button is-info" onClick={handleLogout}>로그아웃</button></>)
                    :(<button className="button is-info" onClick={() => {
                        navigate("/login");
                    }}>로그인</button>)
                }
                
            </div>
        </header>
    );
};

function addArticle(index, title, name, date){
    return(
        <>
            <tr>
                <td><a href={`http://localhost:3000/${index}`}>{title}</a></td>
                <td>{name}</td>
                <td>{date}</td>
            </tr>
        </>
    );
}

function Table() {
    const [items, setItems] = useState(null);
    const [keys, setKeys] = useState(null);

    const getAllPost = async () => {
        const res = await axios.get('/main');
        setItems(res.data);
        setKeys(Object.keys(res.data));
        //console.log(items);
    }
    useEffect(() => {
        getAllPost();
    }, []);

    return (
        <div className={"post-list"}>
            <table className="table is-striped">
                <thead>
                <tr>
                    <th className="post-title">글제목</th>
                    <th className="post-user">글쓴이</th>
                    <th className="post-date">작성일</th>
                </tr>
                </thead>
                <tbody>
                {items && keys.map(key => {
                    //console.log("key:", key);
                    const item = items[key];
                    const strArr = item.postDate.split('T');
                    return addArticle(item.postIndex, item.postTitle, item.userName, strArr[0])
                })}
                </tbody>
            </table>
        </div>
    );
}


// <Table props={props}></Table>
const Main = () => {

    return (
        <>
            <Header></Header>
            <Table></Table>
        </>
    );
};

export default Main;