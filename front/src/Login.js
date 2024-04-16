import styles from './style/Login.module.css';
import axios from 'axios';
import React, {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import { UserContext } from "./auth/UserContext";
import { useCookies } from "react-cookie";

function Login() {
    const [userid, setId] = useState('');
    const [password, setPW] = useState('');

    const navigate = useNavigate();

    const handleChangeId = (event) => {
        setId(event.target.value);
    }

    const handleChangePW = (event) => {
        setPW(event.target.value);
    }
    const sendForm = async (e) => {
        e.preventDefault();
        await axios.post("/login/welcome", {
            'userId':userid,
            'userPW':password
        }, {"Content-Type": 'application/json'})
            .then(function (res) {
                console.log(res);
                const code = res.data["code"];
                if (code === "101"){
                    alert("login 성공");
                    sessionStorage.setItem("name", res.data["name"]);
                    sessionStorage.setItem("id", res.data["id"]);
                    console.log("session", sessionStorage);
                    navigate("/main");
                }
                else if(code === "501") {
                    alert("존재하지 않는 ID입니다");
                }
                else if(code === "502") {
                    alert("비밀번호가 일치하지 않습니다");
                }

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className={styles.loginform}>
            <form onSubmit={sendForm}>
                <div className={"control"}>
                    <p><input className={"input is-info " + styles.login} type={"text"} placeholder={"ID"} value={userid}
                              onChange={handleChangeId}/></p>
                    <p><input className={"input is-info " + styles.login} type={"text"} placeholder={"Password"} value={password}
                              onChange={handleChangePW}/></p>
                </div>

                <button className={"button is-info is-rounded " + styles.button} type={"submit"}>login</button>
                <br></br>
                <button className={"button is-link is-light is-rounded " + styles.button} onClick={() => {
                    navigate("/signup");
                }}>회원가입</button>
            </form>
        </div>
    );
};

export default Login;

