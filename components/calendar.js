"use client"

import { useState } from "react"

const data = [ {id: 1, name:"this event"} ]

// Returns an array of 6 dates (first day of the 6 weeks)
function getViewedWeeks(date_in_first_week)
{
    var d_start = date_in_first_week;
    d_start.setUTCDate(1);
    if(d_start.getUTCDay() != 1){
        d_start.setUTCDate(2-d_start.getUTCDay());
    }
    var arr = [d_start];
    for(var i=0; i<5;i++){
        var d_next = new Date(arr[i].toString());
        d_next.setUTCDate(d_next.getUTCDate()+7);
        arr.push(d_next);
    }
    console.log(arr);
    return arr;
}

function CalendarDayEntry({date}){
    return (
        <span className="p-5">{date.getUTCDate()}</span>
    );
}

function CalendarWeekContainer({first_date}){
    const week_days = [first_date];
    const day_entries = [];
    
    for(var i=1; i<7;i++){
        var next_day = new Date(week_days[i-1].toString());
        next_day.setUTCDate(next_day.getUTCDate()+1);
        week_days.push(next_day);
    }

    week_days.forEach((day) => {
        day_entries.push(
            <CalendarDayEntry date={day} />
        )
    })

    return (
        <div>{day_entries}</div>
    )
}

function CalendarTable({view_date}){
    const cells = [];
    const [shownWeeks, setShownWeeks] = useState(getViewedWeeks(view_date));

    shownWeeks.forEach((day) => {
        console.log(day);
        //cells.push(<div key={day}>{day.getDate()}</div>)
        cells.push(<CalendarWeekContainer first_date={day}/>);
    })

    return (
        <div>{cells}</div>
    )
}

export default function Calendar(){
    const [viewDay, setViewDay] = useState(new Date(Date.now()));

    return (
        <div>
            <div>
                Utility bar
            </div>
            <div>
                <CalendarTable view_date={viewDay}/>
            </div>
        </div>
    )
}