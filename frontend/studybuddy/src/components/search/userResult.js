import React from "react";
import Card from "@material-ui/core/Card"
import { CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    cardStyle: {
        display: "flex",
        justifyContent: "flex-end",
        margin: 5
    },
    cardContentStyle: {
        display: "flex",
        flexDirection: "column",
        flex: "0 0 70%",
        justifyContent: "space-around"
    }
}))

export default function UserResult(props){
    const userParams = props.params
    const classes = useStyles();

    return(
        <Card className={classes.cardStyle}>
            <CardContent className={classes.cardContentStyle}>
                <Typography>{userParams.name}</Typography>
                <Typography>{userParams.major}</Typography>
                {userParams.classes.map((item, id) => <Typography key={id}>{item}</Typography>)}
            </CardContent>
            <CardMedia component="img" style={{width: 100}} src={userParams.profileURL} />
        </Card>
    );
}