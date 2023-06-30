"use client"

import { useState } from "react";




function TDEntry({ text, checked, handleCheck, handleRemove }) {
    return (
        <tr>
            <td>
                {checked ?
                    <span className="line-through">{text}</span> : text
                }
            </td>
            <td><input type="checkbox" checked={checked} onChange={handleCheck} /></td>
            <td><button onClick={handleRemove}>DEL</button></td>
        </tr>
    );
}

export default function ToDoList() {

    const [totalEntries, setTotalEntries] = useState(0);
    const [entries, setEntries] = useState([])
    const [entryField, setEntryField] = useState('');
    const rows = [];


    function addEntry() {
        if (entryField === "") return;
        const nextEntries = entries.slice();
        nextEntries.push({ key: totalEntries, text: entryField, done: false });
        setTotalEntries(totalEntries + 1);
        setEntries(nextEntries);
        setEntryField("");
    }

    function checkEntry(key) {
        const nextEntries = entries.slice();
        nextEntries.forEach((entry) => {
            if (entry.key === key) {
                entry.done = !entry.done;
            }
        });
        setEntries(nextEntries);
    }

    function deleteEntry(key) {
        const nextEntries = entries.slice();
        for (var i = 0; i < nextEntries.length; i++) {
            if (nextEntries[i].key === key) {
                nextEntries.splice(i, 1);
                break;
            }
        }
        setEntries(nextEntries);
    }

    entries.forEach((entry) => {
        rows.push(
            <TDEntry
                key={entry.key} text={entry.text} checked={entry.done}
                handleCheck={() => checkEntry(entry.key)}
                handleRemove={() => deleteEntry(entry.key)}
            />
        )
    })

    return (
        <div className="flex-col grow p-5 bg-primary border border-white shadow-lg shadow-highlight_darker 
        min-h-[40rem] justify-center">
            <p className="text-3xl p-3 text-center">TO DO LIST</p>
            <div className="container mx-6">
                <form method="post"
                    className=""
                    onSubmit={e => {
                        e.preventDefault();
                        addEntry();
                    }}>
                    <input
                        type="text"
                        value={entryField}
                        placeholder="type here"
                        onChange={e => setEntryField(e.target.value)}
                        className="bg-primary my_hover_anim" />
                    <button type="submit" className="my_hover_anim p-1">Add</button>
                </form>
            </div>
            <div>
                <table className="min-w-[20rem]">
                    <thead>
                        <tr>
                            <th>Objective</th>
                            <th>CHECK</th>
                            <th>DEL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>
    )
}