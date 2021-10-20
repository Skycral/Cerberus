import React, { useState } from "react";
import { FormControl, Button, Dialog, DialogActions, DialogContent, DialogTitle, OutlinedInput, InputLabel, Select, MenuItem, Box} from "@mui/material";

function MonthPicker () {
    const [open, setOpen] = useState(false);
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');

    const handleMonth = (event) => {
      setMonth(event.target.value);
    };

    const handleYear = (event) => {
        setYear(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
          setOpen(false);
        }
    };
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    const monthSelect = months.map((item, key) => (
        <MenuItem key={`months-${key}`} value={item}>
          {item}
        </MenuItem>
      ));
    
    const years = ['2020', '2021', '2022']

    const yearSelect = years.map((item, key) => (
        <MenuItem key={`years-${key}`} value={item}>
          {item}
        </MenuItem>
    ));

    return (
        <div>
        <Button onClick={handleClickOpen}>Open select dialog</Button>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>Fill the form</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="demo-dialog-native">Year</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={year}
                  onChange={handleYear}
                  input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                >
                {yearSelect}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-dialog-select-label">Month</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={month}
                  onChange={handleMonth}
                  input={<OutlinedInput label="Month" id="demo-dialog-native"/>}
                >
                {monthSelect}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}

export default MonthPicker