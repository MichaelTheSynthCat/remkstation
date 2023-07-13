"use client";

import { Button, Dialog, TextField } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
    DatePicker,
    LocalizationProvider,
    TimePicker,
} from "@mui/x-date-pickers";
import { useState } from "react";

const data = [{ id: 1, name: "this event" }];

// Returns an array of 6 dates (first day of the 6 weeks)
function getViewedWeeks(date_in_first_week) {
    var d_start = new Date(date_in_first_week.toString());
    d_start.setUTCDate(1);
    if (d_start.getUTCDay() != 1) {
        d_start.setUTCDate(2 - d_start.getUTCDay());
    }
    var arr = [d_start];
    for (var i = 0; i < 5; i++) {
        var d_next = new Date(arr[i].toString());
        d_next.setUTCDate(d_next.getUTCDate() + 7);
        arr.push(d_next);
    }
    return arr;
}

function CalendarEventEntry({ event, handleModify, handleDelete }) {
    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaveChanges = (name, description, date) => {
        handleModify(event.id, name, description, date);
        setOpenDialog(false);
    }

    return (
        <div
            className="flex justify-between hover:bg-blue-500"
            onClick={() => {
                if (!openDialog) setOpenDialog(true);
            }}
        >
            <span>{event.name}</span>
            <span>{new Date(event.date).toTimeString().slice(0, 5)}</span>
            <EventEditDialog
                openBool={openDialog}
                handleCloseDialog={handleCloseDialog}
                handleSaveChanges={handleSaveChanges}
                modifiedEvent={event}
                handleDelete={() => {
                    handleDelete(event.id);
                    setOpenDialog(false);
                }}
            />
        </div>
    );
}

function CalendarDayEntry({ date, dataRef, handleModify, handleDelete }) {
    const renderEvents = () => {
        const events = [];
        var dataCopy = dataRef.slice();
        dataCopy.forEach((event) => {
            if (new Date(event.date).toDateString() === date.toDateString()) {
                events.push(
                    <CalendarEventEntry
                        key={event.id}
                        event={event}
                        handleModify={handleModify}
                        handleDelete={handleDelete}
                    />
                );
            }
        });
        return events;
    };

    return (
        <div className="relative border-2 w-full min-h-[8rem] rounded-lg text-xl ">
            <div className="absolute bottom-0 right-0 p-1 opacity-20">{date.getUTCDate()}</div>
            <div className="items-stretch">{renderEvents()}</div>
        </div>
    );
}

function CalendarTable({ view_date, dataRef, handleModify, handleDelete }) {
    const generateCells = (main_date, dataRef) => {
        const cells = [];
        const mondays = getViewedWeeks(main_date);
        mondays.forEach((monday) => {
            cells.push(
                <CalendarDayEntry
                    key={monday.toDateString()}
                    date={monday}
                    dataRef={dataRef}
                    handleModify={handleModify}
                    handleDelete={handleDelete}
                />
            );
            var week_days = [monday];
            for (var i = 1; i < 7; i++) {
                var next_day = new Date(week_days[i - 1].toString());
                next_day.setUTCDate(next_day.getUTCDate() + 1);
                week_days.push(next_day);
                cells.push(
                    <CalendarDayEntry
                        key={week_days[i].toDateString()}
                        date={week_days[i]}
                        dataRef={dataRef}
                        handleModify={handleModify}
                        handleDelete={handleDelete}
                    />
                );
            }
        });
        return cells;
    };

    return (
        <div className="grid grid-cols-7 gap-2 place-items-center">
            {generateCells(view_date, dataRef)}
        </div>
    );
}

function CalendarAddEvent({ handleOpenDialog }) {
    return (
        <Button variant="outlined" onClick={() => handleOpenDialog()}>
            +
        </Button>
    );
}

function CalendarHeader({ view_date, handleViewChange, handleOpenDialog }) {
    var actual_month = (main_date) => {
        return (
            <span>
                {main_date.getFullYear().toString() +
                    "/" +
                    main_date.toLocaleString("default", { month: "long" })}
            </span>
        );
    };

    return (
        <div>
            {actual_month(view_date)}
            <Button variant="outlined" onClick={() => handleViewChange(-1)}>
                {"<"}
            </Button>
            <Button variant="outlined" onClick={() => handleViewChange(1)}>
                {">"}
            </Button>
            <CalendarAddEvent handleOpenDialog={handleOpenDialog} />
        </div>
    );
}

