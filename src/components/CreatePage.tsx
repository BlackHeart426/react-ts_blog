import React, {useEffect, useState} from "react";
import {Button} from "@material-ui/core";
import DialogCreatePage from "./Dialog/DialogCreatePage";
import {getDataBlogActionCreator} from "../store/action/blog";
import {connect} from "react-redux";

function CreatePage(props: any) {
    const [dialogOpened, setDialogOpened] = useState(false);
    // const [state, setState] = useState<boolean|null>(null);

    // useEffect(()=>{
    //     setState(!!props.isMyPage)
    // },[props.isMyPage])

    const handleOpeningDialog = () => {
        setDialogOpened(true)
    }

    return <>
        <Button
            variant="outlined"
            onClick={handleOpeningDialog}
        >Create Page</Button>
        <DialogCreatePage
            show={ dialogOpened }
            onHide={ () => setDialogOpened(false)}
        />
    </>

    // if(state === null ){
    //     return <></>
    // } else {
    //     if(state === true) {
    //         return  <></>
    //     } else {
    //         return <>
    //             <Button
    //                 variant="outlined"
    //                 onClick={handleOpeningDialog}
    //             >Create Page</Button>
    //             <DialogCreatePage
    //                 show={ dialogOpened }
    //                 onHide={ () => setDialogOpened(false)}
    //             />
    //         </>
    //     }
    // }

}
function mapStateToProps(state: any) {
    return {
        isMyPage: state.currentUser.myPage,
    }
}


export default connect(mapStateToProps) (CreatePage);
