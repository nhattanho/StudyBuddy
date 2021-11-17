import React from "react";
import { act } from 'react-dom/test-utils';
import {mount, configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import axios from 'axios';
import Search from './search';
import classes from "../../../../../backend/model/classes";
require("regenerator-runtime/runtime");


configure({adapter: new Adapter()});

jest.mock("axios");

beforeAll(() => {
    process.env.REACT_APP_USER_ENDPOINT = "1ENDPOINT";
    process.env.REACT_APP_SEARCH_ENDPOINT = "2ENDPOINT";
    process.env.REACT_APP_MAJOR_ENDPOINT = "3ENDPOINT";
    process.env.REACT_APP_CLASSES_ENDPOINT = "4ENDPOINT";
})

afterAll(() => {
    delete process.env.REACT_APP_USER_ENDPOINT;
    delete process.env.REACT_APP_SEARCH_ENDPOINT;
    delete process.env.REACT_APP_MAJOR_ENDPOINT;
    delete process.env.REACT_APP_CLASSES_ENDPOINT;
})

describe("Test for search component", () => {
    const fakeMajors = [
        {id: 1, name: "Chemistry"},
        {id: 2, name: "MBA"},
        {id: 3, name: "Geology"},
        {id: 4, name: "Mechanical Engineer"},
        {id: 5, name: "Mathematics"},
        {id: 6, name: "J.D"},
        {id: 7, name: "Economics"}
    ]

    const fakeTestUsers = [
        {
            name: "Walter White",
            username: "Hiesenberg",
            major: "Chemistry",
            year: "Ph.D",
            classes: ["CS199"],
            profileURL: "https://static.wikia.nocookie.net/breakingbad/images/e/e7/BB-S5B-Walt-590.jpg"
        },
        {
            name: "Walter White",
            username: "Hiesenberg",
            major: "Chemistry",
            year: "Freshman",
            classes: ["CS30"],
            profileURL: "https://static.wikia.nocookie.net/breakingbad/images/e/e7/BB-S5B-Walt-590.jpg"
        },
        {
            name: "Walter White",
            username: "Hiesenberg",
            major: "Mathematics",
            year: "Freshman",
            classes: ["CS118"],
            profileURL: "https://static.wikia.nocookie.net/breakingbad/images/e/e7/BB-S5B-Walt-590.jpg"
        },
        {
            name: "Todd Atkins",
            username: "Hiesenberg",
            major: "Mathematics",
            year: "Freshman",
            classes: ["CS31"],
            profileURL: "https://static.wikia.nocookie.net/breakingbad/images/e/e7/BB-S5B-Walt-590.jpg"
        },
    ]

    test("Search component renders correctly", async () => {
        axios.get = jest.fn().mockImplementation((destination, par) => {
            if (destination == process.env.REACT_APP_MAJOR_ENDPOINT){
                return Promise.resolve({data: fakeMajors})
            } else if (destination == process.env.REACT_APP_CLASSES_ENDPOINT){
                return Promise.resolve({data: classes.slice(0,5)});
            }
        })
        const component = mount(<Search />);
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            component.update();
        });
        expect(component.find("#searchPage").exists()).toBeTruthy();
        expect(component.find("#filterBar").exists()).toBeTruthy();
        expect(component.find("#results").exists()).toBeTruthy();
        // Expect no items in search query location
        expect(component.find("#UserResult").length).toEqual(0);
        // Expect initial render in entire filter bar to have 5 items
        // expect(component.find("div#classesGroup").children().length).toEqual(5);
        expect(component.find("label#major").getElements().length).toEqual(5);
        expect(component.find("label#classes").getElements().length).toEqual(5);
    })

    test("User clicks more majors buttom", async () => {
        axios.get = jest.fn().mockImplementation((destination, par) => {
            if (destination == process.env.REACT_APP_MAJOR_ENDPOINT){
                return Promise.resolve({data: fakeMajors})
            } else if (destination == process.env.REACT_APP_CLASSES_ENDPOINT){
                return Promise.resolve({data: classes.slice(0,5)});
            }
        })
        const component = mount(<Search />);
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            component.update();
        });

        expect(component.find("label#major").getElements().length).toEqual(5);
        let majorLabels = component.find("label#major")
        let values = majorLabels.map((item, id) => {
            return item.find("span").at(2).children().debug();
        })
        expect(values).toEqual(fakeMajors.slice(0,5).map((item, id) => item.name))
        // Request More
        let moreMajorsButton = component.find("#moreMajorsButton");
        moreMajorsButton.at(0).simulate('click');
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            component.update();
        });
        majorLabels = component.find("label#major")
        values = majorLabels.map((item, id) => {
            return item.find("span").at(2).children().debug();
        })
        expect(values).toEqual(fakeMajors.map((item, id) => item.name))
    });

    test("User clicks more classes buttom", async () => {
        axios.get = jest.fn().mockImplementation((destination, par) => {
            if (destination == process.env.REACT_APP_MAJOR_ENDPOINT){
                return Promise.resolve({data: fakeMajors})
            } else if (destination == process.env.REACT_APP_CLASSES_ENDPOINT){
                return Promise.resolve({data: classes.slice(0,5)});
            }
        })
        const component = mount(<Search />);
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            component.update();
        });

        expect(component.find("label#classes").getElements().length).toEqual(5);
        let classLabels = component.find("label#classes")
        let values = classLabels.map((item, id) => {
            return item.find("span").at(2).children().debug();
        })
        expect(values).toEqual(classes.slice(0,5).map((item, id) => item.name))

        axios.get = jest.fn().mockImplementation((destination, par) => {
            if (par.skipC == 1){
                return Promise.resolve({data: classes.slice(5,10)})
            } else {
                return Promise.resolve({data: classes.slice(0, 5)})
            }
        })
        // Request More
        let moreClassesButton = component.find("#moreClassesButton");
        moreClassesButton.at(0).simulate('click');
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            component.update();
        });
        classLabels = component.find("label#classes")
        values = classLabels.map((item, id) => {
            return item.find("span").at(2).children().debug();
        })
        expect(values).toEqual(classes.slice(0,10).map((item, id) => item.name))
    });

    test("User Check a year(Freshman) filter box", async () => {
        axios.get = jest.fn().mockImplementation((destination, par) => {
            if (destination == process.env.REACT_APP_MAJOR_ENDPOINT){
                return Promise.resolve({data: fakeMajors})
            } else if (destination == process.env.REACT_APP_CLASSES_ENDPOINT){
                return Promise.resolve({data: classes.slice(0,5)});
            }
        })
        const component = mount(<Search />);
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            component.update();
        });
        let yearLabels = component.find("label#year");
        expect(yearLabels.getElements().length).toEqual(6);
        let yearLabel = yearLabels.at(0);
        axios.get = jest.fn().mockImplementation((destination, filters) => {
            let years = filters.year
            let resp = []
            for(let i = 0; i < years.length; i++){
                for(let u = 0; u < fakeTestUsers.length; u++){
                    if (fakeTestUsers[u].year == years[i]){
                        resp.push(fakeTestUsers[u]);
                    }
                }
            }
            return Promise.resolve({data: resp})
        })
        yearLabel.find("input").simulate('change', {target: {checked: true, value: 'Freshman'}});
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            component.update();
        });
        expect(component.find("#userResult").length).toEqual(3);
        yearLabel.find("input").simulate('change', {target: {checked: false, value: 'Freshman'}});
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            component.update();
        });
        expect(component.find("#userResult").length).toEqual(0);
    })

    test("User checks multiple years", async () => {
        axios.get = jest.fn().mockImplementation((destination, par) => {
            if (destination == process.env.REACT_APP_MAJOR_ENDPOINT){
                return Promise.resolve({data: fakeMajors})
            } else if (destination == process.env.REACT_APP_CLASSES_ENDPOINT){
                return Promise.resolve({data: classes.slice(0,5)});
            }
        })
        const component = mount(<Search />);
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            component.update();
        });
        let yearLabels = component.find("label#year");
        let yearLabel = yearLabels.at(0);
        axios.get = jest.fn().mockImplementation((destination, filters) => {
            let years = filters.year
            let resp = []
            for(let i = 0; i < years.length; i++){
                for(let u = 0; u < fakeTestUsers.length; u++){
                    if (fakeTestUsers[u].year == years[i]){
                        resp.push(fakeTestUsers[u]);
                    }
                }
            }
            return Promise.resolve({data: resp})
        })
        yearLabel.find("input").simulate('change', {target: {checked: true, value: 'Freshman'}});
        yearLabels.at(5).find("input").simulate('change', {target: {checked: true, value: 'Ph.D'}});
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            component.update();
        });
        expect(component.find("#userResult").length).toEqual(4);
    })

    test("User Check a major filter box", async () => {
        axios.get = jest.fn().mockImplementation((destination, par) => {
            if (destination == process.env.REACT_APP_MAJOR_ENDPOINT){
                return Promise.resolve({data: fakeMajors})
            } else if (destination == process.env.REACT_APP_CLASSES_ENDPOINT){
                return Promise.resolve({data: classes.slice(0,5)});
            }
        })
        const component = mount(<Search />);
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            component.update();
        });

        let majorLabels = component.find("label#major")
        let majorLabel = majorLabels.at(0);

        axios.get = jest.fn().mockImplementation((destination, filters) => {
            let majors = filters.major
            majors = fakeMajors.filter(item => majors.includes(item.id))
            majors = majors.map((item, id) => item.name)
            let resp = []
            for(let i = 0; i < majors.length; i++){
                for(let u = 0; u < fakeTestUsers.length; u++){
                    if (fakeTestUsers[u].major == majors[i]){
                        resp.push(fakeTestUsers[u]);
                    }
                }
            }
            return Promise.resolve({data: resp})
        })
        majorLabel.find("input").simulate('change', {target: {checked: true}});
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            component.update();
        });
        expect(component.find("#userResult").length).toEqual(2);
    })

    test("User Check a class filter box", async () => {
        axios.get = jest.fn().mockImplementation((destination, par) => {
            if (destination == process.env.REACT_APP_MAJOR_ENDPOINT){
                return Promise.resolve({data: fakeMajors})
            } else if (destination == process.env.REACT_APP_CLASSES_ENDPOINT){
                return Promise.resolve({data: classes.slice(0,5)});
            }
        })
        const component = mount(<Search />);
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            component.update();
        });

        let classLabels = component.find("label#classes")
        let classLabel = classLabels.at(0);
        axios.get = jest.fn().mockImplementation((destination, filters) => {
            let fClasses = filters.classes
            fClasses = classes.filter(item => fClasses.includes(item.id))
            fClasses = fClasses.map((item, id) => item.id)
            let resp = []
            for(let i = 0; i < fClasses.length; i++){
                for(let u = 0; u < fakeTestUsers.length; u++){
                    if (fakeTestUsers[u].classes.includes(fClasses[i])){
                        resp.push(fakeTestUsers[u]);
                    }
                }
            }
            return Promise.resolve({data: resp})
        })
        classLabel.find("input").simulate('change', {target: {checked: true}});
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            component.update();
        });
        expect(component.find("#userResult").length).toEqual(1);
    })
})