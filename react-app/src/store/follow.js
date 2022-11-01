const GET_ALL_FOLLOWS = "follow/GET_ALL_FOLLOWS"
const GET_SUGGESTED_USERS = "follow/GET_SUGGESTED_USERS"



const getAllFollows = (users, userId) => ({
    type: GET_ALL_FOLLOWS,
    payload: users, userId
})

const getSuggestedUsers = (users) => ({
    type: GET_SUGGESTED_USERS,
    payoad: users,
})


export const findFollowers = (userId) => async (dispatch) => {
    const res = await fetch(`/api/follows/${userId}`)
    const data = await res.json();
    if (res.ok) {
        dispatch(getAllFollows(data, userId));
    }
}

export const followUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/follows/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.ok) {
        const data = await res.json()
        dispatch(getAllFollows(data, userId))
    }
}

export const unfollow = (userId) => async (dispatch) => {
    const res = await fetch(`/api/follows/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (res.ok) {
        const data = await res.json()
        dispatch(getAllFollows(data, userId))
    }
}

export const findSuggestedUsers = () => async (dispatch) => {
    const res = await fetch("/api/follows/suggestions");
    if (res.ok) {
        const data = await res.json();
        dispatch(getSuggestedUsers(data));
    }
}

export const removeFollow = (id, userId) => async (dispatch) => {
    const res = fetch(`/api/follows/remove/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(findFollowers(data, userId));
    }
}

const initialState = { users: null };

export default function followReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_FOLLOWS:
            return { ...state, [action.userId]: action.payload };
        case GET_SUGGESTED_USERS:
            return { ...state, users: action.payload.final };
        default:
            return state;

    }
}
