import {storage} from "./firebaseService";
import {updateBlogDataFireBase} from "./database";
import cookie from "react-cookies";

export function updateBackgroundUser(image: any) {
        const storageRef = storage.ref(`images/${image.name}`);
        return storageRef
            .put(image)
}

export function onComplete(image: any, onSaveData: any, nameColumn: any) {
        const storageRef = storage.ref(`images/${image.name}`);
        return storageRef.getDownloadURL().then(function(url: string) {
                onSaveData(nameColumn, url )
        })
}