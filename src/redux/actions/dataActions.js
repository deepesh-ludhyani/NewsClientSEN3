import { SET_POST, SET_POSTS, LOADING_DATA, LOADING_UI, UNLOADING_UI, SUBMIT_COMMENT, SET_ERRORS, CREATE_POST, LIKE_POST, UNLIKE_POST } from '../types';
import axios from 'axios';

export const getPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/posts')
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
        })
}

export const getPost = (postId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/post/${postId}`)
        .then((res) => {
            dispatch({
                type: SET_POST,
                payload: res.data
            });
            dispatch({ type: UNLOADING_UI });
        })
        .catch((err) => console.log(err));
};

export const submitComment = (postId, commentData) => (dispatch) => {
    axios.post(`/post/${postId}/comment`, commentData)
        .then((res) => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            });
            dispatch({ type: UNLOADING_UI });
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

export const createPost = (postData) => (dispatch) => {
    axios.post('/newpost', postData)
        .then((res) => {
            dispatch({
                type: CREATE_POST,
                payload: res.data
            })
            dispatch({ type: UNLOADING_UI });
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

// Like a post
export const likePost = (postId) => (dispatch) => {
    axios
        .get(`/post/${postId}/like`)
        .then((res) => {
            dispatch({
                type: LIKE_POST,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
};
// Unlike a post
export const unlikePost = (postId) => (dispatch) => {
    axios
        .get(`/post/${postId}/unlike`)
        .then((res) => {
            dispatch({
                type: UNLIKE_POST,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
};