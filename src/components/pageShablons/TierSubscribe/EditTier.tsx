import React, {useState} from "react";
import {Button, FormControl, Typography} from "@material-ui/core";
import DialogAddTier from "../../Dialog/DialogAddTier";
import DialogCreatePage from "../../Dialog/DialogCreatePage";
import DialogEditTier from "../../Dialog/DialogEditTier";
import Link from "@material-ui/core/Link";

export function EditTier() {
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
                <DialogEditTier
                    show={ dialogOpened }
                    onHide={ () => setDialogOpened(false)}
                />
            </FormControl>


        </>
    )
}