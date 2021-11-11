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

    return(
        <div>
            <Button onClick={handleClickOpen}>
                Open request dialog
            </Button>

            <RequestPopup onClose={handleClose} open={open} />
        </div>
    )
};

export default RequestPopupPage;