import React, { useState, useRef, useEffect } from "react";
import { OpenModal } from "../../context/OpenModal";
import { useSelector, useDispatch } from "react-redux";
import { getPostFollowing, newPost, findPosts } from "../../store/post";
import { userUpdate } from "../../store/user";
import { postIcon } from "./postIcons";
import "./PostModal.css"

const NewPost = () => {
    const dispatch = useDispatch()
    const { num, setNum } = OpenModal();
    const [url, setUrl] = useState("");
    const [caption, setCaption] = useState("");
    const [imgUrl, setImgUrl] = useState("")
    const [errors, setErrors] = useState([]);
    const [image, setImage] = useState(true)
    const path = window.location.pathname

    const user = useSelector((state) => state.session?.user);

    useEffect(() => {
        setErrors([]);

    }, [url])

    const handleSubmit = () => {
        let postErr = []

        if (!url.length) {
            postErr.push("Please provide a valid image");
            return setErrors(postErr)
        }
        if (caption.length > 2200) {
            postErr.push("Caption cannot be longer than 2200 characters")
        }
        if (image !== true) {
            postErr.push("Please prove a valid image file")
        }
        if (postErr.length) {
            return setErrors(postErr)
        }
        const obj = {
            file: imgUrl,
            description: caption,
        };
        dispatch(newPost(obj))
            .then(() => dispatch(getPostFollowing()))
            .then(() => {
                if (path === `/users/${user?.id}`) {
                    dispatch(findPosts(user?.id));
                    dispatch(userUpdate(user?.id));
                }
            });

        setNum(0);

    }

    return (
        <>
            <div className="close-post-btn">
                <img src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik0zOC44MDA3OCwzMS4wNzQyMmwtNy43MjY1Niw3LjcyNjU2bDQ3LjE5OTIyLDQ3LjE5OTIybC00Ny4xOTkyMiw0Ny4xOTkyMmw3LjcyNjU2LDcuNzI2NTZsNDcuMTk5MjIsLTQ3LjE5OTIybDQ3LjE5OTIyLDQ3LjE5OTIybDcuNzI2NTYsLTcuNzI2NTZsLTQ3LjE5OTIyLC00Ny4xOTkyMmw0Ny4xOTkyMiwtNDcuMTk5MjJsLTcuNzI2NTYsLTcuNzI2NTZsLTQ3LjE5OTIyLDQ3LjE5OTIyeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
                    className="close-img"
                    onClick={ () => setNum(0) } />
            </div>
            <div className="new-post-container">
                <div className="new-post-top">
                    <p className="new-post-title">Create New Post</p>
                    <div className="post-submit-btn" onClick={ handleSubmit }>
                        Share
                    </div>
                </div>
                <div className="newPost-bot-container">
                    <div className="left-mid-container">
                        { url === "" ? (
                            <div className="preview-new-post">
                                { postIcon }
                                <div className="preview-new-video">Upload photos here</div>
                                <label className="new-post-upload" forhtml="new-photo">
                                    Select from Computer
                                    <input
                                        id="new-photo"
                                        type="file"
                                        className="hidden2"
                                        accept="image/*"
                                        onChange={ (e) => {
                                            setUrl(URL.createObjectURL(e.target.files[0]));
                                            setImgUrl(e.target.files[0]);
                                        } }
                                    />
                                </label>
                            </div>
                        ) : (
                            <img
                                className="image-preview"
                                src={ url }
                                onError={ () => setImage(false) }
                                onLoad={ () => setImage(true) }
                            />
                        ) }
                    </div>
                    <div className="right-mid-container">
                        <div className="user-new-post">
                            <img className="post-user-image" src={ user.image_url } />
                            <p className="post-username">{ user.username }</p>
                        </div>
                        <textarea
                            value={ caption }
                            onChange={ (e) => setCaption(e.target.value) }
                            className="new-post-caption"
                            placeholder="Write a caption..."
                            maxLength="2200"
                        />
                        <div>EMOJIS?</div>
                        <div className="character-count">{ caption?.length } / 2,200</div>

                    </div>
                    { url.length ? (
                        <div
                            className="new-url-post"
                            onClick={ () => {
                                setUrl("");
                                setImgUrl("");
                            } }
                        > Remove Image
                        </div>
                    ) : null }
                    { errors && errors.map((err) => <div className="new-post-err">{ err }</div>) }
                </div>
            </div>
        </>
    )
}
export default NewPost;
