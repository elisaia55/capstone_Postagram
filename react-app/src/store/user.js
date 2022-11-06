const UPDATE_USER = 'user/UPDATE_USER'
const GET_USERS = 'users/GET_ALL_USERS'
const LOAD_SINGLE_USER = 'users/LOAD_SINGLE_USER'


const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: user,
})

const getUsers = (user) => ({
    type: GET_USERS,
    payload: user
})

const GetUniqueUser = (user) => ({
    type: LOAD_SINGLE_USER,
    payload: user
})



// const findUser = (username) => { async (dispatch) => {
//     const res = await fetch(`/api/users/get/${username}`)
// }
// }

export const getAllUsers = () => async (dispatch) => {
    const res = await fetch(`/api/users/suggestedUsers`)
    if (res.ok) {
        const data = await res.json();
        dispatch(getUsers(data))
        return null;
    } else {
        return ["Something went wrong, try again"]
    }
}

export const userUpdate = (id) => async (dispatch) => {
    const res = await fetch(`api/users/${id}`);
    console.log(res, "USERS HIT HERE {}{}{}{}{}{}{}{}{}{}[][}[}[}[}[}[][][]{]{][]")
    const data = await res.json()
    dispatch(updateUser(data));
}

const initialState = { user: null }

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {...state, allUsers: action.payload}
        case UPDATE_USER:
            return { user: action.payload }
        default:
            return state;
    }
}
