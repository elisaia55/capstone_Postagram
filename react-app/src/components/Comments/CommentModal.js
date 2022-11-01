import React from "react";
import { Modal } from "../../context/Modal"
import { OpenModal } from "../../context/OpenModal";
import CommentMenu from "./CommentMenu";



const CommentModal = ({ comment, hidden }) => {
    const { commentId, setCommentId } = OpenModal();

    return (
        <>
            <img
                className="comment-options"
                hidden={ hidden }
                onClick={ () => setCommentId(comment.comment.id) }
                src="https://img.icons8.com/material-two-tone/24/000000/more.png"
                style={ {
                    height: "22px",
                    width: "22px",
                    cursor: "pointer"
                } }
            />
            { commentId === comment.comment.id && (
                <Modal onClose={ () => setCommentId(0) }>
                    <CommentMenu comment={ comment } />
                </Modal>
            ) }
        </>
    );
};

export default CommentModal;
