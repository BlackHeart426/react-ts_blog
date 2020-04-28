import {
    createPageBlogFireBase,
    createUserFireBase,
    getDataPageBlogFireBase,
    getPageBlogUserFireBase,
    updatePageBlogUserBlogFireBase,
    addSubscriptionsUserBlogFireBase,
    updateBlogDataFireBase,
    updateArrayPageBlogUserBlogFireBase
} from "../../firebase/database";
import { Dispatch } from "redux";
import cookie from 'react-cookies'
import {
    SET_PAGEBLOG,
    ADD_SUBSCRIPTIONS,
    SET_SUBSCRIPTIONS,
    UPDATE_DATA_BLOG,
    SET_AVATAR,
    UPDATE_USER_DATA, UPDATE_ARRAY_DATA_USER
} from "../types";
import shortid from "shortid";



export const userId: string|null = localStorage.getItem('userId');

export const createUserActionCreator = (name: string) => {
    if(userId) {
        createUserFireBase(userId)
            .then(response => {
                console.log('response', response)
            })
            .catch(error => {
                console.error('error',error)
            })
    }
}

export const updateUserDataActionCreator = (nameColumn: string, value: any) => {
    return async (dispatch: any) => {
        if(userId) {
            updatePageBlogUserBlogFireBase(userId, nameColumn, value)
                .then(response => {
                    dispatch({ type: UPDATE_USER_DATA, payload: {nameColumn, value} });
                })
                .catch(error => {
                    console.error('error',error)
                })
        }

    }
}

export const createPageActionCreator = (name: string, nameColumn: string) => {
    if(userId) {
        return async (dispatch: any) => {
            createPageBlogFireBase(name)
            updatePageBlogUserBlogFireBase(userId, nameColumn, name)
                .then(response => {
                    console.log('name', name)
                    if(name) {
                        cookie.save('myPage', name, {path : '/'})
                    }
                    dispatch({type: SET_PAGEBLOG, payload: name});
                })
                .catch(error => {

                })
        }
    }
}

export const getDataPageBlogActionCreator = (userId: string) => {
    let flagUserExist = null;
    return async (dispatch: any) => {
        if(userId){
            getPageBlogUserFireBase(userId)
                .then((snapshot: any) => {
                    console.log('getDataPageBlogActionCreator',snapshot.val())
                    if (snapshot.val()) {
                        // dispatch(setDataUserBlogActionCreator(snapshot.val())) // add subscription resux
                        return flagUserExist = true;
                    } else {
                        createUserFireBase(userId)
                            .then(response => {
                                console.log('response', response)
                            })
                            .catch(error => {
                                console.error('error',error)
                            })
                    }
                })
                .catch(error =>{
                    debugger
                    return flagUserExist = false;
                })
        }
    }

}

export const addSubscriptionUserActionCreator = (data: object) => {
    return async (dispatch: Dispatch) => {
        if(userId) {
            addSubscriptionsUserBlogFireBase(userId, data)
                .then()
            await dispatch({type: ADD_SUBSCRIPTIONS, payload: data})
        }

    }

}

export const updateArrayPageBlogUserBlogActionCreator = (nameColumn: string, value: any) => {
    return async (dispatch: Dispatch) => {
        if(userId) {
            console.log('userId',userId)
            console.log('nameColumn',nameColumn)
            console.log('value',value)
            updateArrayPageBlogUserBlogFireBase(userId, nameColumn, value)
                .then()
            await dispatch({type: UPDATE_ARRAY_DATA_USER, payload: value})
        }

    }

}

export const setDataUserBlogActionCreator = (dataUser: any) => {
    return {
        type: SET_SUBSCRIPTIONS,
        payload: dataUser
    }
}

export const getBlogPageUserActionCreator = (userId: string|null) => {
    console.log('userId', userId)
    return async (dispatch: Dispatch) => {
        const myPage = cookie.load('myPage')
        console.log('myPage',myPage)
            if(userId) {
                try {
                    await getPageBlogUserFireBase(userId)
                        .then((snapshot: any) => {
                            const myPage = snapshot.val().pageBlog
                            const avatar = snapshot.val().Avatar
                            if(myPage){
                                cookie.save('myPage', myPage, {path : '/'})
                            }
                            dispatch({type: SET_PAGEBLOG, payload: myPage});
                            dispatch({type: SET_AVATAR, payload: avatar});

                            dispatch({type: SET_SUBSCRIPTIONS, payload:  snapshot.val().subscriptions});
                            if(!myPage) {
                                dispatch({type: SET_PAGEBLOG, payload: null});
                                dispatch({type: SET_AVATAR, payload: avatar});
                            }
                        })
                } catch (e) {
                    // dispatch(showAlert('Что-то пошло не так'))
                    // dispatch(hideLoader())
                }
            } else {
                dispatch({type: SET_PAGEBLOG, payload: null});
            }

    }

}
