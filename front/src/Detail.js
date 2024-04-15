import './style/Detail.css';
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";



function Log() {
    return (
        <div>Loading..</div>
    );
}

function article(title, content, user, date) {
    return (
        <>
        <div className={"message-header"}>{title}</div>
        <div className={"message-body has-text-left"}>{content}</div>
        </>
    );
}

function OnePost() {
    const params = useParams();
    const [post, setData] = useState(null);
    const [date, setDate] = useState([]);

    const getPost = async () => {
        const index = Number(params.idx);
        const res = await axios.get(`/${index}`);

        setData(res.data);
        console.log("data:", post);
        setDate(post.postDate.split('T'));
    }
    useEffect( () => {
        getPost();
    }, []);

    return (
        <article className={"message is-info post"}>
        { post ? article(post.postTitle, post.postContent, post.userId, date[0]) : null }
        </article>
    );
}

const Detail = () => {
    const navigate = useNavigate();

    function back() {
        navigate(-1);
    }

    return (
        <>

            <div className={"wrap"}>
                <button className={"button is-info level-left back-btn"} onClick={back}>뒤로</button>
                <OnePost/>
            </div>
        </>
    );
};

export default Detail;