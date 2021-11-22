import React, { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';

import { Button } from "@material-ui/core";
import { Stack, Dialog, Box } from "@mui/material"
import { Alert, AlertTitle } from "@material-ui/lab"

import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

/**
 * Popup to create a buddyrequest between two users
 * @author Chanel Young
 * @param {function} onClose - function called when popup closed
 * @param {function} onSubmit - function called when request is submitted, provides extended functionality to the base submit
 * @param {string} user - objectid of current user
 * @param {string} recipient - objectid of request recipient
 * @return {Dialog} - the request dialog
 */
function RequestPopup(props) {
  const axios = require('axios');

  const MAX_SLOTS = 4;
  let now = new Date(); 

  const [slots, setSlots] = useState([""]); 
  const [startDateTimes, setStartDateTimes]= useState([now]);
  const [endDateTimes, setEndDateTimes]= useState([now]);
  const [alert, setAlert]= useState(<div/>);

  const removeSlots = (index) => {
    let newSlots = [...slots];
    newSlots.splice(index, 1);
    setSlots(newSlots);

    let newStarts = [...startDateTimes];
    newStarts.splice(index, 1);
    setStartDateTimes(newStarts);

    let newEnds = [...endDateTimes];
    newEnds.splice(index, 1);
    setEndDateTimes(newEnds);
  };

  const slotGroup = (index) => {
      return (
        <div>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={10}>
                <h3>Start</h3>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                      minDate={now}
                      value={startDateTimes[index]}
                      onChange={(newValue) => {
                        let newStarts = [...startDateTimes];
                        newStarts[index] = newValue; 
                        setStartDateTimes(newStarts);
                      }}
                      helperText={(startDateTimes[index] > endDateTimes[index]) ? "start time must be before end time" : null}
                    />
                </MuiPickersUtilsProvider>
                <h3>End</h3>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                      minDate={now}
                      value={endDateTimes[index]}
                      onChange={(newValue) => {
                        let newEnds = [...endDateTimes];
                        newEnds[index] = newValue; 
                        setEndDateTimes(newEnds);
                      }}
                    />
                </MuiPickersUtilsProvider>
                <Button disabled={slots.length === 1} onClick={() => removeSlots(index)}>Remove</Button>
            </Stack>
        </div>
      );
  }

  const addSlots = () => {
    let res = [...slots];
    res.push("");
    setSlots(res);

    let newStarts = [...startDateTimes];
    newStarts.push(now); 
    setStartDateTimes(newStarts);

    let newEnds = [...endDateTimes];
    newEnds.push(now); 
    setEndDateTimes(newEnds);
  };

  const canSubmit = () => {
    let error = false; 
    for(let i = 0; i < slots.length; i++){
      if(startDateTimes[i] > endDateTimes[i]){
        error = true; 
      }
    }
    return !error; 
  };

  const onSubmit = () => {
    if(!canSubmit()){ 
      setAlert(
      <Alert severity="error" onClose={() => {setAlert(<div/>);}}>
        <AlertTitle>Error</AlertTitle>
        All start times must come before end times
      </Alert>);
    }
    else{
      let _dateslots = []
      for(let i = 0; i < startDateTimes.length; i++){
        _dateslots.push(startDateTimes[i], endDateTimes[i]);
      }

      const body = {
          sender: props.user, 
          receiver: props.receiver,
          dateslots: _dateslots,
      };

      axios 
      .post(`http://localhost:5000/buddyrequest/create`, body)
      .then((res) => {
          if (res.data.success) {
            console.log("success!")
            props.callback(true, 'Request successfully submitted!')
          } else {
            console.log("fail :(");
          }
      })
      .catch(function (e) {
          props.callback(false, `Request failed to submit: ${e}`)
          console.log(e); 
      });

      props.onClose();
    }
  };

  return (
    <Dialog onClose={props.onClose} open={props.open} maxWidth="md" fullWidth={true}>
      <Box justifyContent="center" alignItems="center" padding="30px"> 
        {alert}
        <h1> Set Request Time </h1>
        {slots.map((x, index) => slotGroup(index))}
        <br />
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={30}>
          <Button disabled={slots.length >= MAX_SLOTS} onClick={() => addSlots()}>Add Slot</Button>
          <Button onClick={() => onSubmit()}>Submit</Button>
        </Stack>
      </Box>
      
    </Dialog>
  );
}

export default RequestPopup; 
