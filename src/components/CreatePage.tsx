import React, {useEffect, useState} from "react";
import {Button} from "@material-ui/core";
import DialogCreatePage from "./Dialog/DialogCreatePage";
import {getDataBlogActionCreator} from "../store/action/blog";
import {connect} from "react-redux";
import cookie from "react-cookies";
import {log} from "util";

function CreatePage(props: any) {
    const [dialogOpened, setDialogOpened] = useState(false);
    const [myPage, setMyPage] =useState('')
    const handleOpeningDialog = () => {
        setDialogOpened(true)
    }

    useEffect(()=>{
        const myPageCookie = cookie.load('myPage');
        if(myPageCookie !== "") {
            setMyPage(myPageCookie)
        } else {
            setMyPage(props.isMyPage)
        }

    },[props.isMyPage])

    return <>
        {!myPage && <Button
            variant="outlined"
            onClick={handleOpeningDialog}
        >Create Page</Button>}
        <DialogCreatePage
            show={ dialogOpened }
            onHide={ () => setDialogOpened(false)}
        />
    </>

}
function mapStateToProps(state: any) {
    return {
        isMyPage: state.currentUser.myPage,
    }
}


export default connect(mapStateToProps) (CreatePage);
