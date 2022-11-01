import React from "react";
import { Modal } from "../../context/Modal";
import { OpenModal } from "../../context/OpenModal";
import Menu from './index'
import "./Menu.css";

const MenuModal = ({ post }) => {
    const { postId, setPostId } = OpenModal();

    return (
        <>
            <img
                className="post-options"
                onClick={ () => setPostId(post?.post.id) }
                src="https://img.icons8.com/material-two-tone/24/000000/more.png"
            />
            { postId === post?.post.id && (
                <Modal onClose={ () => setPostId(0) }>
                    <Menu post={ post } />
                </Modal>
            ) }
        </>
    );
};

export default MenuModal;
