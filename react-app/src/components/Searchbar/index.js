import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/user";
import './searchbar.css'

export default function SearchBar() {
    const history = useHistory()
    const dispatch = useDispatch()

    const [inputField, setInputField] = useState("")
    const [dropDown, setDropDown] = useState(false)

    const [dropDownResults, setDropDownResults] = useState([])
    const [emptyRes, setEmptyRes] = useState(false)
    const allUsersList = useSelector(state => state.users.allUsers);


    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const handleChange = (searchText) => {
        setInputField(searchText)
        if (searchText) {
            setDropDownResults([])
        let searchInput = searchText.toLowerCase();

        const searchResults = allUsersList.filter(user => user.username.toLowerCase().startsWith(searchText))
        if (!searchResults.length) {
            setEmptyRes(true)
            setDropDownResults(true)
        } else {
            setEmptyRes(false)
            setDropDownResults(dropDownResults)
            setDropDown(true)
        }
    }     else {
            setDropDown(false)
    }
    }
    if (!allUsersList)
    return "No results found"
        return (
            <>
            <div className="search-container"></div>
            </>
        )
}
