import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { OpenModal } from "../../context/OpenModal";
import NewPostModal from "../PostModal/PostModal";
import HomeFilled from '../../images/HomeSEL.png'
import HomeEmpty from '../../images/HomeUN.png'

import MsgEmpty from '../../images/msgEmptynew.png'
import MsgFilled from "../../images/msgFillednew.png";

import ExploreFilled from '../../images/DiscoverSEL.png'
import ExploreEmpty from '../../images/DiscoverUN.png'

import NotifFilled from '../../images/NotifsSEL.png'
import NotifEmpty from '../../images/NotifsUN.png'
import './Navigation.css'


const Navigation = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [input, setInput] = useState("");
    const { num } = OpenModal();
    const path = window.location.pathname;

    const user = useSelector((state) => state.session?.user);

    return (
        <div className="outer-nav-container">
            <div className="mid-nav-container">
                <a className="main-logo" onClick={ () => history.push("/") }>
                    Postagram
                </a>
                <div className="search-container">
                    {/* <input
                        className="search-bar"
                        placeholder="Search for Users"
                    >
                    </input> */}
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
                        { path === "/messages" && num !== 1 ? (
                            <div
                                className="dm-btn"

                                onClick={ () => history.push("/messages") }
                            >
                                <img className="dm-btn" src={ MsgFilled }></img>
                            </div>
                        ) : (
                            <div
                                className="dm-btn"
                                onClick={ () => history.push("/messages") }
                            >
                                <img className="dm-btn" src={ MsgEmpty }></img>
                            </div>
                        ) }
                        <NewPostModal />
                        { path === "explore" && num !== 1 ? (
                            <div
                                className="nav-msg-btn"
                                onClick={ () => history.push("/explore") }
                            >
                                <img className="dm-btn" src={ ExploreFilled }></img>
                            </div>
                        ) : (
                            <div
                                className="nav-msg-btn"
                                onClick={ () => history.push("/explore") }
                            >
                                <img className="dm-btn" src={ ExploreEmpty }></img>
                            </div>
                        ) }
                        <p>NOTIFS BUTTON</p>
                    </div>

                </div>

            </div>
        </div>
    );
};
export default Navigation;
