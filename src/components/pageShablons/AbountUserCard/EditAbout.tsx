import React, {useState} from "react";
import {IconButton} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import DialogEditAbout from "../../Dialog/DialogEditAbout";

export function EditAbout() {
    const [dialogOpened, setDialogOpened] = useState<boolean>(false);

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
            <DialogEditAbout
                show={ dialogOpened }
                onHide={ () => setDialogOpened(false)}
            />

        </>
    )
}