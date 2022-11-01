import React, { useState } from "react"
import { Modal } from "../../context/Modal"
import { OpenModal } from "../../context/OpenModal"
import NewPost from "./NewPost"
import "../Navigation/Navigation.css"
import PostFilled from '../../images/CreateSEL.png'
import PostEmpty from '../../images/CreateUN.png'

const NewPostModal = () => {
    const { num, setNum } = OpenModal();

    return (
        <>
            { num === 0 ? (
                <div
                    onClick={ () => setNum(1) }
                    className="nav-btns"
                >
                    <img className="dm-btn" src={ PostEmpty }></img>
                </div>
            ) : (
                <div
                    onClick={ () => setNum(1) }
                    className="nav-btns"
                >
                    <img className="dm-btn" src={ PostFilled }></img>
                </div>
            ) }
            { num === 1 && (
                <Modal onClose={ () => setNum(0) }>
                    <NewPost />
                </Modal>
            ) }
        </>
    )
}
export default NewPostModal;
