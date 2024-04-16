import './style/Detail.css';
import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { UserContext } from "./auth/UserContext";



function Log() {
    return (
        <div>Loading..</div>
    );
}

function addArticle(title, content, user, date) {
    const main = content.split("\n");

    return (
        <>
        <div className={"message-header"}>
            <span>{title}</span>
            <span>{user}</span>
            <spen>{date}</spen>
            </div>
        <div className={"message-body has-text-left"}>
            {main.map (elem => {
                return <p>{elem}</p>
            })}
        </div>
        </>
    );
}

function addComment(content, user, date) {
    return (
      <>
          <div className={"notification is-light"}>
              <p><span>{user}</span><span>{date}</span></p>
              <p>{content}</p>
          </div>
      </>
    );
}

function Comment() {
    //const { user } = useContext(UserContext);
    const [comment, setComment] = useState("");

    const navigate = useNavigate();
    const params = useParams();

    const handleChangeComment = (event) => {
        setComment(event.target.value);
    }

    const sendComment = async (e) => {
        e.preventDefault();

        if (!sessionStorage.getItem("name")){
            alert("로그인이 필요합니다");
            navigate("/login");
        }

        const index = Number(params.idx);
        await axios.post(`/${index}/sendCmt`, {
            "comment": comment,
            "userName": sessionStorage.getItem("name"),
            "date": new Date()
        }, {"Content-Type": "application/json"})
            .then(function (res) {
                console.log(res);
                const code = res.data.toString();
                if (code === "140"){
                    setComment("");
                    //navigate(`/${index}`);
                    window.location.reload();
                }
                else if (code === "540" || code === "541"){
                    alert("실패. 다시 시도해주세요");
                }
            })
    }

    return (
        <div className={"comment-form"}>
            <form onSubmit={sendComment}>
                <div>
                     <input className={"input comment-from"} type={"text"} value={comment}
                       onChange={handleChangeComment}/>
                </div>
                <button className={"button is-info"} type={"submit"}>등록</button>

            </form>
        </div>
    );
}

function OnePost() {
    const params = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComment] = useState(null);
    const [keys, setKeys] = useState(null);

    const getPost = async () => {
        const index = Number(params.idx);
        const res = await axios.get(`/${index}`);

        const inputData = {
            ...res.data,
            postDate: res.data.postDate.split('T')[0]
        }
        setPost(inputData);
        //console.log("data:", inputData);
    }
    const getComment = async () => {
        const index = Number(params.idx);
        const res = await axios.get(`/${index}/getCmt`);
        if (res) {
            const inputData = {
                ...res.data,
                //cmtDate: res.data.cmtDate.split('T')[0]
            }
            setComment(inputData);
            setKeys(Object.keys(inputData));
            console.log("comment:", inputData);
        }
    }
    useEffect( () => {
        getPost();
        getComment();
    }, []);

    return (
        <>
            <article className={"message is-info post"}>
                { post ? addArticle(post.postTitle, post.postContent, post.userId, post.postDate) : null }
            </article>
            <div className={"comment"}>
                { comments && keys.map(key => {
                    const comment = comments[key];
                    const dateArr = comment.cmtDate.split('T');
                    return addComment(comment.comment, comment.userName, dateArr[0]);
                })}
            </div>
        </>
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
                <Comment />
            </div>
        </>
    );
};

export default Detail;