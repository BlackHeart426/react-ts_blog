import React, {useState} from "react";
import {IconButton} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import DialogEditAbout from "../../Dialog/DialogEditAbout";
import DialogEditPost from "../../Dialog/DialogEditPost";

export function EditPost(props: any) {
    const [dialogOpened, setDialogOpened] = useState(false);
    const {uuid} = props
    const handleOpeningDialog = () => {
        setDialogOpened(true)
    }

    return (
        <>
            <IconButton
                style={{marginRight: 25}}
                aria-label="toggle password visibility"
                onClick={handleOpeningDialog}
            >
                <SettingsIcon/>
            </IconButton>
            <DialogEditPost
                uuid={uuid}
                show={ dialogOpened }
                onHide={ () => setDialogOpened(false)}
            />

        </>
    )
}