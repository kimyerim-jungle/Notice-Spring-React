import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import axios from "axios";
import styles from "./style/Login.module.css";

function Signup() {
    const [userid, setId] = useState('');
    const [password, setPW] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const handleChangeId = (event) => {
        setId(event.target.value);
    }

    const handleChangePW = (event) => {
        setPW(event.target.value);
    }

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const sendForm = async (e) => {
        e.preventDefault();
        await axios.post("/signup/welcome", {
            'userId':userid,
            'userPW':password,
            'userName':name
        }, {"Content-Type": 'application/json'})
            .then(function (res) {
                console.log(res);
                if (res.data.toString() === "510"){
                    console.log("duplicate");
                    alert("중복된 아이디입니다");
                }
                else if (res.data.toString() === "102"){
                    alert({name} + "님 환영합니다");
                    navigate("/login");
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <div className={styles.loginform}>
            <form onSubmit={sendForm}>
                <div className={"control"}> {/*style={{width: 300 + 'px'}}*/}
                    <p><input className={"input " + styles.signup} type={"text"} placeholder={"ID"} value={userid}
                              onChange={handleChangeId}/></p>
                    <p><input className={styles.signup + ' input'} type={"text"} placeholder={"Password"} value={password}
                              onChange={handleChangePW}/></p>
                    <p><input className={'input ' + styles.signup} type={"text"} placeholder={"Name"} value={name}
                              onChange={handleChangeName}/></p>
                </div>

                <button className={"button is-link is-rounded is-light " + styles.button} type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default Signup;