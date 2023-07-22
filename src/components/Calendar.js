import React, { useState, useRef } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./EventUtils";
import { Button, Typography, Modal, Box, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { TimePicker } from "react-ios-time-picker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DemoApp = () => {
  const [state, setState] = useState({
    weekendsVisible: true,
    currentEvents: [],
  });
  const [open, setOpen] = useState({
    modal: false,
    data: null,
    calendarApi: "",
    type: "",
  });
  const [openEvent, setOpenEvent] = useState(false);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("10:00");

  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    setOpen({
      modal: true,
      data: selectInfo,
      calendarApi: calendarApi,
      type: open.type,
    });
  };

  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <div
          style={{
            backgroundColor: eventInfo.backgroundColor,
            padding: "5px 10px",
          }}
        >
          <i style={{ marginRight: "10px" }}>{eventInfo.timeText}</i>
          {eventInfo.event.title}
        </div>
      </>
    );
  }

  const handleEvent = () => {
    setOpenEvent(true);
    setOpen({
      ...open,
      modal: false,
      type: "event",
    });
  };

  const handleREminder = () => {
    setOpenEvent(true);
    setOpen({
      ...open,
      modal: false,
      type: "reminder",
    });
  };
  const addEvent = () => {
    setTitle(null);
    let time = value.split(":");
    let t = `T${time[0]}:${time[1]}:00`;
    let col = open.type === "event" ? "#FA9D00" : "#89DBEC";
    open.calendarApi.unselect();
    if (title) {
      open.calendarApi.addEvent({
        id: createEventId(),
        title,
        start: open.data.startStr + t,
        end: open.data.endStr,
        backgroundColor: col,
      });
    }
    setOpenEvent(false);
    setValue("10:00");
  };

  return (
    <>
      <div className="demo-app">
        <div className="demo-app-main">
          <Typography className="typo" fontSize={25} fontWeight={700} mb={0}>
            Calendar
          </Typography>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
          />
        </div>
      </div>
      <Modal
        open={open.modal}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="eventcss">
          <Button
            style={{ margin: "10px " }}
            variant="contained"
            color="success"
            onClick={handleEvent}
          >
            Add Event
          </Button>
          <Button
            style={{ margin: "10px" }}
            variant="contained"
            color="secondary"
            onClick={handleREminder}
          >
            {" "}
            Add Reminder
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openEvent}
        onClose={() => setOpenEvent(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="eventcss">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Typography
              id="modal-modal-title"
              className="typo"
              fontSize={20}
              fontWeight={600}
              alignItems={"center"}
              mb={0}
              ml={3}
            >
              {open.type === "event" ? "Add Event" : "Add Reminder"}
            </Typography>
            <Grid item xs={12}>
              <TextField
                label="Title"
                id="outlined-start-adornment"
                sx={{ mt: 1 }}
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {/* {
                <Typography color={"red"} fontSize={12}>
                  {titleErr}
                </Typography>
              } */}
            </Grid>
            <Grid item xs={12}>
              <div>
                <TimePicker onChange={setValue} value={value} />
              </div>
            </Grid>
            <Button
              style={{ margin: "25px" }}
              variant="contained"
              color={open.type === "event" ? "success" : "secondary"}
              onClick={addEvent}
            >
              {open.type === "event" ? "Add Event" : "Add Reminder"}
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default DemoApp;
