import React, { useEffect, useState } from "react";
import List from '@material-ui/core/List';
import Checkbox from '@mui/material/Checkbox';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Button from  '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

import axios from 'axios';
import UserResult from "../../components/search/userResult";

const useStyles = makeStyles((theme) => ({
    pageStyle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: "10%"
    },
    filterBarStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        borderRight: 'solid',
        borderRightColor: '#a3aaaf',
        padding: '1%',
        width: '25vw',
    }
}));




export default function Search() {
    const USER_ENDPOINT = process.env.REACT_APP_USER_ENDPOINT;
    const SEARCH_ENDPOINT = process.env.REACT_APP_SEARCH_ENDPOINT;
    const MAJOR_ENDPOINT = process.env.REACT_APP_MAJOR_ENDPOINT;
    const CLASSES_ENDPOINT = process.env.REACT_APP_CLASSES_ENDPOINT;
    const DEFAULT_DISPLAY_COUNT = 5;
    const filters = [];
    const [majorDisplayCount, changeMajorDisplayCount] = useState(DEFAULT_DISPLAY_COUNT);
    const [classesDisplayCount, changeClassesDisplayCount] = useState(DEFAULT_DISPLAY_COUNT);
    let [majors, addMajors] = useState([]);
    let [nClasses, addClasses] = useState([]);
    let [userResults, addUserResults] = useState([]);

    const respMajors = [
        "Chemistry",
        "MBA",
        "Geology",
        "Mechanical Engineer",
        "Mathematics",
        "J.D",
        "Economics"
    ]

    const respClasses = [
        "CS30",
        "CS31",
        "CS32",
        "CS33",
        "CS35L",
        "CSM51A",
        "CS97",
        "CS99",
        "CS111",
        "CS112",
        "CS117",
        "CS118",
        "CSM119",
        "CSCM121",
        "CSCM122",
        "CSCM124",
        "CS130",
        "CS131",
        "CS132",
        "CS133",
        "CS134",
        "CS136",
        "CSC137A",
        "CSC137B",
        "CS143",
        "CS144",
        "CS145",
        "M146",
        "M148",
        "M151B",
        "M152A",
        "CS152B",
        "CS161",
        "CS168"
    ]

    function getMajors(){
        const destination = MAJOR_ENDPOINT;
        // addMajors(respMajors);
        axios.get(
            destination,
            {}).then((resp) => {
                console.log(resp)
                addMajors(resp.body.data)
        }).catch((err) => {
            throw err;
        })
    }

    function getClasses(){
        const destination = CLASSES_ENDPOINT;
        // addClasses(respClasses);
        axios.get(
            destination,
            {}
        ).then((resp) => {
            addClasses(respClasses);
        }).catch((err) => {
            throw err
        });
    }

    useEffect(() => {
        getMajors();
        getClasses();
        console.log("Called");
    },[]);

    const userResultParam = {
        name: "Walter White",
        username: "Hiesenberg",
        major: "Chemistry",
        classes: ["CS199"],
        profileURL: "https://static.wikia.nocookie.net/breakingbad/images/e/e7/BB-S5B-Walt-590.jpg"
    }

    function queryParams(){

    }

    function majorsComponent(){
        return (
            <FormGroup>
                {majors.slice(0,majorDisplayCount).map((item, id) => <FormControlLabel key={id} value={item} control={<Checkbox />} label={item} />)}
            </FormGroup>
        );
    }

    function onMoreMajorsClick(event){
        changeMajorDisplayCount(majorDisplayCount + DEFAULT_DISPLAY_COUNT);
    }

    function classesComponent(){
        return (
            <FormGroup>
                {nClasses.slice(0, classesDisplayCount).map((item, id) => {
                    return (
                        <FormControlLabel key={id} value={item} control={<Checkbox />} label={item} />
                    );
                })}
            </FormGroup>
        )
    }

    function onMoreClassesClick(event){
        changeClassesDisplayCount(classesDisplayCount + DEFAULT_DISPLAY_COUNT);
    }

    const classes = useStyles();
    return (
        <div id="searchPage" className={classes.pageStyle}>
            <div id="filterBar" className={classes.filterBarStyle}>
                <List style={{display: "flex", flexDirection: "column", height: '100%'}}>
                    <Typography>Year</Typography>
                    <FormGroup>
                        <FormControlLabel value="Freshman" control={<Checkbox />} label="Freshman" />
                        <FormControlLabel value="Sophomore" control={<Checkbox />} label="Sophomore" />
                        <FormControlLabel value="Junior" control={<Checkbox />} label="Junior" />
                        <FormControlLabel value="Senior" control={<Checkbox />} label="Senior" />
                        <FormControlLabel value="Graduate" control={<Checkbox />} label="Graduate" />
                        <FormControlLabel value="Ph.D" control={<Checkbox />} label="Ph.D" />
                    </FormGroup>
                    <Typography>Majors</Typography>
                    {majorsComponent()}
                    <Button variant="text" size="small" onClick={onMoreMajorsClick}>More</Button>
                    <Typography>Classes</Typography>
                    <FormGroup>
                        {classesComponent()}
                    </FormGroup>
                    <Button variant="text" size="small" onClick={onMoreClassesClick}>More</Button>
                </List>
            </div>
            <div id="results" style={{display: "flex", flexDirection: "column", flex: "1 0 75%"}}>
                {userResults.map((item, id) => {
                    return (
                        <UserResult key={id} params={item} />
                    );
                })}
            </div>
        </div>
    );
}