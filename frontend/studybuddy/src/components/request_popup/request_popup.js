import React, { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';

import { Button } from "@material-ui/core";
import { Stack } from "@mui/material"

import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function RequestPopup() {
  const [slots, setSlots] = useState([""]);

  const removeSlots = (index) => {
    let dres = [...slots];
    dres.splice(index, 1);
    setSlots(dres);
  };

  const slotGroup = (index) => {
      return (
        <div>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={10}>
                <h3>Start</h3>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker/>
                </MuiPickersUtilsProvider>
                <h3>End</h3>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker/>
                </MuiPickersUtilsProvider>
                <Button onClick={() => removeSlots(index)}>Remove</Button>
            </Stack>

        </div>
        
      );
  }

  const addSlots = () => {
    let res = [...slots];
    res.push("");
    setSlots(res);
  };

  return (
    <div className="App">
        <h1>Request a Time</h1>
      {slots.map((x, index) => slotGroup(index))}
      <br />
      <Button onClick={() => addSlots()}>Add</Button>
    </div>
  );
}

export default RequestPopup; 
