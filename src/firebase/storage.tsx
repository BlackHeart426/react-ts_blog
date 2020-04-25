import {storage} from "./firebaseService";
import {updateBlogDataFireBase} from "./database";
import cookie from "react-cookies";

export function updateBackgroundUser(image: any, imageName: string) {
        const storageRef = storage.ref(`images/${imageName}`);
        return storageRef
            .put(image)
}

export function onComplete(image: any, imageName: string, onSaveData: any, onSaveUserData: any|null, nameColumn: any) {
        const storageRef = storage.ref(`images/${imageName}`);
        return storageRef.getDownloadURL().then(function(url: string) {
                onSaveData(nameColumn, url )
                if(onSaveUserData) {
                        onSaveUserData(nameColumn, url )
                }

        })
}