function EventEditDialog({
    openBool,
    handleCloseDialog,
    handleSaveChanges,
    modifiedEvent,
    handleDelete,
}) {
    const [name, setName] = useState(modifiedEvent ? modifiedEvent.name : "");
    const [description, setDescription] = useState(
        modifiedEvent ? modifiedEvent.description : ""
    );
    const [date, setDate] = useState(
        dayjs(modifiedEvent ? new Date(modifiedEvent.date) : Date.now())
    );

    function resetDialog() {
        setName(modifiedEvent ? modifiedEvent.name : "");
        setDescription(modifiedEvent ? modifiedEvent.description : "");
        setDate(
            dayjs(modifiedEvent ? new Date(modifiedEvent.date) : Date.now())
        );
    }

    return (
        <Dialog open={openBool}>
            <div
                className="m-4"
            >
                <div className="text-3xl">{modifiedEvent ? "Edit event" : "New event"}</div>
                <div
                    className="grid grid-cols-1 gap-6"
                >
                    <TextField
                        className=""
                        id="name"
                        variant="outlined"
                        label="Name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <TextField
                        id="description"
                        variant="outlined"
                        label="Description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    <div>
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale="en-gb"
                        >
                            <DatePicker
                                label="Date"
                                value={date}
                                onChange={(newDate) => setDate(newDate)}
                            />
                            <TimePicker
                                label="Time"
                                value={date}
                                onChange={(newDate) => setDate(newDate)}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div>
                    <Button variant="outlined" onClick={() => handleCloseDialog()}>
                        Cancel
                    </Button>
                    {modifiedEvent ? (<Button variant="outlined" onClick={handleDelete}>Delete</Button>) : null}
                    <Button
                        variant="outlined"
                        onClick={() => {
                            handleSaveChanges(name, description, date);
                            resetDialog();
                        }}
                    >
                        {modifiedEvent ? "Save changes" : "Add new event"}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

export default function Calendar() {
    const [calendarData, setCalendatData] = useState(loadData());
    const [viewDay, setViewDay] = useState(new Date(Date.now()));
    const [openDialog, setOpenDialog] = useState(false);
    const [editedEvent, setEditedEvent] = useState({
        id: "",
        name: "",
        date: null,
    });

    function loadData() {
        var data = JSON.parse(localStorage.getItem("calendar"));
        return data === null ? [] : data;
    }

    function changeMonth(increment) {
        // increment is +1 or -1
        var nextDate = new Date(viewDay.toString());
        nextDate.setUTCMonth(nextDate.getUTCMonth() + increment);
        setViewDay(nextDate);
    }

    function addEvent(newEvent) {
        var nextCalendarData = calendarData.slice();
        nextCalendarData.push(newEvent);
        setCalendatData(nextCalendarData);
        localStorage.setItem("calendar", JSON.stringify(nextCalendarData));
    }

    function updateEvent(oldEventID, newEvent) {
        var nextCalendarData = calendarData.slice();
        for (var i = 0; i < nextCalendarData.length; i++) {
            if (nextCalendarData[i].id === oldEventID) {
                nextCalendarData[i] = newEvent;
            }
        }
        setCalendatData(nextCalendarData);
        localStorage.setItem(
            "calendar",
            JSON.stringify(nextCalendarData)
        );
    }

    function deleteEvent(eventID) {
        var nextCalendarData = calendarData.slice();
        for (var i = 0; i < nextCalendarData.length; i++) {
            if (nextCalendarData[i].id === eventID) {
                nextCalendarData.splice(i, 1);
                break;
            }
        }
        setCalendatData(nextCalendarData);
        localStorage.setItem(
            "calendar",
            JSON.stringify(nextCalendarData)
        );
    }

    const handleOpenAddDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaveChanges = (name, description, date) => {
        var name_str = name;
        var description_str = description;
        var dateJS = date.toDate();
        var id = dateJS.toISOString() + name;
        var newEvent = {
            id: id,
            name: name_str,
            description: description_str,
            date: dateJS,
        };
        addEvent(newEvent);
        setOpenDialog(false);
    };

    const handleModify = (oldEventID, name, description, date) => {
        console.log(date)
        var name_str = name;
        var description_str = description;
        var dateJS = date.toDate();
        var id = dateJS.toISOString() + name;
        var newEvent = {
            id: id,
            name: name_str,
            description: description_str,
            date: dateJS,
        };
        updateEvent(oldEventID, newEvent);
    };

    return (
        <div className="w-full place-self-start">
            <CalendarHeader
                view_date={viewDay}
                handleViewChange={changeMonth}
                handleOpenDialog={handleOpenAddDialog}
            />
            <CalendarTable
                view_date={viewDay}
                dataRef={calendarData}
                handleModify={handleModify}
                handleDelete={deleteEvent}
            />
            <EventEditDialog
                openBool={openDialog}
                handleCloseDialog={handleCloseDialog}
                handleSaveChanges={handleSaveChanges}
            />
        </div>
    );
}
