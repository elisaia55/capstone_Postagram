import { useDispatch } from "react-redux";
import { deleteComment } from "../../store/post";
import { OpenModal } from "../../context/OpenModal";


const CommentMenu = ({ comment }) => {
    const dispatch = useDispatch();
    const { setCommentId } = OpenModal();

    const del = () => {
        dispatch(deleteComment(comment.comment.id));
        setCommentId(0);
    };

    return (
        <div className="delete-conf-settings">
            <div className="del-conf-top">
                <p className="del-title">Delete Comment?</p>
                <p className="del-desc">
                    Are you sure you want to delete this comment?
                </p>
            </div>
            <div className="delete-post" onClick={ del }>
                <span className="del-btn">Delete</span>
            </div>
            <div className="goto-post" onClick={ () => setCommentId(0) }>
                Cancel
            </div>
        </div>
    );
};

export default CommentMenu;
