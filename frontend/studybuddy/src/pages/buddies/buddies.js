import React, { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Button, Dialog, DialogTitle, Card, CardContent, CardMedia, Typography, Link } from "@material-ui/core";
import { PrimaryButton, SecondaryButton, DefaultButton } from "../../components/button/button";
import RequestPopup from "../../components/request_popup/request_popup.js";

const useStyles = makeStyles((theme) => ({
  threeCol: {
    display: "flex",
		justifyContent: "space-between"
  },
  column: {
    width: "100%",
    height: "100vh",
    margin: "2em 0",
    borderRight: "2px solid",
    borderRightColor: "#201E1D"
  },
  buddy: {
  	borderRadius: "10px",
  	width: "90%",
  	height: "6em",
  	margin: "1em auto",
  	display: 'flex',
    alignItems: 'center',
    justifyContent: "space-between",
    boxShadow: "10px 10px 30px silver"
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
	},
	nameText: {
		fontSize: "1.5em",
		fontWeight: "bold",
		color: "black"
	},
	columnName: {
		fontSize: "2em",
		fontWeight: "bold",
		marginBottom: "1em"
	},
	deleteConfirmation: {
		display: "flex",
		flexDirection: "column"
	},
	horizontalOptions: {
		display: "flex",
		justifyContent: "space-around",
		margin: "0em 3em 1em 3em"
	}
}));

