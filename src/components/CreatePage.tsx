import React, {useState} from "react";
import {Button} from "@material-ui/core";
import DialogCreatePage from "./Dialog/DialogCreatePage";

export function CreatePage() {
    const [dialogOpened, setDialogOpened] = useState(false);

    const handleOpeningDialog = () => {
        setDialogOpened(true)
    }

    return (
        <>
            <Button
                variant="outlined"
                onClick={handleOpeningDialog}
            >Create Page</Button>
            <DialogCreatePage
                show={ dialogOpened }
                onHide={ () => setDialogOpened(false)}
            />
        </>
    )
}