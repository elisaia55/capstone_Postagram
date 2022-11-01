import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-redux"
import { findPosts } from "../../store/post";
import { findFollowers, followUser } from "../../store/follow";
import UserModal from "./UserProfileModal";
import { Modal } from "../../context/Modal";
import { OpenModal } from "../../context/OpenModal";
import { userUpdate } from "../../store/user";
