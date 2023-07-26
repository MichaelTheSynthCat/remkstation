"use client";

import { TextField } from "@mui/material";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

function NoteSession({
    id,
    init_title,
    init_text,
    handleDelete,
    handleChange,
}) {
    const [text, setText] = useState(init_text);
    const [title, setTitle] = useState(init_title);

    return (
        <div className="relative grid grid-cols-1 min-w-[24rem] min-h-[26rem]">
            <div className="flex border-b">
                <TextField
                    className="grow"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        handleChange(id, e.target.value, text);
                    }}
                    placeholder="title"
                    sx={{
                        backgroundColor: "black",
                        border: "0px",
                    }}
                    inputProps={{
                        sx: {
                            color: "white",
                            fontSize: "1.5rem",
                        },
                    }}
                />
            </div>
            <div className="flex">
                <TextField
                    className="grow"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        handleChange(id, title, e.target.value);
                    }}
                    placeholder="text"
                    multiline
                    rows={18}
                    sx={{
                        backgroundColor: "black",
                        border: "0px",
                    }}
                    inputProps={{
                        sx: {
                            color: "white",
                            fontSize: "1.25rem",
                        },
                    }}
                />
            </div>
            <AiFillDelete
                className="absolute right-1 bottom-1 text-3xl ease-linear transition-colors hover:text-red-600"
                onClick={() => handleDelete(id)}
            />
        </div>
    );
}

function AddNoteButton({ handleAdd }) {
    return (
        <div
            onClick={handleAdd}
            className="bg-black text-[10rem] text-center grid items-center min-w-[25rem] min-h-[26rem] ease-linear transition-colors hover:text-highlight"
        >
            +
        </div>
    );
}

export default function NotesApp() {
    const [data, setData] = useState(typeof window !== "undefined" ? loadData() : []);

    function loadData() {
        var data = JSON.parse(localStorage.getItem("notes"));
        return data === null ? [] : data;
    }

    function saveData(dataToSave) {
        localStorage.setItem("notes", JSON.stringify(dataToSave));
    }

    function createNote() {
        var nextData = data.slice();
        nextData.push({ id: Date.now().toString(), title: "", text: "" });
        setData(nextData);
        saveData(nextData);
    }

    function changeNote(id, title, text) {
        var nextData = data.slice();
        nextData.forEach((note) => {
            if (note.id === id) {
                note.title = title;
                note.text = text;
            }
        });
        setData(nextData);
        saveData(nextData);
    }

    function deleteNote(id) {
        var nextData = data.slice();
        for (var i = 0; i < nextData.length; i++) {
            if (nextData[i].id === id) {
                nextData.splice(i, 1);
                break;
            }
        }
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
                    init_title={note.title}
                    init_text={note.text}
                    handleChange={changeNote}
                    handleDelete={deleteNote}
                />
            );
        });
        noteblocks.push(
            <AddNoteButton key="AddButton" handleAdd={createNote} />
        );
        return noteblocks;
    };

    return (
        <div className="flex flex-wrap justify-center space-x-4 space-y-4">
            {renderNotes()}
        </div>
    );
}