const BuddyType = {
	OUTGOING: "outgoing",
	INCOMING: "incoming",
	MATCHED: "matched",
}

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

	const userinformation = useSelector((state) => state);

	const [outgoing, setOutgoing] = useState([]);
	const [incoming, setIncoming] = useState([]);
	const [matched, setMatched] = useState([]);
	const [loadingOutgoing, setLoadingOutgoing] = useState(true);
	const [loadingIncoming, setLoadingIncoming] = useState(true);
	const [loadingMatched, setLoadingMatched] = useState(true);

	let outgoingRequests = useRef([]);
	let incomingRequests = useRef([]);
	let fullUserInfo = useRef();

	function getBuddies() {
		setOutgoing([]);
		setIncoming([]);
		setMatched([]);

    axios
    	.get(`http://localhost:5000/buddyrequest/${userinformation.id}/sent`)
      .then((resp) => {
      	const buddyrequests = resp.data.buddyrequests
      	let outgoingBuddies = []
      	for (let i=0; i<buddyrequests.length; i++) {
      		if (buddyrequests[i].status == 'Pending') {
	      		axios
				    	.get(`http://localhost:5000/user/${buddyrequests[i].receiver}`)
				      .then((resp) => {
				      	outgoingRequests.current = outgoingRequests.current.concat(buddyrequests[i])
				      	setOutgoing(outgoing => outgoing.concat(resp.data.user));
				    }).catch((err) => {
				        throw err;
				    })
				  }
      	}
      	setLoadingOutgoing(false);
    }).catch((err) => {
        throw err;
    })
    axios
    	.get(`http://localhost:5000/buddyrequest/${userinformation.id}/received`)
      .then((resp) => {
      	const buddyrequests = resp.data.buddyrequests
      	for (let i=0; i<buddyrequests.length; i++) {
      		if (buddyrequests[i].status == 'Pending') {
      			axios
				    	.get(`http://localhost:5000/user/${buddyrequests[i].sender}`)
				      .then((resp) => {
				      	incomingRequests.current = incomingRequests.current.concat(buddyrequests[i])
				      	setIncoming(incoming => incoming.concat(resp.data.user));
				    }).catch((err) => {
				        throw err;
				    })
      		}
      	}
      	setLoadingIncoming(false);
    }).catch((err) => {
        throw err;
    })
    axios
    	.get(`http://localhost:5000/user/${userinformation.id}`)
      .then((resp) => {
      	fullUserInfo.current = resp.data.user;
      	setMatched(resp.data.user.pastbuddies);
      	setLoadingMatched(false);
    }).catch((err) => {
        throw err;
    })
    console.log("data loaded")
  }

  useEffect(() => {
  	getBuddies()
  }, [])

	const removeById = (id, list) => {
		return list.filter(item => item._id !== id);
	}

	const removeBuddyRequest = (buddyId, requestId, buddies, requests, setBuddies) => {
		requests = removeById(requestId, requests)
    setBuddies(removeById(buddyId, buddies));
	}

	const handleAcceptRequest = (buddy, request, handleClose) => {
		axios
			.post(`http://localhost:5000/buddyrequest/accept`, { id: request._id })
			.then((resp) => {
				if (resp.data.success) {
					removeBuddyRequest(buddy._id, request._id, incoming, incomingRequests.current, setIncoming);
					let updated = Object.assign({}, fullUserInfo.current);
					updated.pastbuddies = [{
						_id: buddy._id,
						name: buddy.name,
						profileURL: buddy.profileURL,
					}].concat(updated.pastbuddies)

					axios
			    	.put(`http://localhost:5000/user/email/update/`, updated)
			      .then((resp) => {
			      	if (resp.data.success) {
			      		fullUserInfo.current = updated
			      		setMatched(fullUserInfo.current.pastbuddies);
						console.log(buddy);
						console.log(request.dateslots[0]); 
						let zoominfo = {
							userid: buddy.zoomid,
							starttime: request.dateslots[0]
						};
						axios
						.post(`http://localhost:5000/zoom/create`, zoominfo)
						.then((resp) => {
							console.log(resp); 
							let zoomlink = resp.data.data.join_url;
							let _message = "Thank you for scheduling your study session with StudyBuddy, here's your link: " + zoomlink; 
							let _subject = "Your StudyBuddy zoom link"; 
							
							let buddy_email_info = {
								message: _message,
								subject: _subject,
								recipient: buddy.email,
							}
							let user_email_info = {
								message: _message,
								subject: _subject,
								recipient: userinformation.email,
							}

							axios
							.post(`http://localhost:5000/email/create`, buddy_email_info);
							axios
							.post(`http://localhost:5000/email/create`, user_email_info);
							
						}).catch((err) => {
							throw err; 
						});
			      	}
			      	if (resp.data.err) {
			      		console.log(resp.data.err)
			      	}
			      	handleClose();
			    }).catch((err) => {
			        throw err;
			    })
				}
			})
	}

	const handleNewRequest = (buddy, request) => {
		console.log(request)
		if (request == null) {
			return;
		}
		outgoingRequests.current = [request].concat([])
		setOutgoing(outgoing => [buddy].concat(outgoing));
	}

	const handleRejectRequest = (buddy, request, handleClose) => {
		axios
    	.delete(`http://localhost:5000/buddyrequest/delete/${request._id}`)
      .then((resp) => {
      	if (resp.data.success) {
      		removeBuddyRequest(buddy._id, request._id, incoming, incomingRequests.current, setIncoming);
      	}
      	if (resp.data.err) {
      		console.log(resp.data.err)
      	}
      	handleClose();
    }).catch((err) => {
        throw err;
    })
	}

	const handleCancelRequest = (buddy, request, handleClose) => {
		axios
    	.delete(`http://localhost:5000/buddyrequest/delete/${request._id}`)
      .then((resp) => {
      	if (resp.data.success) {
      		removeBuddyRequest(buddy._id, request._id, outgoing, outgoingRequests.current, setOutgoing);
      	}
      	if (resp.data.err) {
      		console.log(resp.data.err)
      	}
      	handleClose();
    }).catch((err) => {
        throw err;
    })
	}

	const handleDeleteBuddy = (buddy, handleClose) => {
		let updated = Object.assign({}, fullUserInfo.current);
		updated.pastbuddies = removeById(buddy._id, updated.pastbuddies)

		axios
    	.put(`http://localhost:5000/user/email/update/`, updated)
      .then((resp) => {
      	if (resp.data.success) {
      		setMatched(removeById(buddy._id, matched));
      		fullUserInfo.current = updated
      	}
      	if (resp.data.err) {
      		console.log(resp.data.err)
      	}
      	handleClose();
    }).catch((err) => {
        throw err;
    })
	}

	const render = () => {
		if (loadingIncoming || loadingOutgoing || loadingMatched) {
			return <h4>Loading...</h4>
		} else {
			return (
				<div className={classes.threeCol}>
					<BuddyColumn type={BuddyType.OUTGOING} buddies={outgoing} requests={outgoingRequests.current} handleCancel={handleCancelRequest}/>
					<BuddyColumn type={BuddyType.INCOMING} buddies={incoming} requests={incomingRequests.current} handleAccept={handleAcceptRequest} handleReject={handleRejectRequest} handleNew={handleNewRequest}/>
					<BuddyColumn type={BuddyType.MATCHED} buddies={matched} requests={[]} handleNew={handleNewRequest} handleDelete={handleDeleteBuddy}/>
				</div>
			);
		}
	}
	return render();
}

