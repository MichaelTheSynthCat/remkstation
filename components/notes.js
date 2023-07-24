"use client";

import { TextField } from "@mui/material";
import { useState } from "react";

function NoteSession({ id, init_text, handleDelete, handleChange }) {
    const [text, setText] = useState(init_text);

    return (
        <div className="grid grid-cols-1 min-w-[24rem] min-h-[26rem]">
            <TextField
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    handleChange(id, e.target.value);
                }}
                multiline
                rows={18}
                sx={{
                    backgroundColor: "black",
                    border: "0px",
                }}
                inputProps={{
                    sx: {
                        color: "white",
                        fontSize: '18px',
                    },
                }}
            ></TextField>
        </div>
    );
}

function AddNoteButton({ handleAdd }) {
    return <div onClick={handleAdd} className="bg-black text-9xl text-center grid items-center min-w-[25rem] min-h-[24rem]">+</div>;
}

export default function NotesApp() {
    //const [data, setData] = useState([{id: "15651891", text: "hallo"}]);
    const [data, setData] = useState(loadData());

    function loadData() {
        var data = JSON.parse(localStorage.getItem("notes"));
        return data === null ? [] : data;
    }

    function saveData(dataToSave) {
        localStorage.setItem("notes", JSON.stringify(dataToSave));
    }

    function createNote() {
        var nextData = data.slice();
        nextData.push({ id: Date.now().toString(), text: "" });
        setData(nextData);
        saveData(nextData);
    }

    function changeNote(id, text) {
        var nextData = data.slice();
        nextData.forEach((note) => {
            if (note.id === id) {
                note.text = text;
            }
        });
        setData(nextData);
        saveData(nextData);
    }

    const renderNotes = () => {
        var noteblocks = [];
        data.forEach((note) => {
            noteblocks.push(
                <NoteSession
                    key={note.id}
                    id={note.id}
                    init_text={note.text}
                    handleChange={changeNote}
                />
            );
        });
        noteblocks.push(
            <AddNoteButton key="AddButton" handleAdd={createNote} />
        );
        return noteblocks;
    };

    return <div className="flex flex-wrap justify-center space-x-4 space-y-4">{renderNotes()}</div>;
}
