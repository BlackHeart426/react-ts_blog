import React, {useState} from "react";
import {Button, FormControl} from "@material-ui/core";
import DialogAddTier from "../../Dialog/DialogAddTier";
import DialogCreatePage from "../../Dialog/DialogCreatePage";
import DialogAddTask from "../../Dialog/DialogAddTask";

export function AddTasks() {
    const [dialogOpened, setDialogOpened] = useState(false);

    const handleOpeningDialog = () => {
        setDialogOpened(true)
    }

    return (
        <>
            <FormControl fullWidth style={{marginTop: 20}}>
                <Button
                    disableElevation
                    variant="contained"
                    onClick={handleOpeningDialog}
                    color="primary">
                    <strong>Add tasks</strong>
                </Button>
                <DialogAddTask

                    show={ dialogOpened }
                    onHide={ () => setDialogOpened(false)}
                />
            </FormControl>


        </>
    )
}