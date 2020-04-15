import React from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Divider, FormControl, Typography, Paper} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Link from "@material-ui/core/Link";

export const listLevels = [
    {
        name: "Tier 1",
        cost: 50,
        description: "Access to the show ",
        active: true
    },
    {
        name: "Tier 2",
        cost: 100,
        description: "All videos",
        active: false
    },
    {
        name: "Tier 3",
        cost: 150,
        description: "Special",
        active: false
    },
]
//editable: boolean
export function LevelSubscribe(props: any){
    const {editable=false} =props
    return (
        <>
        <Paper elevation={0} >
            <Typography gutterBottom style={{padding: '15px 20px 5px 20px'}} component="h3">
                <strong>LEVEL TIER</strong>
            </Typography>
            <Divider />
            {listLevels.map((item:{name:string, cost: number, description: string, active: boolean}, index: number) => (
                <div key={index}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {item.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {item.cost} ₽ в месяц
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {item.description}
                        </Typography>
                    </CardContent>
                    <CardActions>

                            {editable
                                ?  <Typography variant="body2" color="textSecondary" component="p" style={{paddingLeft: 8}}>
                                    <Link href="#" variant="body2">
                                    Edit
                                    </Link>
                                </Typography>
                                :
                                <FormControl fullWidth >
                                <Button
                                    disableElevation
                                    variant="contained"
                                    color="primary">
                                    Followed
                                </Button>
                                </FormControl>
                            }

                    </CardActions>
                    <Divider />
                </div>
            ))}

        </Paper>
            {editable && <FormControl fullWidth style={{marginTop: 20}}>
                <Button
                    disableElevation
                    variant="contained"
                    color="primary">
                    <strong>Add tier</strong>
                </Button>
            </FormControl>}
            </>
    )
}