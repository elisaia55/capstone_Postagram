import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { OpenModal } from "../../context/OpenModal";
import NewPostModal from "../PostModal/PostModal";
import ProfileDropDown from "./ProfileDropDown";
import HomeFilled from '../../images/HomeSEL.png'
import HomeEmpty from '../../images/HomeUN.png'
import MsgEmpty from '../../images/msgEmptynew.png'
import MsgFilled from "../../images/msgFillednew.png";
import ExploreFilled from '../../images/DiscoverSEL.png'
import ExploreEmpty from '../../images/DiscoverUN.png'
import SearchBar from "../Searchbar";
import NotifFilled from '../../images/NotifsSEL.png'
import NotifEmpty from '../../images/NotifsUN.png'
import './Navigation.css'


const Navigation = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const ref = useRef()
    const [input, setInput] = useState("");

    const [dropDownMenu, setDropDownMenu] = useState(false)

    const { num } = OpenModal();
    const path = window.location.pathname;

    const user = useSelector((state) => state.session?.user);

    useEffect(() => {
        const outsideClick = (e) => {
            if (dropDownMenu && ref.current && !ref.current.contains(e.target)) {
                setDropDownMenu(false)
            }
        }
        document.addEventListener("click", outsideClick);
    }, [dropDownMenu])

    return (
        <div className="outer-nav-container">
            <div className="mid-nav-container">
                <a className="main-logo-nav" onClick={ () => history.push("/") }>
                    Postagram
                </a>
                
                <div className="search-container">
                    
                    <div className="right-nav">
                        { path === "/" && num !== 1 ? (
                            <div onClick={ () => history.push("/") } className="nav-btns">
                                <img className="dm-btn" src={ HomeFilled }></img>
                            </div>
                        ) : (
                            <div onClick={ () => history.push("/") } className="nav-btns">
                                <img className="dm-btn" src={ HomeEmpty }></img>
                            </div>
                        ) }
                      
                        
                        <NewPostModal />
                       
                        <img
                        className="dropdown-menu-profile"
                        ></img>
                    <div onClick={() => setDropDownMenu(!dropDownMenu)} ref={ref} className="nav-drop-img-container">
                        <img src={user.image_url} id='navbar-profile-img' alt={`${user.username}'s Profile Picture`}/>
                        {dropDownMenu && <ProfileDropDown user={user}/>}
                    </div>
                    </div>

                </div>

            </div>
        </div>
    );
};
export default Navigation;
