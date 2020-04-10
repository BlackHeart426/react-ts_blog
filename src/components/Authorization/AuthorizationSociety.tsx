import React from "react";
import Button from "@material-ui/core/Button";
import {Icon} from "@iconify/react";
import googleIcon from "@iconify/icons-flat-color-icons/google";
import FormControl from "@material-ui/core/FormControl";

export const AuthorizationSociety = () => {

    const handleGoogle = () => {
        // props.action.authorizationGoogle()
        // handleClose()
    };

    return (
        <>
            <Button
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<Icon icon={googleIcon}/>}
                onClick={handleGoogle}>
                GOOGLE
            </Button>
        </>
    )
}