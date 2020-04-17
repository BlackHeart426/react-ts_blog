import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            block: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 'auto',
                borderTop: '1px solid #eaeaea',
                backgroundColor: '#fff'

            },
            content: {
                flexDirection: 'row',
                width: '100%',
                minWidth: 1240,
                padding: '16px 10px 13px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 13,
                lineHeight: 14,
            }
        }
    )
)


export function Footer() {
    const classes = useStyles()
    return (
        <div className={classes.block}>
            <div className={classes.content}>
                <div >
                    <Typography variant="body2" color="textSecondary" component="p">
                        © 2020 BlackHeart426 All rights reserved.
                    </Typography>
                </div>
                <div >
                    <Typography variant="body2" color="textSecondary" component="p">
                        Пользовательское соглашение
                    </Typography>
                </div>
                <div>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Политика конфиденциальности
                    </Typography>
                </div>
            </div>

        </div>
    )
}