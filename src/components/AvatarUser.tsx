import React from "react";
import {Card, CardContent, CardMedia, Typography, CardActions, Button, FormControl} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
export const AvatarUser: React.FC = () => {
    return (
        <Card >
            <CardMedia
                component="img"
                height="280"
                image="https://images.boosty.to/user/9647/avatar?change_time=1561378020&croped=1&mh=560&mw=450"
                title="Contemplative Reptile"
            />
            <CardContent>
                <Typography  align="center" gutterBottom variant="h5" component="h2">
                    42
                </Typography>
                <Typography align="center" variant="body2" color="textSecondary" component="p">
                   Subscribers
                </Typography>
            </CardContent>
            <CardActions>
                <FormControl fullWidth >
                    <Button
                        variant="contained"
                        startIcon={<PersonIcon />}
                        color="primary">
                        Followed
                    </Button>
                </FormControl>
            </CardActions>
        </Card>
    )
}