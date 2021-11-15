import React from "react";
import {mount, configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Search from './search';
import axios from 'axios';
import classes from "../../../../../backend/model/classes";


configure({adapter: new Adapter()});

jest.mock("axios");


describe("Test for search component", () => {
    const majors = [
        "Chemistry",
        "MBA",
        "Geology",
        "Mechanical Engineer",
        "Mathematics",
        "J.D",
        "Economics"
    ]

    test("Search component renders correctly", () => {
        axios.get = jest.fn().mockImplementation((destination, par) => {
            if (destination == process.env.REACT_APP_MAJOR_ENDPOINT){
                return Promise.resolve({data: majors})
            } else if (destination == process.env.REACT_APP_CLASSES_ENDPOINT){
                return Promise.resolve({data: classes.slice(5)});
            }
        })
        const component = mount(<Search />);
        // Expect Filter
        expect(component.find("#searchPage").exists()).toBeTruthy();
        // Expect no items in search query location
        // Expect initial render in entire filter bar to have 5 items
    })
})