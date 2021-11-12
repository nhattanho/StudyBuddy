import { unmountComponentAtNode } from "react-dom";
import { render, screen, within } from '@testing-library/react'
import Buddies from "../pages/buddies/buddies.js";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Tests component rendering", () => {
	// TODO: mock the api calls to return test data
	// For now just render and test on the hardcoded data since implementation will change in the future
	
	test("Test all 3 columns rendered", async() => {	
		render(<Buddies />);
		expect(screen.getByText('Outgoing Requests')).toBeInTheDocument();
		expect(screen.getByText('Incoming Requests')).toBeInTheDocument();
		expect(screen.getByText('Matched Buddies')).toBeInTheDocument();
	});

	test("Test incoming request has 'View Request' button", async() => {	
		render(<Buddies />);
		expect(screen.getByText('Jazz Fenton').closest('div.MuiCard-root')).toContainElement(screen.getByText('View Request'));
	});

	test("Test matched buddy has 'Request' and 'Delete' buttons", async() => {	
		render(<Buddies />);
		let buddyCard = screen.getByText('Danny Fenton').closest('div.MuiCard-root');
		expect(buddyCard).toContainElement(within(buddyCard).getByText('Request'));
		expect(buddyCard).toContainElement(within(buddyCard).getByText('Delete'));
	});
});