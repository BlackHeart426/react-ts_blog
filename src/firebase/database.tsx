import {database} from "./firebaseService";
import shortid from "shortid";


export function createUserFireBase(userId: string) {
        return database.ref('userBlogs')
        .child(userId)  //userID
        .set({pageBlog: ''})
}

export function updateBlogDataFireBase(nameBlog: string, nameColumn: string, value: any) {
        return database.ref('listBlog')
            .child(nameBlog)
            .child('dataBlock')
            .update({[nameColumn]: value})
}
export function updateArrayBlogDataFireBase(nameBlog: string, nameColumn: string, value: any, uuid: string) {
        return database.ref('listBlog')
            .child(nameBlog)
            .child('dataBlock')
            .child(nameColumn)
            .child(uuid)
            .update(value)
}

export function addRowBlogDataFireBase(nameBlog: string, nameColumn: string, value: any) {
        return database.ref('listBlog')
            .child(nameBlog)
            .child('dataBlock')
            .child(nameColumn)
            .set(value)
}

export function addArrayBlogDataFireBase(nameBlog: string, nameColumn: string, value: any) {
        return database.ref('listBlog')
            .child(nameBlog)
            .child('dataBlock')
            .child(nameColumn)
            .child(value.uuid)
            .set(value)
}

export function addSubscriptionsBlogDataFireBase(userId: string, nameBlog: string, value: any) {
        return database.ref('listBlog')
            .child(nameBlog)
            .child('dataBlock')
            .child('Subscriptions')
            .child(userId)
            .set(value)
}

export function removeArrayBlogDataFireBase(nameBlog: string, nameColumn: string, uuid: string) {
        return database.ref('listBlog')
            .child(nameBlog)
            .child('dataBlock')
            .child(nameColumn)
            .child(uuid)
            .remove()
}

export function createPageBlogFireBase(pageBlog: string, avatar: string) {
        return database.ref('listBlog')
            .child(pageBlog)
            .child('dataBlock')
            .set({
                Avatar: avatar,
                Tasks: '',
                About: '',
                Description: { name: pageBlog},
                Tiers: '',
                Background: '',
                Posts: '',
                Subscriptions: '',
        })
}

export function updatePageBlogUserBlogFireBase(userId: string, nameColumn: any, value: any) {
        return database.ref('userBlogs')
            .child(userId)
            .update({[nameColumn]: value})
}

export function updateArrayPageBlogUserBlogFireBase(userId: string, nameColumn: any, value: any) {
        return database.ref('userBlogs')
            .child(userId)
            .child(nameColumn)
            .child(value.uuid)
            .update(value)
}


export function addSubscriptionsUserBlogFireBase(userId: string, subscriptions: any) {
        return database.ref('userBlogs')
            .child(userId)
            .child('subscriptions')
            .child(subscriptions.uuid)
            .set(subscriptions)
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
