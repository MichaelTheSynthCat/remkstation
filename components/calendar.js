"use client";

import { Button, Dialog, TextField, Tooltip } from "@mui/material";
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
    };

    return (
        <>
            <Tooltip
                title={
                    <div>
                        <div className="text-xl font-bold border-b">
                            {event.name}
                        </div>
                        <div className="text-base">
                            <span className="text-lg pr-2">
                                {new Date(event.date)
                                    .toTimeString()
                                    .slice(0, 5)}
                            </span>
                            <span className="font-extralight text-gray-300">
                                {new Date(event.date).toDateString().slice(4)}
                            </span>
                        </div>
                        <div className="border-b text-base">
                            {event.description}
                        </div>
                        <div className="italic text-gray-300">
                            Click to modify
                        </div>
                    </div>
                }
            >
                <div
                    className="flex justify-between text-lg transition-all hover:bg-blue-500"
                    onClick={() => {
                        if (!openDialog) setOpenDialog(true);
                    }}
                >
                    <span className="truncate px-1">{event.name}</span>
                </div>
            </Tooltip>
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
        </>
    );
}

function CalendarDayEntry({ date, dataRef, handleModify, handleDelete, in_view_month }) {
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

    console.log(date + " " + in_view_month)

    return (
        <div className="relative border-2 w-full min-h-[8rem] rounded-lg text-xl ">
            <div className="absolute bottom-0 right-0 p-1 ">
                <span className={ in_view_month ? "opacity-95" : "opacity-20"}>{date.getDate()}</span>
            </div>
            <div className="items-stretch">{renderEvents()}</div>
        </div>
    );
}

function CalendarTable({ view_date, dataRef, handleModify, handleDelete }) {
    const generateCells = (main_date, dataRef) => {
        const cells = [];
        const mondays = getViewedWeeks(main_date);
        var day = mondays[0];
        for (var i = 0; i < 6 * 7; i++) {
            cells.push(
                <CalendarDayEntry
                    key={day.toDateString()}
                    date={day}
                    dataRef={dataRef}
                    handleModify={handleModify}
                    handleDelete={handleDelete}
                    in_view_month={ view_date.getMonth() === day.getMonth() ? true : false }
                />
            );
            day = new Date(day.toString());
            day.setDate(day.getDate() + 1);
        }
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
        <Button
            variant="contained"
            color="success"
            onClick={() => handleOpenDialog()}
        >
            New event
        </Button>
    );
}

function CalendarHeader({ view_date, handleViewChange, handleOpenDialog }) {
    var actual_month = (main_date) => {
        return (
            <span>
                {main_date.getFullYear().toString() +
                    " / " +
                    main_date.toLocaleString("default", { month: "long" })}
            </span>
        );
    };

    return (
        <div className="pb-5 flex justify-between">
            <span className="text-4xl">{actual_month(view_date)}</span>
            <div className="space-x-5">
                <Button
                    variant="contained"
                    onClick={() => handleViewChange(-1)}
                >
                    {"<"}
                </Button>
                <Button variant="contained" onClick={() => handleViewChange(1)}>
                    {">"}
                </Button>
                <CalendarAddEvent handleOpenDialog={handleOpenDialog} />
            </div>
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
            <div className="m-4">
                <div className="text-3xl pb-3">
                    {modifiedEvent ? "Edit event" : "New event"}
                </div>
                <div className="grid grid-cols-1 gap-6">
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
                <div className="flex justify-between pt-4">
                    <Button
                        variant="contained"
                        onClick={() => handleCloseDialog()}
                    >
                        Cancel
                    </Button>
                    {modifiedEvent ? (
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    ) : null}
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (name.length != 0) {
                                handleSaveChanges(name, description, date);
                                resetDialog();
                            }
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
        localStorage.setItem("calendar", JSON.stringify(nextCalendarData));
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
        localStorage.setItem("calendar", JSON.stringify(nextCalendarData));
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
        console.log(date);
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
