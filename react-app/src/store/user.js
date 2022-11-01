const UPDATE_USER = 'user/UPDATE_USER'

const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: user,
})


export const userUpdate = (id) => async (dispatch) => {
    const res = await fetch(`api/users/${id}`);
    const data = await res.json()
    dispatch(updateUser(data));
}

const initialState = { user: null }

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return { user: action.payload }
        default:
            return state;
    }
}
