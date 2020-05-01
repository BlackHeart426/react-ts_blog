import {
    ADD_DATA_BLOG, EReduxActionTypes,
    IS_AUTHENTICATED,
    REMOVE_DATA_BLOG,
    SET_DATA_BLOG,
    UPDATE_ARRAY_DATA_BLOG,
    UPDATE_DATA_BLOG
} from "../types";
import {
    addArrayBlogDataFireBase,
    addRowBlogDataFireBase,
    getDataPageBlogFireBase, removeArrayBlogDataFireBase,
    updateBlogDataFireBase,
    updateArrayBlogDataFireBase, addSubscriptionsBlogDataFireBase
} from "../../firebase/database";
import cookie from "react-cookies";
import {IReduxBaseAction} from "../reducers/rootReducer";
import { IBlogSetData } from "../reducers/blog";


const myPage = cookie.load('myPage')

export interface IReduxGetDataBlogAction extends IReduxBaseAction{
    type: EReduxActionTypes.SET_DATA_BLOG
    payload: IBlogSetData
}

export interface IReduxRemoveDataBlogAction extends IReduxBaseAction{
    type: EReduxActionTypes.REMOVE_DATA_BLOG
    payload: IBlogSetData
}

export interface IReduxUpdateDataBlogAction extends IReduxBaseAction{
    type: EReduxActionTypes.UPDATE_DATA_BLOG
    payload: IBlogSetData
}

export interface IReduxUpdateArrayData extends IReduxBaseAction{
    type: EReduxActionTypes.UPDATE_ARRAY_DATA_BLOG
    payload: IBlogSetData
}

export interface IReduxUpdateLikeCommentDataBlogAction extends IReduxBaseAction{
    type: EReduxActionTypes.UPDATE_ARRAY_DATA_BLOG
    payload: IBlogSetData
}

// export interface IReduxAddSubscriptionsBlogDataAction extends IReduxBaseAction{
//     type: EReduxActionTypes.
// }

export interface IReduxAddDataBlogAction extends IReduxBaseAction{
    type: EReduxActionTypes.ADD_DATA_BLOG | EReduxActionTypes.UPDATE_DATA_BLOG
    payload: IBlogSetData
}

export const getDataBlogActionCreator = (nameBlog: string = myPage) => {
    return async (dispatch: any) => {
        if(nameBlog) {
            getDataPageBlogFireBase(nameBlog)
                .then((snapshot: any) => {
                    const dataBlog = snapshot.val()
                    dispatch({ type: EReduxActionTypes.SET_DATA_BLOG, payload: dataBlog });
                })
                .catch(error => {
                    console.error('error',error)
                })
        }
    }

}

export const removeDataBlogActionCreator = (name: string, uuid: string) => {
    const myPage = cookie.load('myPage')
    return async (dispatch: any) => {
        removeArrayBlogDataFireBase(myPage, name, uuid)
            .then(
                dispatch({type: EReduxActionTypes.REMOVE_DATA_BLOG, payload: {name, uuid}})
            )
            .catch(error => {
                console.error(error)
            })
    }
}

export const updateDataBlogActionCreator = (name: string, value: any) => {
    const myPage = cookie.load('myPage')
    return async (dispatch: any) => {
        if(myPage){
            updateBlogDataFireBase(myPage, name, value)
                .then(response => {
                    dispatch({ type: EReduxActionTypes.UPDATE_DATA_BLOG, payload: {name, value} });
                })
                .catch(error => {
                    console.error('error',error)
                })
        }

    }
}
//добавить проверку пользователя
export const updateArrayDataBlogActionCreator = (name: string, value: any, uuid: string) => {
    const myPage = cookie.load('myPage')
    return async (dispatch: any) => {
        updateArrayBlogDataFireBase(myPage, name, value, uuid)
            .then(response => {
                dispatch({ type: EReduxActionTypes.UPDATE_ARRAY_DATA_BLOG, payload: {name, value, uuid} });
            })
            .catch(error => {
                console.error('error',error)
            })
    }
}

export const updateLikeCommentDataBlogActionCreator = (nameBlog: string ,name: string, value: any, uuid: string) => {
    return async (dispatch: any) => {
        updateArrayBlogDataFireBase(nameBlog, name, value, uuid)
            .then(response => {
                dispatch({ type: EReduxActionTypes.UPDATE_ARRAY_DATA_BLOG, payload: {name, value, uuid} });
            })
            .catch(error => {
                console.error('error',error)
            })
    }
}

export const addSubscriptionsBlogDataActionCreator = (userId: string, namePage: string, value: any) => {

    return async (dispatch: any) => {
        addSubscriptionsBlogDataFireBase(userId, namePage, value)
            .then(response => {
                // dispatch({type: ADD_DATA_BLOG, payload: {name: 'Subscriptions', value}});
            })
            .catch(error => {
                console.error('error', error)
            })
    }
}

export const addDataBlogActionCreator = (name: string, value: any, array: boolean = false) => {
    const myPage = cookie.load('myPage')
    return async (dispatch: any) => {
        if(array) {
            addArrayBlogDataFireBase(myPage, name, value)
                .then(response => {
                    dispatch({ type: EReduxActionTypes.ADD_DATA_BLOG, payload: {name, value} });
                })
                .catch(error => {
                    console.error('error',error)
                })
        } else {
            addRowBlogDataFireBase(myPage, name, value)
                .then(response => {
                    dispatch({ type: EReduxActionTypes.UPDATE_DATA_BLOG, payload: {name, value} });
                })
                .catch(error => {
                    console.error('error',error)
                })
        }
    }
}