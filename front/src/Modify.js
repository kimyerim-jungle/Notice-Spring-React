import './style/Write.css';
import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";


function Modifying() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();
    const params = useParams();

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }
    const handleChangeContent = (event) => {
        setContent(event.target.value);
    }

    const sendModify = async (e) => {
        e.preventDefault();
        const index = Number(params.idx);
        if (!sessionStorage.getItem("name")){
            alert("로그인이 필요합니다");
            navigate("/login");
        }
        else
            var userName = sessionStorage.getItem("name");
        await axios.post(`/${index}/modify/send`, {
            "title":title,
            "content":content,
            "userName": userName,
            "userId": sessionStorage.getItem("id")
        }, {"Content-Type": "application/json"})
            .then(function (res) {
                const code = res.data.toString();
                if (code === "150") {
                    alert("수정되었습니다");
                    navigate(`/${index}`);
                }
                else
                    alert("다시 시도해주세요");
            })
    }

    return (
        <div className={"write-form"}>
            <form onSubmit={sendModify}>
                <p><input className={"input post-title"} type={"text"} value={title}
                          onChange={handleChangeTitle}/></p>
                <p><textarea className={"textarea is-info posting"} value={content}
                             onChange={handleChangeContent}/></p>

                <button className={"button is-info post-submit"} type={"submit"}>등록하기</button>

            </form>
        </div>
    );
}


function Modify(){
    return(
        <Modifying></Modifying>
    );
}

export default Modify;