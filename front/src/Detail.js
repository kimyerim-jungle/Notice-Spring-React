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

function DeleteBtn() {
    const params = useParams();
    const navigate = useNavigate();
    const index = Number(params.idx);

    const postModify = async (e) => {
        e.preventDefault();
        // await axios.post(`/${index}/modify`)
        //     .then(function (res){
        //         const code = res.data.toString();
        //         if(code === "150") {
        //             alert("수정되었습니다");
        //             window.location.reload();
        //         }
        //         else {
        //             alert("다시 시도해주세요");
        //         }
        //     })
        navigate(`/${index}/modify`);
    }

    const postDelete = async (e) =>{
        e.preventDefault();

        await axios.post(`/${index}/delete`)
            .then(function (res){
            const code = res.data.toString();
            if(code === "160") {
                alert("삭제되었습니다");
                navigate("/main");
            }
            else {
                alert("다시 시도해주세요");
            }
        })
    }
    
    return (
        <div className={"columns"}>
            <span className={"column"}></span>
            <button className={"button is-success is-outlined detail-btn column is-1"} onClick={postModify}>수정</button>
            <button className={"button is-danger is-outlined detail-btn column is-1"} onClick={postDelete}>삭제</button>
        </div>
    );
}

function addArticle(title, content, user, date) {
    const main = content.split("\n");
    //console.log("session:", sessionStorage.getItem("id"), " user:",user)
    return (
        <>
        <div className={"message-header"}>
            <span className={""}>{title}</span>
            <span className={""}>{user}</span>
            <spen className={""}>{date}</spen>
            </div>
        <div className={"message-body has-text-left"}>
            {main.map (elem => {
                return <p>{elem}</p>
            })}
        </div>
            { sessionStorage.getItem("id") === user ? <DeleteBtn/> : null }
        </>
    );
}

function addComment(content, user, date) {
    return (
        <>
        <div className={"message is-light"}>
            <p className={"message-header"}><span>{user}</span><span className={"level-right"}>{date}</span></p>
            <p className={"message-body"}>{content}</p>
        </div>
      </>
    );
}

function Comment() {
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
                //console.log(res);
                const code = res.data.toString();
                if (code === "140"){
                    setComment("");
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
                 <p><input className={"input"} type={"text"} value={comment}
                   onChange={handleChangeComment}/>
                <button className={"button is-info"} type={"submit"}>등록</button>
                 </p>
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
        //console.log("post:", res.data);
        const inputData = {
            ...res.data,
            postDate: res.data.postDate.split('T')[0]
        }
        setPost(inputData);
        console.log("data:", inputData);
    }
    const getComment = async () => {
        const index = Number(params.idx);
        const res = await axios.get(`/${index}/getCmt`);
        const inputData = {
            ...res.data,
                //cmtDate: res.data.cmtDate.split('T')[0]
        }
        setComment(inputData);
        setKeys(Object.keys(inputData));
        //console.log("comment:", inputData);
    }
    useEffect( () =>  {
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
        navigate("/main");
    }

    return (
        <>
            <div className={"wrap"}>
                <div className={"columns"}>
                    <button className={"button is-info level-left detail-btn column is-1"} onClick={back}>Main</button>
                    <span className={"column"}></span>
                </div>
                <OnePost />
                <Comment />
            </div>
        </>
    );
};

export default Detail;