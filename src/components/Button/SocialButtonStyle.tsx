import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles";
import {blue, grey} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import TwitterIcon from "@material-ui/icons/Twitter";
import React from "react";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            button: {
                [theme.breakpoints.up('md')]: {
                    width: '70px',
                    height: '70px',
                },
                width: '60px',
                height: '60px',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '20px',

            }
        }
    )
)

interface IProps {
    colorButton: string,
    colorBackground: string,
    colorBorder: string,
    colorButtonHover: string,
    icon: any,
    onConnection: any
}

export function SocialButtonStyle(props: IProps) {
    const {colorButton, colorBackground, colorBorder, icon, colorButtonHover, onConnection} = props;

    const CustomButton = withStyles((theme: Theme) => ({
        root: {
            color: theme.palette.getContrastText(colorButton),
            border: '1px solid' + colorBorder,
            background: colorBackground,
            '&:hover': {
                background: colorButtonHover,
            },
        },
    }))(Button);
    const classes = useStyles();
    return (
        <CustomButton onClick={() => onConnection()} aria-label="delete" className={classes.button} size="large">
            {icon}
        </CustomButton>
    )
}