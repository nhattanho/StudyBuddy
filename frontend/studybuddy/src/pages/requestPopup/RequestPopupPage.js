import React from "react";
import { Button } from "@material-ui/core";
import RequestPopup from "../../components/request_popup/request_popup";

const RequestPopupPage = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    //the actual profile page will need to get these from redux
    //let user = "61882ca2ecd1b1934636eb21"; //walter
    //let recipient = "61882ca2ecd1b1934636eb28"; //skyler,

    return(
        <div>
            <Button Button variant="contained" color="primary" onClick={handleClickOpen}>
                Request!
            </Button>

            <RequestPopup onClose={handleClose} open={open} user={props.user} receiver={props.recipient} callback={props.callback} />
        </div>
    )
};

export default RequestPopupPage;