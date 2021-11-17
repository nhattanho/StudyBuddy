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
    let page = 0;
    const DEFAULT_DISPLAY_COUNT = 5;
    const filters = {
        year: [],
        classes: [],
        major: [],
    };
    const [majorDisplayCount, changeMajorDisplayCount] = useState(DEFAULT_DISPLAY_COUNT);
    const [classesDisplayCount, changeClassesDisplayCount] = useState(DEFAULT_DISPLAY_COUNT);
    let [majors, addMajors] = useState([]);
    let [nClasses, addClasses] = useState([]);
    let [userResults, addUserResults] = useState([]);

    const years = [
        "Freshman",
        "Sophomore",
        "Junior",
        "Senior",
        "Graduate",
        "Ph.D"
    ]

    function getMajors(){
        const destination = MAJOR_ENDPOINT;
        axios.get(
            destination,
            {}).then((resp) => {
                addMajors(resp.data)
        }).catch((err) => {
            throw err;
        })
    }

    function getClasses(){
        const destination = CLASSES_ENDPOINT;
        axios.get(
            destination,
            {skipC: page}
        ).then((resp) => {
            addClasses(resp.data)
        }).catch((err) => {
            throw err
        });
    }

    useEffect(() => {
        getMajors();
        getClasses();
    },[]);

    function onChangeMajorControlLabel(event, id){
        if (event.target.checked){
            filters.major.push(id)
        } else {
            let idx = filters.major.indexOf(id);
            if (idx != -1)
                filters.major.splice(idx);
        }
        requestSearch();
    }

    function onChangeClassesControlLabel(event, id){
        if (event.target.checked){
            filters.classes.push(id)
        } else {
            let idx = filters.classes.indexOf(id);
            if (idx != -1)
                filters.classes.splice(idx);
        }
        requestSearch();
    }

    function onChangeYearControlLabel(event){
        if (event.target.checked){
            filters.year.push(event.target.value)
        } else {
            let idx = filters.year.indexOf(event.target.value)
            if (idx != -1)
                filters.year.splice(idx)
        }
        requestSearch();
    }

    function requestSearch(){
        const destination = SEARCH_ENDPOINT;
        axios.get(destination, filters).then((resp) => {
            addUserResults(resp.data)
        }).catch((err) => {
            throw err
        });
    }

    function yearsComponent() {
        return (
            <FormGroup id="yearGroup">
                {years.map((item, id) => {
                    return (
                        <FormControlLabel
                            id="year"
                            key={id}
                            value={item}
                            control={<Checkbox />}
                            label={item}
                            onChange={onChangeYearControlLabel}/>
                    );
                })}
            </FormGroup>
        )
    }

    function majorsComponent(){
        return (
            <FormGroup id="majorGroup">
                {majors.slice(0,majorDisplayCount).map((item, id) => {
                    return (
                    <FormControlLabel
                        id="major"
                        key={id}
                        value={item.name}
                        control={<Checkbox />}
                        label={item.name}
                        onChange={(event) => {onChangeMajorControlLabel(event, item.id)}} />
                    );
                })}
            </FormGroup>
        );
    }

    function onMoreMajorsClick(event){
        changeMajorDisplayCount(majorDisplayCount + DEFAULT_DISPLAY_COUNT);
    }

    function classesComponent(){
        return (
            <FormGroup id="classesGroup">
                {nClasses.slice(0, classesDisplayCount).map((item, id) => {
                    return (
                        <FormControlLabel
                            id="classes"
                            key={id}
                            value={item.name}
                            control={<Checkbox />}
                            label={item.name}
                            onChange={(event) => {onChangeClassesControlLabel(event, item.id)}} />
                    );
                })}
            </FormGroup>
        )
    }

    function onMoreClassesClick(event){
        page+=1
        const destination = CLASSES_ENDPOINT;
        axios.get(destination, {skipC: page}).then((resp) => {
            addClasses(nClasses.concat(resp.data))
        }).catch((err) => {
            throw err
        });
        changeClassesDisplayCount(classesDisplayCount + DEFAULT_DISPLAY_COUNT);
    }

    const classes = useStyles();
    return (
        <div id="searchPage" className={classes.pageStyle}>
            <div id="filterBar" className={classes.filterBarStyle}>
                <List style={{display: "flex", flexDirection: "column", height: '100%'}}>
                    <Typography>Year</Typography>
                    {yearsComponent()}
                    <Typography>Majors</Typography>
                    {majorsComponent()}
                    <Button id="moreMajorsButton" variant="text" size="small" onClick={onMoreMajorsClick}>More</Button>
                    <Typography>Classes</Typography>
                    <FormGroup>
                        {classesComponent()}
                    </FormGroup>
                    <Button id="moreClassesButton" variant="text" size="small" onClick={onMoreClassesClick}>More</Button>
                </List>
            </div>
            <div id="results" style={{display: "flex", flexDirection: "column", flex: "1 0 75%"}}>
                {userResults.map((item, id) => {
                    return (
                        <UserResult id="userResult" key={id} params={item} />
                    );
                })}
            </div>
        </div>
    );
}