/**
 * Component for a buddy column on the buddies page.
 * Each column contains a specific type of buddy/request (outgoing, incoming, matched).
 * @prop {enum} type The type of buddy shown in the column
 * @prop {[]object]} buddies The buddies populating the column
 * @prop {[]object]} requests The requests corresponding to each buddy
 * @prop {functions} handleFns Callback functions to handle accepting/rejecting/cancelling/deleting buddies
 */
const BuddyColumn = (props) => {
	const classes = useStyles();
	const { type, buddies, requests, ...handleFns } = props;

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
		buddyComponents.push(<Buddy key={buddies[i]._id} buddyInfo={buddies[i]} requestInfo={requests[i]} type={type} {...handleFns}/>)
	}

	return (
		<div className={classes.column}>
			<Typography className={classes.columnName}>{colName}</Typography>
			{buddyComponents}
		</div>
	)
}

/**
 * Component representing a card showing basic buddy info.
 * Contains options for interacting with the buddy card that are dependent on buddy type.
 * @prop {object} buddyInfo The specific buddy's info
 * @prop {object} requestInfo Info about the particular request
 * @prop {enum} type The type of buddy
 * @prop {functions} handleFns  Callback functions to handle accepting/rejecting/cancelling/deleting buddies
 */
const Buddy = (props) => {
	const { buddyInfo, requestInfo, type, ...handleFns } = props;
	const classes = useStyles();
	const userinformation = useSelector((state) => state);

	const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
	const [showRequestDetails, setShowRequestDetails] = useState(false);
	const [showNewRequest, setShowNewRequest] = useState(false);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

	const requestPopup =
		<RequestPopup
			open={showNewRequest}
			onClose={() => setShowNewRequest(false)}
			onSubmit={(request) => props.handleNew(buddyInfo, request)}
			user={userinformation._id}
			receiver={buddyInfo._id}
		/>

	let options, requestDetails, newRequest, deleteConfirmation, cancelConfirmation;

	switch (type) {
		case BuddyType.OUTGOING:
			options =<div className={classes.options}><SecondaryButton className={classes.optionButton} text="Cancel Request" onClick={() => setShowCancelConfirmation(true)} /></div>
			requestDetails = null;
			newRequest = null;
			deleteConfirmation = null;
			cancelConfirmation =
				<CancelConfirmation
					show={showCancelConfirmation}
					buddyInfo={buddyInfo}
					requestInfo={requestInfo}
					handleClose={() => setShowCancelConfirmation(false)}
					handleCancel={props.handleCancel}
				/>
			break;
		case BuddyType.INCOMING:
			options = <div><PrimaryButton className={classes.options} variant="contained" text="View Request" onClick={() => setShowRequestDetails(true)} /></div>
			newRequest = requestPopup;
			requestDetails =
				<RequestDetails
					show={showRequestDetails}
					buddyInfo={buddyInfo}
					requestInfo={requestInfo}
					handleClose={() => setShowRequestDetails(false)}
					handleAccept={props.handleAccept}
					handleReject={props.handleReject}
					handleNew={() => setShowNewRequest(true)}
				/>
				deleteConfirmation = null;
				cancelConfirmation = null;
			break;
		case BuddyType.MATCHED:
			options =
				<div className={classes.options}>
					<PrimaryButton className={classes.optionButton} variant="contained" text="Request" onClick={() => setShowNewRequest(true)} />
					<SecondaryButton className={classes.optionButton} variant="contained" text="Delete" onClick={() => setShowDeleteConfirmation(true)} />
				</div>
			requestDetails = null;
			newRequest = requestPopup;
			deleteConfirmation =
				<DeleteConfirmation
					show={showDeleteConfirmation}
					buddyInfo={buddyInfo}
					handleClose={() => setShowDeleteConfirmation(false)}
					handleDelete= {props.handleDelete}
				/>
				cancelConfirmation = null;
			break;
	}
	let profileLink = "/sendingRequest/" + buddyInfo._id;
	return (
		<Card className={classes.buddy}>
			<CardMedia component="img" image={buddyInfo.profileURL} className={classes.buddyImg}></CardMedia>
			<CardContent>
				<Link href={profileLink} className={classes.nameText}>
					{buddyInfo.name}
				</Link>
			</CardContent>
			<CardContent>
			 	{options}
			 	{requestDetails}
			 	{newRequest}
			 	{deleteConfirmation}
			 	{cancelConfirmation}
			</CardContent>
		</Card>
	)
}

