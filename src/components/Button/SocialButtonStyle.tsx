import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles";
import {blue} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import TwitterIcon from "@material-ui/icons/Twitter";
import React from "react";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            button: {
                width: '70px',
                height: '70px',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '20px',
            },
        }
    )
)

interface IProps {
    colorButton: string,
    colorButtonHover: string,
    icon: any,
    onConnection: any
}

export function SocialButtonStyle(props: IProps) {
    const {colorButton, icon, colorButtonHover, onConnection} = props;

    const CustomButton = withStyles((theme: Theme) => ({
        root: {
            color: theme.palette.getContrastText(colorButton),
            backgroundColor: colorButton,
            '&:hover': {
                backgroundColor: colorButtonHover,
            },
        },
    }))(Button);
    const classes = useStyles();
    return (
        <CustomButton variant="outlined"  onClick={() => onConnection()} aria-label="delete" className={classes.button} size="large">
            {icon}
        </CustomButton>
    )
}