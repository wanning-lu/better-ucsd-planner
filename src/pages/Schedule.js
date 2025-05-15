import React from 'react'
import ScheduleYear from './ScheduleYear';

/** 
 * Component that holds all of the planner components
 */

function Schedule() {
    return (
        <>
            <div className="w-5/6 p-8 border-2">
                <ScheduleYear year="24"/> 
                <ScheduleYear year="25"/> 
                <ScheduleYear year="26"/> 
            </div>
        </>
    )
}

export default Schedule;