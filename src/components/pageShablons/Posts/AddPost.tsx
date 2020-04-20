import React, {useState} from "react";
import {Button, IconButton} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import DialogEditAbout from "../../Dialog/DialogEditAbout";
import DialogEditPost from "../../Dialog/DialogEditPost";
import DialogAddPost from "../../Dialog/DialogAddPost";
import EditIcon from "@material-ui/icons/Edit";

export function AddPost() {
    const [dialogOpened, setDialogOpened] = useState(false);

    const handleOpeningDialog = () => {
        setDialogOpened(true)
    }

    return (
        <>
            <Button
                disableElevation
                variant="contained"
                onClick={handleOpeningDialog}
                startIcon={<EditIcon/>}
                color="primary">
                <strong>New post</strong>
            </Button>
            <DialogAddPost
                show={ dialogOpened }
                onHide={ () => setDialogOpened(false)}
            />

        </>
    )
}