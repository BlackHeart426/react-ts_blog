import React, {useState} from "react";
import {CustomDialog} from "../../components/Dialog/CustomDialog";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import {AuthorizationForm} from "./AuthorizationForm";

export const AuthorizationModal: React.FC = () => {
    const [dialogOpened, setDialogOpened] = useState(false);

    const data = {
        title: 'Authorization',
        content:
            <div>
                <AuthorizationForm/>
            </div>,
    }

    const handleOpen = () => {
        setDialogOpened(true)
    }
    return (
        <>
        <Button
            variant="outlined"
            onClick={handleOpen}
        >
            Auth
        </Button>
        <CustomDialog size={'md'}  data = { data } show={ dialogOpened }  onHide={ () => setDialogOpened(false) }/>
        </>
    )
}