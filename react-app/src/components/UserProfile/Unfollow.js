import { useDispatch, useSelector } from "react-redux";
import { OpenModal } from "../../context/OpenModal";
import { unfollow, findFollowers } from "../../store/follow";
import { getPostFollowing } from "../../store/post";

const Unfollow = ({ user }) => {
    const dispatch = useDispatch();
    const { setNum, setPostId, setUnfollow, setUnfollow2 } = OpenModal();
    const main = useSelector((state) => state.session.user);

    const remove = () => {
        dispatch(unfollow(user?.id))
            .then(() => dispatch(getPostFollowing(main?.id)))
            .then(() => dispatch(findFollowers(main?.id)));
        setNum(0);
        setPostId(0);
        setUnfollow(0);
        setUnfollow2(0);
    };

    return (
        <div className="unfollow-settings">
            <div className="unfollow-img-c">
                <img className="unfollow-img" src={ user?.image_url } />
            </div>
            <p className="unfollow-desc">Unfollow @{ user?.username }?</p>
            <div className="unfollow-p" onClick={ remove }>
                Unfollow
            </div>
            <div
                className="unfollow-cancel"
                onClick={ () => {
                    setPostId(0);
                    setNum(0);
                    setUnfollow(0);
                    setUnfollow2(0);
                } }
            >
                Cancel
            </div>
        </div>
    );
};

export default Unfollow;
