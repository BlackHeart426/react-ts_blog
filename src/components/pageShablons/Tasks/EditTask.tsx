import React, {useState} from "react";
import {Button, FormControl, Typography} from "@material-ui/core";
import DialogAddTier from "../../Dialog/DialogAddTier";
import DialogCreatePage from "../../Dialog/DialogCreatePage";
import DialogEditTier from "../../Dialog/DialogEditTier";
import Link from "@material-ui/core/Link";
import DialogEditTask from "../../Dialog/DialogEditTask";

export function EditTask(props: any) {
    const {uuid} = props
    const [dialogOpened, setDialogOpened] = useState(false);

    const handleOpeningDialog = () => {
        setDialogOpened(true)
    }

    return (
        <>
            <FormControl fullWidth style={{marginTop: 10}}>
                <Typography variant="body2" color="textSecondary" component="p" >
                    <Link href="#" variant="body2" onClick={handleOpeningDialog}>
                        Edit
                    </Link>
                </Typography>
                <DialogEditTask
                    show={ dialogOpened }
                    uuid={uuid}
                    onHide={ () => setDialogOpened(false)}
                />
            </FormControl>


        </>
    )
}