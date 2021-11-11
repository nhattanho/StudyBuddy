import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Button, Dialog, Card, CardContent, CardMedia } from "@material-ui/core";
import DannyPic from "./images/danny.jpg";
import SamPic from "./images/sam.jpg";
import TuckerPic from "./images/tucker.png";
import JazzPic from  "./images/jazz.png";
import ValPic from  "./images/val.png";
import DashPic from  "./images/dash.png";

const useStyles = makeStyles((theme) => ({
  threeCol: {
    display: "flex",
		justifyContent: "space-between"
  },
  column: {
    width: "100%",
    height: "100vh",
    border: "2px solid black",
  },
  buddy: {
  	borderRadius: "10px",
  	background: "silver",
  	width: "90%",
  	height: "6em",
  	margin: "1em auto",
  	display: 'flex',
    alignItems: 'center',
    justifyContent: "space-between",
  },
  buddyImg: {
  	borderRadius:"50%",
  	width: "5.5em",
  	height: "5.5em",
  	minWidth: "5.5em",
  	overflow: "hidden",
  	margin: "1em",
  },
	requestDetails: {
		display: "flex",
		justifyContent: "space-between",
		padding: "1em 2em"
	},
	options: {
		display: "flex",
		flexDirection: "column",
		paddingTop: "8px"
	},
	optionButton: {
		margin: ".25em 0"
	}
}));

const BuddyType = {
	OUTGOING: "outgoing",
	INCOMING: "incoming",
	MATCHED: "matched",
}

// Remove these hardcodes
const OUTGOING_BUDDIES = [
	{
		id: 1,
		name: "Valerie Gray",
		pic: ValPic,
	},
	{
		id: 2,
		name: "Dash Baxter",
		pic: DashPic,
	},
]

const INCOMING_BUDDIES = [
	{
		id: 3,
		name: "Jazz Fenton",
		pic: JazzPic,
	},
]

const MATCHED_BUDDIES = [
	{
		id: 4,
		name: "Danny Fenton",
		pic: DannyPic,
	},
	{
		id: 5,
		name: "Sam Manson",
		pic: SamPic,
	},
	{
		id: 6,
		name: "Tucker Foley",
		pic: TuckerPic,
	},
]

const REQUEST_TIMES = [
	{
		start: "November 12th 8:00pm",
		end: "November 12th 11:30pm"
	},
	{
		start: "November 14th 2:30pm",
		end: "November 14th 4:00pm"
	}
]

/**
 * React component for the Buddies Requests page.
 */
export default function Buddies() {
	const classes = useStyles();
	const [outgoing, setOutgoing] = useState(OUTGOING_BUDDIES);
	const [incoming, setIncoming] = useState(INCOMING_BUDDIES);
	const [matched, setMatched] = useState(MATCHED_BUDDIES);

	// TODO: get the actual buddies/requests

	const removeById = (id, buddyList) => {
		return buddyList.filter(buddy => buddy.id !== id);
	}

	const handleAcceptRequest = (buddy, handleClose) => {
		setIncoming(removeById(buddy.id, incoming));
		setMatched([buddy].concat(matched));
		handleClose();

	}

	const handleRejectRequest = (buddy, handleClose) => {
		setIncoming(removeById(buddy.id, incoming));
		handleClose();
	}

	const handleDeleteBuddy = (buddy) => {
		setMatched(removeById(buddy.id, matched));
	}

	return (
		<div className={classes.threeCol}>
			<BuddyColumn type={BuddyType.OUTGOING} buddies={outgoing} />
			<BuddyColumn type={BuddyType.INCOMING} buddies={incoming} handleAccept={handleAcceptRequest} handleReject={handleRejectRequest}/>
			<BuddyColumn type={BuddyType.MATCHED} buddies={matched} handleDelete={handleDeleteBuddy}/>
		</div>
	);
}

/**
 * Component for a buddy column on the buddies page.
 * Each column contains a specific type of buddy/request (outgoing, incoming, matched).
 * @prop {enum} type The type of buddy shown in the column
 * @prop {[]object]} buddies The buddies populating the column
 * @prop {functions} handleFns Callback functions to handle accepting/rejecting/cancelling/deleting buddies
 */