/**
 * Modal component containing details of a specific buddy request.
 * Allows users to select from one of the proposed times and accept the request,
 * or reject or propose a new time for the study session.
 * @prop {boolean} show Whether the modal should be open or not
 * @prop {object} buddyInfo The specific buddy's info
 * @prop {object} requestInfo Info about the particular request
 * @prop handleFns {functions} Callback functions to handle accepting/rejecting buddies and closing the modal
 */
const RequestDetails = (props) => {
	const classes = useStyles();
	return (
		<Dialog onClose={props.handleClose} open={props.show} maxWidth="md" fullWidth>
			<div className={classes.requestDetails}>
				<RequestedTimes dates={props.requestInfo.dateslots}></RequestedTimes>
				<div className={classes.options}>
					<PrimaryButton className={classes.optionButton} text="Accept" onClick={() => props.handleAccept(props.buddyInfo, props.requestInfo, props.handleClose)} />
					<SecondaryButton className={classes.optionButton} text="Reject" onClick={() => props.handleReject(props.buddyInfo, props.requestInfo, props.handleClose)} />
					<DefaultButton className={classes.optionButton} text="Propose New" onClick={() => {props.handleNew(); props.handleClose()}}/>
				</div>
			</div>
			<Button variant="outlined" onClick={props.handleClose}>Close</Button>
		</Dialog>
	)
}

/**
 * Component showing a selectable list of proposed study times.
 * @prop {[]Date} times The proposed study times
 */
const RequestedTimes = (props) => {
	const [selectedItem, setSelectedItem] = useState(-1);

	let dateListItems = [];
	let start, end, formattedStart, formattedEnd;
	for (let i=0; i<props.dates.length; i+=2) {
		start = new Date(props.dates[i]);
		end = new Date(props.dates[i+1]);
		var options = { month: 'long', day: 'numeric' };
		formattedStart = start.toLocaleDateString("en-US", options) + " " + start.toLocaleTimeString('en-US');
		formattedEnd = end.toLocaleDateString("en-US", options) + " " + end.toLocaleTimeString('en-US');
		dateListItems.push(
			<ListItem button selected={selectedItem == i} onClick={() => setSelectedItem(i)} key={i}>
				<Typography variant="h6">{formattedStart} - {formattedEnd}</Typography>
			</ListItem>
		)
	}
	return (
		<div>
			<List>
				{dateListItems}
			</List>
		</div>
	)
}

/**
 * Component showing a delete confirmation dialog.
 * @prop {boolean} show Whether the modal should be open or not
 * @prop {object} buddyInfo The specific buddy's info
 * @prop handleFns {functions} Callback functions to handle deleting buddies and closing the modal
 */
const DeleteConfirmation = (props) => {
	const classes = useStyles();
	return (
		<Dialog onClose={props.handleClose} open={props.show} maxWidth="xs" fullWidth>
			<div className={classes.confirmation}>
				<DialogTitle>Are you sure you want to delete this buddy?</DialogTitle>
				<div className={classes.horizontalOptions}>
					<SecondaryButton className={classes.optionButton} text="Yes, Delete" onClick={() => props.handleDelete(props.buddyInfo, props.handleClose)} />
					<DefaultButton className={classes.optionButton} text="Nevermind" onClick={props.handleClose} />
				</div>
			</div>
		</Dialog>
	)
}

/**
 * Component showing a cancel confirmation dialog.
 * @prop {boolean} show Whether the modal should be open or not
 * @prop {object} buddyInfo The specific buddy's info
 * @prop {object} requestInfo Info about the particular request
 * @prop handleFns {functions} Callback functions to handle deleting buddies and closing the modal
 */
const CancelConfirmation = (props) => {
	const classes = useStyles();
	return (
		<Dialog onClose={props.handleClose} open={props.show} maxWidth="xs" fullWidth>
			<div className={classes.confirmation}>
				<DialogTitle>Are you sure you want to cancel this request?</DialogTitle>
				<div className={classes.horizontalOptions}>
					<SecondaryButton className={classes.optionButton} text="Yes Cancel Request" onClick={() => props.handleCancel(props.buddyInfo, props.requestInfo, props.handleClose)} />
					<DefaultButton className={classes.optionButton} text="Nevermind" onClick={props.handleClose} />
				</div>
			</div>
		</Dialog>
	)
}

