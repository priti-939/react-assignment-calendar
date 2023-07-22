import * as React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button, Grid, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function InputAdornments() {
  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  const agency = [
    {
      value: "agency1",
      label: "agency1",
    },
    {
      value: "agency2",
      label: "agency2",
    },
    {
      value: "agency3",
      label: "agency3",
    },
  ];

  const format = [
    {
      value: "format1",
      label: "format1",
    },
    {
      value: "format2",
      label: "format2",
    },
    {
      value: "format3",
      label: "format3",
    },
  ];

  return (
    <>
      <Typography fontSize={25} fontWeight={700} p={5} pb={0}>
        Reports
      </Typography>
      <Grid
        container
        rowSpacing={1}
        columns={{ xs: 4, sm: 12, md: 12, lg: 12 }}
        p={5}
      >
        <Grid item xs={6}>
          <TextField
            id="outlined-select-currency"
            select
            label="Select Report Type"
            fullWidth
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}></Grid>

        <Grid item xs={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              sx={{ mt: 1, width: "32ch" }}
            >
              <DatePicker label="Start Date" />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              sx={{ mt: 1, width: "32ch" }}
            >
              <DatePicker label="Due Date" />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}></Grid>

        <Grid item xs={3}>
          <TextField
            label="Agency"
            id="outlined-start-adornment"
            sx={{ mt: 1, width: "29ch" }}
            select
          >
            {agency.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Select Format"
            id="outlined-start-adornment"
            sx={{ mt: 1, width: "29ch" }}
            select
          >
            {format.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6} mt={2}>
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              style={{ fontWeight: "bold" }}
            >
              Use Date
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Collected"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}></Grid>

        <Grid item xs={6} textAlign={"right"}>
          {" "}
          <Button variant="contained">Submit</Button>
        </Grid>
      </Grid>
    </>
  );
}
