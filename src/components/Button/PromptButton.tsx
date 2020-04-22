import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {IconButton} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

interface IProps {
    name: string,
    onAccept: () => void,
}

export function PromptButton(props: IProps) {
    const {name, onAccept} = props
    const [promptRemove, setPromptRemove] = useState(true)

    const handlePromptAccept = () =>{
        onAccept()
    }

    const handlePrompt = () =>{
        setPromptRemove(false)
    }

    const handlePromptCancel = () =>{
        setPromptRemove(true)
    }

    return (
        promptRemove ?
            <Button
                variant="outlined"
                size="large"
                disableElevation
                color="primary"
                onClick={handlePrompt}>
               {name}
            </Button>
            : <>
                <IconButton aria-label="delete" onClick={handlePromptAccept}>
                    <CheckIcon color={"action"} />
                </IconButton>
                <IconButton aria-label="delete" onClick={handlePromptCancel}>
                    <ClearIcon />
                </IconButton>
            </>

    )
}