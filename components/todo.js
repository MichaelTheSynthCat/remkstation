"use client"

import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";


function TDEntry({ text, checked, handleCheck, handleRemove }) {
    return (
        <tr className="flex gap-4 border-b py-2">
            <td className="grow text-xl my_text_anim transition-all ease-linear">
                {checked ?
                    <span className="line-through text-gray-500">{text}</span> : text
                }
            </td>
            <td className="">
                <label className="">
                    <input className="w-6 h-6 transition-all ease-linear hover:ring-4 ring-highlight" type="checkbox" checked={checked} onChange={handleCheck} />
                </label>
            </td>
            <td><button onClick={handleRemove}><AiFillDelete className="text-2xl ease-linear transition-colors hover:text-red-600"/></button></td>
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
        <div className="flex flex-col gap-2 p-5 bg-primary border border-white shadow-lg shadow-highlight_darker 
        min-h-[40rem] justify-start">
            <p className="basis-2 text-3xl p-3 text-center">TO DO LIST</p>
            <div className="">
                <form method="post"
                    className="flex p-2 gap-2"
                    onSubmit={e => {
                        e.preventDefault();
                        addEntry();
                    }}>
                    <input
                        type="text"
                        value={entryField}
                        placeholder="type here"
                        onChange={e => setEntryField(e.target.value)}
                        className="grow text-xl bg-primary hover:border-highlight_darker hover:text-blue-400 my_text_anim border p-2 " />
                    <button type="submit" className="text-xl my_text_anim my_button p-1">Add</button>
                </form>
            </div>
            <table className="table-auto border-collapse min-w-[20rem]">
                <tbody className="">
                    {rows}
                </tbody>
            </table>
        </div>
    )
}