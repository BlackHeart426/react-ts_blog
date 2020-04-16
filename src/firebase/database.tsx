import {database} from "./firebaseService";

export function createUserFireBase(userId: string) {
        return database.ref('userBlogs')
        .child(userId)  //userID
        .set({pageBlog: '', subscriptions: [{name: ''}]})
}

export function createPageBlogFireBase(pageBlog: string) {
        return database.ref('listBlog')
        .child(pageBlog)
        .child('dataBlock')
        .set({
                Avatar: { image: ''},
                Tasks: '',
                About: '',
                Description: { name: pageBlog},
                LevelTier: '',
                Background: '',
                Posts: '',
        })
}

export function updateUserBlogFireBase() {

}

export function getPageBlogUserFireBase(userId: string) {
        return database.ref('userBlogs')
            .child(userId)
            .once('value')
}

export function getDataPageBlogFireBase(name: string) {
        return database.ref('listBlog')
            .child(name)
            .child('dataBlock')
            .once('value')
}