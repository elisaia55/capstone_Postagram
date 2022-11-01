import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OpenModal } from "../../context/OpenModal";
import { close } from "../Likes/LikeIcons";
import { Modal } from "../../context/Modal";
import { useHistory } from "react-router";
import Unfollow from "./Unfollow";
import { followUser, findFollows } from "../../store/follow";
import DeleteFollower from "./DeleteFollower";