const BuddyColumn = (props) => {
	const classes = useStyles();
	const { type, buddies, ...handleFns } = props;

	let colName;
	switch (type) {
		case BuddyType.OUTGOING:
			colName = "Outgoing Requests";
			break;
		case BuddyType.INCOMING:
			colName = "Incoming Requests";
			break;
		case BuddyType.MATCHED:
			colName = "Matched Buddies";
			break;
	}

	let buddyComponents = []
	for (let i=0; i<buddies.length; i++) {
		buddyComponents.push(<Buddy key={buddies[i].id} buddyInfo={buddies[i]} type={type} {...handleFns}/>)
	}

	return (
		<div className={classes.column}>
			<h1>{colName}</h1>
			{buddyComponents}
		</div>
	)
}

/**
 * Component representing a card showing basic buddy info.
 * Contains options for interacting with the buddy card that are dependent on buddy type.
 * @prop {object} buddyInfo The specific buddy's info
 * @prop {enum} type The type of buddy
 * @prop {functions} handleFns  Callback functions to handle accepting/rejecting/cancelling/deleting buddies
 */
const Buddy = (props) => {
	const classes = useStyles();
	const [showRequest, setShowRequest] = useState(false);
	let options, requestDetails;

	switch (props.type) {
		case BuddyType.OUTGOING:
			options = null
			requestDetails = null
			break;
		case BuddyType.INCOMING:
			options =<div className={classes.options}><Button onClick={() => setShowRequest(true)} color="primary" variant="contained">View Request</Button></div>
			requestDetails =
				<RequestDetails
					show={showRequest}
					times={REQUEST_TIMES}
					handleClose={() => setShowRequest(false)}
					handleAccept={props.handleAccept}
					handleReject={props.handleReject}
				/>
			break;
		case BuddyType.MATCHED:
			options =
				<div className={classes.options}>
					<Button color="primary" variant="contained" className={classes.optionButton}>Request</Button>
					<Button color="secondary" variant="contained" className={classes.optionButton} onClick={() => props.handleDelete(props.buddyInfo)}>Delete</Button>
				</div>
			requestDetails = null
			break;
	}
	return (
		<Card className={classes.buddy}>
			<CardMedia component="img" image={props.buddyInfo.pic} className={classes.buddyImg}></CardMedia>
			<CardContent>
			 	<h2>{props.buddyInfo.name}</h2>
			</CardContent>
			<CardContent>
			 	{options}
			 	{requestDetails}
			</CardContent>
		</Card>
	)
}

/**
 * Modal component containing details of a specific buddy request.
 * Allows users to select from one of the proposed times and accept the request,
 * or reject or propose a new time for the study session.
 * @prop {boolean} show Whether the modal should be open or not
 * @prop {[]Date} times The proposed study session times
 * @prop handleFns {Function} Callback functions to handle accepting/rejecting buddies and closing the modal
 */
const RequestDetails = (props) => {
	const classes = useStyles();
	return (
		<Dialog onClose={props.handleClose} open={props.show} maxWidth="sm" fullWidth>
			<div className={classes.requestDetails}>
				<RequestedTimes times={props.times}></RequestedTimes>
				<div className={classes.options}>
					<Button variant="contained" color="primary" className={classes.optionButton} onClick={() => props.handleAccept(props.buddyInfo, props.handleClose)}>
						Accept
					</Button>
					<Button variant="contained" color="secondary" className={classes.optionButton} onClick={() => props.handleReject(props.buddyInfo, props.handleClose)}>
						Reject
					</Button>
					<Button variant="contained" className={classes.optionButton}>
						Propose New
					</Button>
				</div>
			</div>
			<Button variant="outlined" onClick={props.handleClose}>
				Close
			</Button>
		</Dialog>
	)
}

/**
 * Component showing a selectable list of proposed study times.
 * @prop {[]Date} The proposed study times
 */
const RequestedTimes = (props) => {
	const [selectedItem, setSelectedItem] = useState(-1);

	let timeListItems = []
	for (let i=0; i<props.times.length; i++) {
		timeListItems.push(
			<ListItem button selected={selectedItem == i} onClick={() => setSelectedItem(i)} key={i}>
				{props.times[i].start} - {props.times[i].end}
			</ListItem>
		)
	}
	return (
		<div>
			<List>
				{timeListItems}
			</List>
		</div>
	)
}
