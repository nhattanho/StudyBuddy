import { unmountComponentAtNode } from "react-dom";
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {mount, configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import Buddies from "./buddies.js";

configure({adapter: new Adapter()});

jest.mock("axios");
jest.mock("react-redux", () => {
  return {
    useSelector: () => ({
	  id: "currentuser"
    })
  }
})

const USER1 = {
	_id: "user1",
  name: "Walter White",
  profileURL: "https://static.wikia.nocookie.net/breakingbad/images/e/e7/BB-S5B-Walt-590.jpg"
}

const USER2 = {
	_id: "user2",
  name: "Saul Goodman",
  profileURL: "https://static.wikia.nocookie.net/breakingbad/images/e/e7/BB-S5B-Walt-590.jpg"
}

const USER3 = {
	_id: "user3",
	name: "Hank Schrader",
  profileURL: "https://static.wikia.nocookie.net/breakingbad/images/e/e7/BB-S5B-Walt-590.jpg"
}

const USER4 = {
	_id: "user4",
	name: "Skyler White",
  profileURL: "https://static.wikia.nocookie.net/breakingbad/images/e/e7/BB-S5B-Walt-590.jpg"
}

const USER5 = {
	_id: "user5",
	name: "Mike Ehramantraut",
  profileURL: "https://static.wikia.nocookie.net/breakingbad/images/e/e7/BB-S5B-Walt-590.jpg"
}

const USER6 = {
	_id: "user6",
	name: "Gus Fring",
  profileURL: "https://static.wikia.nocookie.net/breakingbad/images/e/e7/BB-S5B-Walt-590.jpg"
}

const CURRENT_USER = {
	_id: "currentuser",
	pastbuddies: [USER3, USER6]
}

const USERS = [CURRENT_USER, USER1, USER2, USER3, USER4, USER5, USER6];

const INCOMING_REQUESTS = [
	{
		_id: "incoming1",
		sender: USER1._id,
		receiver: CURRENT_USER._id,
		status: "Pending",
		dateslots: ['2021-11-25T01:25:57.000+00:00', '2021-11-25T03:25:57.000+00:00']
	},
	{
		_id: "incoming2",
		sender: USER4._id,
		receiver: CURRENT_USER._id,
		status: "Pending",
		dateslots: ['2021-11-26T02:10:21.000+00:00', '2021-11-26T05:50:00.000+00:00']
	},
]

const OUTGOING_REQUESTS = [
	{
		_id: "outgoing1",
		sender: CURRENT_USER._id,
		receiver: USER2._id,
		status: "Pending"
	},
	{
		_id: "outgoing2",
		sender: CURRENT_USER._id,
		receiver: USER5._id,
		status: "Pending"
	},
]

let container = null;
beforeEach(() => {
	axios.get = jest.fn((destination) => {
		const outgoingRequestsEndpoint = "http://localhost:5000/buddyrequest/" + CURRENT_USER._id + "/sent";
		const incomingRequestsEndpoint = "http://localhost:5000/buddyrequest/" + CURRENT_USER._id + "/received";
    if (destination == outgoingRequestsEndpoint) {
      return Promise.resolve({data: {buddyrequests: OUTGOING_REQUESTS}})
    } else if (destination == incomingRequestsEndpoint) {
      return Promise.resolve({data: {buddyrequests: INCOMING_REQUESTS}});
    }

    for (let i=0; i<USERS.length; i++) {
    	let userInfoEndpoint = "http://localhost:5000/user/" + USERS[i]._id;
			if (destination == userInfoEndpoint) {
				return Promise.resolve({data: {user: USERS[i]}})
			}
    }
  })

  axios.post = jest.fn((destination, par) => {
  		if (destination == "http://localhost:5000/zoom/create") {
  			return Promise.resolve({data: {data: {join_url: "join.url"}}})
  		} else if (destination == "http://localhost:5000/email/create") {
  			return Promise.resolve();
  		}
		return Promise.resolve({data: {success: true}});
	});

	axios.put = jest.fn((destination, par) => {
		return Promise.resolve({data: {success: true}});
	});

	axios.delete = jest.fn((destination) => {
		return Promise.resolve({data: {success: true}});
	});

  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Tests component rendering", () => {

	test("Test all 3 columns rendered", async() => {
		await act(async() => render(<Buddies />));
		expect(screen.getByText('Outgoing Requests')).toBeInTheDocument();
		expect(screen.getByText('Incoming Requests')).toBeInTheDocument();
		expect(screen.getByText('Matched Buddies')).toBeInTheDocument();
	});

	test("Test outgoing request has 'Cancel' button", async() => {
		await act(async() => render(<Buddies />));
  	let buddyCard = screen.getByText('Saul Goodman').closest('div.MuiCard-root');
		expect(buddyCard).toContainElement(within(buddyCard).getByText('Cancel Request'));
	});

	test("Test incoming request has 'View Request' button", async() => {
		await act(async() => render(<Buddies />));
  	let buddyCard = screen.getByText('Walter White').closest('div.MuiCard-root');
		expect(buddyCard).toContainElement(within(buddyCard).getByText('View Request'));
	});

	test("Test matched buddy has 'Request' and 'Delete' buttons", async() => {	
		await act(async() => render(<Buddies />));
		let buddyCard = screen.getByText('Hank Schrader').closest('div.MuiCard-root');
		expect(buddyCard).toContainElement(within(buddyCard).getByText('Request'));
		expect(buddyCard).toContainElement(within(buddyCard).getByText('Delete'));
	});
});

describe("Tests component data loading", () => {

	test("Test outgoing column", async() => {
		await act(async() => render(<Buddies />));
		let column = screen.getByText('Outgoing Requests').closest('div[class*=makeStyles-column]');
		expect(column).toContainElement(within(column).getByText('Saul Goodman'));
		expect(column).toContainElement(within(column).getByText('Mike Ehramantraut'));
	});

	test("Test incoming column", async() => {
		await act(async() => render(<Buddies />));
		screen.debug()
		let column = screen.getByText('Incoming Requests').closest('div[class*=makeStyles-column]');

		expect(column).toContainElement(within(column).getByText('Walter White'));
		expect(column).toContainElement(within(column).getByText('Skyler White'));
	});

	test("Test matched column", async() => {	
		await act(async() => render(<Buddies />));
		let column = screen.getByText('Matched Buddies').closest('div[class*=makeStyles-column]');
		expect(column).toContainElement(within(column).getByText('Hank Schrader'));
		expect(column).toContainElement(within(column).getByText('Gus Fring'));
	});
});

describe("Tests button actions", () => {
	
	test("Test view request and accept", async() => {
		await act(async() => render(<Buddies />));
		let card = screen.getByText('Walter White').closest('div.MuiCard-root');

		let incomingCol = screen.getByText('Incoming Requests').closest('div[class*=makeStyles-column]');
		let matchedCol = screen.getByText('Matched Buddies').closest('div[class*=makeStyles-column]');
		expect(incomingCol.length == 2);
		expect(matchedCol.length == 2);

		let viewButton = within(card).getByText('View Request').closest('button');
		await act(async() => userEvent.click(viewButton));
		let acceptButton = screen.getByText('Accept').closest('button');
		await act(async() => userEvent.click(acceptButton));

		expect(incomingCol.length == 1);
		expect(matchedCol.length == 3);
		expect(matchedCol).toContainElement(within(matchedCol).getByText('Walter White'));
	})

	test("Test view request and reject", async() => {
		await act(async() => render(<Buddies />));
		let card = screen.getByText('Walter White').closest('div.MuiCard-root');

		let incomingCol = screen.getByText('Incoming Requests').closest('div[class*=makeStyles-column]');
		expect(incomingCol.length == 2);

		let viewButton = within(card).getByText('View Request').closest('button');
		await act(async() => userEvent.click(viewButton));
		let acceptButton = screen.getByText('Accept').closest('button');
		await act(async() => userEvent.click(acceptButton));

		expect(incomingCol.length == 1);
	})

	test("Test view details and propose new time", async() => {
		await act(async() => render(<Buddies />));
		let card = screen.getByText('Walter White').closest('div.MuiCard-root');

		let incomingCol = screen.getByText('Incoming Requests').closest('div[class*=makeStyles-column]');
		let outgoingCol = screen.getByText('Outgoing Requests').closest('div[class*=makeStyles-column]');
		expect(incomingCol.length == 2);
		expect(outgoingCol.length == 2);

		let viewButton = within(card).getByText('View Request').closest('button');
		await act(async() => userEvent.click(viewButton));
		let proposeNewButton = screen.getByText('Propose New').closest('button');
		await act(async() => userEvent.click(proposeNewButton));
		let submitButton = screen.getByText('Submit').closest('button');
		await act(async() => userEvent.click(submitButton));
		
		expect(incomingCol.length == 1);
		expect(outgoingCol.length == 3);
		expect(outgoingCol).toContainElement(within(outgoingCol).getByText('Walter White'));
	})

	test("Test cancel confirmation and cancel", async() => {
		await act(async() => render(<Buddies />));
		let card = screen.getByText('Saul Goodman').closest('div.MuiCard-root');

		let outgoingCol = screen.getByText('Outgoing Requests').closest('div[class*=makeStyles-column]');
		expect(outgoingCol.length == 2);

		let cancelButton = within(card).getByText('Cancel Request').closest('button');
		await act(async() => userEvent.click(cancelButton));
		let confirmButton = screen.getByText('Yes, Cancel Request').closest('button');
		await act(async() => userEvent.click(confirmButton));

		expect(outgoingCol.length == 1);
	})

	test("Test delete confirmation and delete", async() => {
		await act(async() => render(<Buddies />));
		let card = screen.getByText('Hank Schrader').closest('div.MuiCard-root');

		let matchedCol = screen.getByText('Matched Buddies').closest('div[class*=makeStyles-column]');
		expect(matchedCol.length == 2);

		let cancelButton = within(card).getByText('Delete').closest('button');
		await act(async() => userEvent.click(cancelButton));
		let confirmButton = screen.getByText('Yes, Delete').closest('button');
		await act(async() => userEvent.click(confirmButton));
		
		expect(matchedCol.length == 1);
	})

	test("Test request past buddy", async() => {
		await act(async() => render(<Buddies />));
		let card = screen.getByText('Hank Schrader').closest('div.MuiCard-root');

		let matchedCol = screen.getByText('Matched Buddies').closest('div[class*=makeStyles-column]');
		let outgoingCol = screen.getByText('Outgoing Requests').closest('div[class*=makeStyles-column]');
		expect(matchedCol.length == 2);
		expect(outgoingCol.length == 2);

		let requestButton = within(card).getByText('Request').closest('button');
		await act(async() => userEvent.click(requestButton));
		let submitButton = screen.getByText('Submit').closest('button');
		await act(async() => userEvent.click(submitButton));
		
		expect(matchedCol.length == 2);
		expect(outgoingCol.length == 3);
		expect(outgoingCol).toContainElement(within(outgoingCol).getByText('Saul Goodman'));
	})
});
