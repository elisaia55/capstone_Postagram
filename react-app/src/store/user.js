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
export const singleUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`)
    if (res.ok) {
        const data = await res.json();
        dispatch(GetUniqueUser(data))
        return;
    } else {
        return ['Something went wrong, Please try again.']
    }
}


export const getAllUsers = () => async (dispatch) => {
    try {
        const res = await fetch(`/api/users/suggestedUsers`)
        if (!res.ok) {
            throw new Error(`Error! status: ${res.status}`)
        }
        const data = await res.json();
        dispatch(getUsers(data))
        return null;

    } catch (err) {
        console.log(err)
    }

} 



const initialState = { user: null }

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SINGLE_USER:
            return {...state, single: action.payload}
        case GET_USERS:
            return {...state, allUsers: action.payload}
        case UPDATE_USER:
            return { user: action.payload }
        default:
            return state;
    }
}
