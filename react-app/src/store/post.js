const GET_POSTS = 'post/GET_POSTS'
const GET_FOLLOWING_POST = 'post/GET_FOLLOWING_POST'
const GET_ONE_POST = 'post/GET_ONE_POST'

const getPosts = (posts, userId) => ({
    type: GET_POSTS,
    payload: posts,
    userId,
})

const getFollowingPosts = (posts) => ({
    type: GET_FOLLOWING_POST,
    payload: posts,
})


const getDetails = (posts) => ({
    type: GET_ONE_POST,
    payload: posts,
})

export const likePost = (postId) => async (dispatch) => {
    const res = await fetch(`/api/likes/${postId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
    const data = await res.json();
    dispatch(getFollowingPosts(data));
}


export const findPosts = (userId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${userId}`)
    const data = await res.json();
    if (res.ok) {
        dispatch(getPosts(data, userId));

    }
};

export const postDetails = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/id/${postId}`);
    const data = await res.json();
    console.log(res, "-------- HIT UNIQUE POSTS THUNK ----------")
    if (res.ok) {
        console.log(data, "--------2 HIT UNIQUE POSTS THUNK ----------")
        dispatch(getDetails(data));
    }
}

export const editPost = (obj, id) => async (dispatch) => {
    const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
    });
    const data = await res.json();
    dispatch(getFollowingPosts(data));
}

export const deletePost = (id) => async (dispatch) => {
    const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    dispatch(getFollowingPosts(data));
}

export const deleteComment = (id) => async (dispatch) => {
    const res = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    dispatch(getFollowingPosts(data));
};

export const postComment = (obj) => async (dispatch) => {
    const res = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(obj)
    });
    const data = await res.json();
    dispatch(getFollowingPosts(data))
}



export const newPost = (obj) => async (dispatch) => {
    const { file, description } = obj;

    const form = new FormData();
    form.append('file', file);
    form.append('description', description);
    const res = await fetch("/api/posts/new", {
        method: "POST",
        body: form,
    });

};


export const getPostFollowing = () => async (dispatch) => {
    const res = await fetch(`/api/posts/following`);
    const data = await res.json();
    if (res.ok) {
        dispatch(getFollowingPosts(data));
    }
};

const initialState = {};

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, [action.userId]: action.payload };
        case GET_FOLLOWING_POST:
            return { ...state, following: action.payload.following }
        case GET_ONE_POST:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}
