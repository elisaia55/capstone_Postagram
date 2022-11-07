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

    const [dropDownResults, setDropDownResults] = useState()
    const [emptyRes, setEmptyRes] = useState(false)
    const allUsersList = useSelector(state => state.user?.allUsers);
    

    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  dispatch(getAllUsers())
        return () => { ignore = true; }
        },[]);
   

    const searchChange = (searchText) => {
        setInputField(searchText)
        if (searchText) {
            setDropDownResults([])
        let searchInput = searchText.toLowerCase();
        const searchResults = allUsersList.filter(user => user.username.toLowerCase().startsWith(searchInput))
        if (searchResults.length <= 0) {
            setEmptyRes(true)
            setDropDownResults(true)
        } else {
            setEmptyRes(false)
            setDropDownResults(searchResults)
            setDropDown(true)
        }
    }     else {
            setDropDown(false)
    }
    }
    if (allUsersList === undefined)
    return null


        return (
            <>
            <div className="search-bar-container">
                <div className="search-input-field">

                <svg aria-label="Search" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>   
                <input 
                    className="search-bar-input"
                    type="text"
                    placeholder="Search for other users"
                    value={inputField}
                    onChange={(e) => searchChange(e.target.value)}/>

                </div>
                {dropDown &&  
                <div className="search-results-container">
                    {dropDownResults && dropDownResults.map && dropDownResults?.map((user, searchIdx) => {
                        return (
                            <div className="dropdown-container" key={user + searchIdx}>

                            <div className="dropdown-container2">
                                <a className="dropdown-result-user" href={`/users/${user.id}`}>
                                <img className="dropdown-userImg" src={user.image_url}alt="user profile picture"/>
                                <div className="dropdown-inner-container">
                                    <span className="dropdown-username">
                                        {user.username}
                                        
                                        </span>
                                        <span className="dropdown-name">
                                        {user.name}
                                        
                                        </span>
                                        

                                </div>

                                </a>

                            </div>
                            </div>
                        )
                    })}
                    {emptyRes && 
                    <div className="no-results-container">
                        <p className="no-results-text">
                            No Users Found
                        </p>
                    </div>
                    }

                </div>
                }


            </div>
            </>
        )
}
