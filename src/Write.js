import logo from './logo.svg';
import './style/Write.css';
import axios from 'axios';
import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import { UserContext } from "./auth/UserContext";

function Writing(){
    const { user } = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }
    const handleChangeContent = (event) => {
        setContent(event.target.value);
    }

    const sendWrite = async (e) => {
        e.preventDefault();
        if (!user){
            alert("로그인이 필요합니다");
        }
        await axios.post("/write/send", {
            "title":title,
            "content":content,
            "userName":user.name,
            "date": new Date()
        }, {"Content-Type": "application/json"})
            .then(function (res) {
                console.log(res);
                const code = res.data.toString();
                if (code === "130"){
                    alert("upload 성공");
                    navigate("/");
                }
                else if (code === "530"){
                    alert("실패. 다시 시도해주세요");
                }
            })
    }

    return (
        <div className={"write-form"}>
            <form onSubmit={sendWrite}>
                <p><input className={"input post-title"} type={"text"} value={title}
                    onChange={handleChangeTitle}/></p>
                <p><textarea className={"textarea is-info posting"} value={content}
                    onChange={handleChangeContent}/></p>

                <button className={"button is-info post-submit"} type={"submit"}>등록하기</button>

            </form>
        </div>
    );
}

function Write() {
    return (
        <Writing></Writing>
    );
}

export default Write;