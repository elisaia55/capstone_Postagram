import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { close } from "./iconsLikes";
import { OpenModal } from "../../context/OpenModal";
import { Modal } from "../../context/Modal";
import Unfollow from "../UserProfile/Unfollow";
import "./Likes.css";
// import { findFollowers, followUser } from "../../store/follow";

const Likes = ({ users }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { setLikes, unfollow2, setUnfollow2 } = OpenModal();
    const [unfollowed, setUnfollowed] = useState();
    const main = useSelector((state) => state.session.user);
    const following = useSelector((state) => state.follow[main?.id]?.following);

    // useEffect(() => {
    //     dispatch(findFollowers(main?.id));
    // }, [main]);

    // const follow = (id) => {
    //     dispatch(followUser(id)).then(() => dispatch(findFollowers(main?.id)));
    // };

    return (
        <div className="likes-main">
            <div className="likes-top">
                <div className="likes-header">Likes</div>
                <div className="likes-close" onClick={ () => setLikes(0) }>
                    { close }
                </div>
            </div>
            <div className="likes-bot">
                { users?.length > 0 &&
                    users?.map((user) => (
                        
                        <div className="likes-card">
                            <img
                                className="likes-img"
                                src={ user?.image_url }
                                onClick={ () => {
                                    setLikes(0);
                                    history.push(`/users/${user.id}`);
                                } }
                            />
                            
                            <div className="likes-details">
                                <div
                                    className="likes-username"
                                    onClick={ () => {
                                        setLikes(0);
                                        history.push(`/users/${user.id}`);
                                    } }
                                >
                                    { user.username }
                                </div>
                                <div className="likes-name">{ user.name }</div>
                            </div>
                            
                        </div>
                    )) }
            </div>
        </div>
    );
};

export default Likes;
