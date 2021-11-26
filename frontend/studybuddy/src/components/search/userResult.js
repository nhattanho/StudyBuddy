import React from "react";
import Card from "@material-ui/core/Card"
import { CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    cardStyle: {
        display: "flex",
        justifyContent: "flex-end",
        margin: 5,
        boxShadow: "10px 10px 30px silver",
        borderRadius: "10px"
    },
    cardContentStyle: {
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        justifyContent: "space-around"
    },
    nameText: {
        fontSize: "1.2em",
        fontWeight: "bold"
    },
    aStyles: {
        textDecoration: 'none'
    }
}))

export default function UserResult(props){
    const userParams = props.params
    const classes = useStyles();
    const userID = userParams._id;
    const userPageURL = `/sendingRequest/${userID}`;
    return(
        <a href={userPageURL} className={classes.aStyles}>
            <Card className={classes.cardStyle}>
                <CardContent className={classes.cardContentStyle}>
                    <Typography className={classes.nameText}>{userParams.name}</Typography>
                    <Typography>{userParams.major}</Typography>
                    {userParams.classes.map((item, id) => <Typography key={id}>{item}</Typography>)}
                </CardContent>
                <CardMedia component="img" style={{width: 100}} src={userParams.profileURL} />
            </Card>
        </a>
    );
}