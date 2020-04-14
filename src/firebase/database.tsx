import {database} from "./firebaseService";

export function createPageFireBase(pageBlog: string, userId: string) {
        return database.ref('userBlogs')
        .child(userId)  //userID
        .set({pageBlog})
}