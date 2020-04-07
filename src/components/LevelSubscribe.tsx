import React from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Divider, FormControl, Typography} from "@material-ui/core";

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

export const LevelSubscribe: React.FC = () => {
    return (
        <Card >
            {listLevels.map((item:{name:string, cost: number, description: string, active: boolean}, index: number) => (
                <>
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
                        <FormControl fullWidth >
                            <Button
                                variant="contained"
                                color="primary">
                                Followed
                            </Button>
                        </FormControl>
                    </CardActions>
                    <Divider />
                </>
            ))}
        </Card>
    )
}